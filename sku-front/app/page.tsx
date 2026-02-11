"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Gerenciamento de SKUs da Izzy Print
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Este sistema organiza e padroniza o uso de
          <span className="font-semibold"> SKUs (Stock Keeping Units)</span>
          no processo produtivo da Izzy Print.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Um SKU é um código único que identifica produtos e variações,
          garantindo rastreabilidade e eficiência na produção.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold mb-2">📦 Organização</h3>
            <p className="text-gray-600">
              Padronização dos produtos e menos erros.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold mb-2">⚙️ Produção</h3>
            <p className="text-gray-600">
              Fluxo produtivo mais rápido e claro.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold mb-2">📊 Controle</h3>
            <p className="text-gray-600">
              Melhor controle de estoque e relatórios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold mb-2">🚀 Escalabilidade</h3>
            <p className="text-gray-600">
              Base sólida para crescimento da Izzy.
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition"
        >
          Acessar o Sistema
        </button>
      </div>
    </div>
  );
}
