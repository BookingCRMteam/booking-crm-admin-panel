import Auth0Provider from "next-auth/providers/auth0";
import { JWT } from "next-auth/jwt";
import { Session, AuthOptions } from "next-auth";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://booking-crm.onrender.com/api/v1";

const ROLE_CHECK_URL = `${API_URL}/auth`;
const AUTH0_LOGOUT_ROUTE = "/api/auth/logout";

/**
 * Функція для оновлення Access Token через Auth0 API
 */
async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.AUTH0_DOMAIN}/oauth/token`;
    const response = await axios.post(url, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_DOMAIN!,
      authorization: {
        params: {
          scope: process.env.AUTH0_SCOPE!,
          audience: process.env.AUTH0_AUDIENCE!,
        },
      },
    }),
  ],

  callbacks: {
    /**
     * 1. Callback signIn
     * Виконує перевірку ролі і, якщо роль не 'admin', повертає URL виходу.
     * Це примусово перенаправляє користувача на Auth0 SLO.
     */
    async signIn({ user, account }) {
      const accessToken = account?.access_token;

      if (!accessToken) {
        console.error("Помилка: Access Token відсутній.");
        return false;
      }

      try {
        const response = await axios.post<{ role: string }>(
          ROLE_CHECK_URL,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const userRole = response.data.role;

        if (userRole === "admin") {
          console.log(
            `Користувач успішно автентифікований з роллю: ${userRole}`,
          );
          return true;
        } else {
          console.warn(
            `Користувач має недостатню роль: ${userRole}. Примусовий вихід.`,
          );
          return AUTH0_LOGOUT_ROUTE;
        }
      } catch (error) {
        console.error(
          "Помилка перевірки ролі на бекенді. Примусовий вихід:",
          error,
        );
        return AUTH0_LOGOUT_ROUTE;
      }
    },

    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: (account.expires_at ?? 0) * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      console.log("Access Token expired, refreshing...");
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = token.accessToken;

      if ((token as any).error) {
        (session as any).error = (token as any).error;
      }

      if (token.sub) {
        (session as any).user.id = token.sub;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH0_SECRET!,
};

export default authOptions;
