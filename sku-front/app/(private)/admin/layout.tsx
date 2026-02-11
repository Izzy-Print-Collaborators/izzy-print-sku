import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

const response = await fetch("http://localhost:3030/auth/me", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
});


  if (!response.ok) {
    redirect("/sku");
  }

  const user = await response.json();
  console.log("USER /auth/me:", user);

if (user.role !== "admin" && user.role !== "moderator") {
  redirect("/sku");
}



  return <>{children}</>;
}
