import { NextRequest, NextResponse } from "next/server";

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const redirectUrl = process.env.LOGOUT_REDIRECT_URL;

export async function GET(req: NextRequest) {
  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !redirectUrl) {
    return NextResponse.json(
      { error: "Auth configuration missing" },
      { status: 500 },
    );
  }

  const logoutUrl =
    `${AUTH0_DOMAIN}/v2/logout?` +
    `client_id=${AUTH0_CLIENT_ID}&` +
    `returnTo=${encodeURIComponent(redirectUrl)}`;

  return NextResponse.redirect(logoutUrl);
}
