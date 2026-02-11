"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleAccount = () => {
    alert("Abrir painel da conta");
  };

    const handleAdmin = () => {
      router.push("/admin");
    };
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 shadow-md border border-zinc-200">

      <div className="flex items-center gap-4">
        <img
          src="https://www.izzyprint.com.br/wp-content/uploads/2020/04/cropped-LOGO-IZZY-PRETO_DIFERENTE-1-192x192.png"
          alt="Logo Izzy Print"
          className="w-16 h-16 rounded-xl border border-zinc-200"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Gerador de SKU
          </h1>
        </div>
      </div>

      {/* Botões minimalistas com SVG */}
      <div className="flex items-center gap-3">
        {/* Conta */}
        <button
          onClick={handleAccount}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Conta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-zinc-700 dark:text-zinc-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9 9 0 1118.879 6.196a9 9 0 01-13.758 11.608z"
            />
          </svg>
        </button>

        {/* Claro / Escuro */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Modo escuro/claro"
        >
          {darkMode ? (
            // Sol (claro)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          ) : (
            // Lua (escuro)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          )}
        </button>

        {/* Admin */}
        <button
          onClick={handleAdmin}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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
