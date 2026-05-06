"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const handleAccount = () => {
    alert("Abrir painel da conta");
  };

  const handleAdmin = () => {
    router.push("/admin");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3030/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md border border-zinc-200">
      <div className="flex items-center gap-4">
        <img
          src="https://www.izzyprint.com.br/wp-content/uploads/2020/04/cropped-LOGO-IZZY-PRETO_DIFERENTE-1-192x192.png"
          alt="Logo Izzy Print"
          className="w-16 h-16 rounded-xl border border-zinc-200"
        />
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Gerador de SKU
        </h1>
      </div>
<div className="flex items-center gap-3">
  <button onClick={handleLogout}>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" />
    </svg>
  </button>

  <button
    onClick={handleAdmin}
    className="p-2 rounded-full hover:bg-gray-100 transition"
    aria-label="Admin"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 1v22M1 12h22"
      />
    </svg>
  </button>
</div>
      </header>
  );
};

export default Header;
