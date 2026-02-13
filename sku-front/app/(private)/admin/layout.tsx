import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies(); // 🔥 AGORA É ASYNC
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  const response = await fetch("http://localhost:3030/auth/me", {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/");
  }

  const user = await response.json();

  if (user.role !== "admin" && user.role !== "moderator") {
    redirect("/sku");
  }

  return <>{children}</>;
}
