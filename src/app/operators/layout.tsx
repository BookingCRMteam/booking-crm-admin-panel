import type { PropsWithChildren } from "react";
import { ThemedLayout } from "@refinedev/mui";
import { Header } from "@components/header";
import authOptions from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/login");
  }

  return <ThemedLayout Header={Header}>{children}</ThemedLayout>;
}
