import Auth0Provider from "next-auth/providers/auth0";
import { JWT } from 'next-auth/jwt';
import { Session, AuthOptions } from 'next-auth';

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
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at ?? 0 * 1000, 
                };
            }

            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }
            
            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            (session as any).accessToken = token.accessToken;
            
            return session;
        },
    },

    session: {
        strategy: 'jwt',
    },
  secret: process.env.AUTH0_SECRET!,
};

export default authOptions;
