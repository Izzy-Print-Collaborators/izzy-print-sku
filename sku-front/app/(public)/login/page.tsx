"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        const response = await fetch("http://localhost:3030/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Usuário ou senha inválidos");
        }
        throw new Error("Erro no servidor. Tente novamente mais tarde.");
      }

      const data = await response.json();
      console.log("Login sucesso:", data);

      document.cookie = `empresa=${encodeURIComponent(username)}; max-age=3600; path=/; samesite=lax`;

      router.push("/sku");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex items-center justify-center bg-indigo-600 text-white">
        <div className="text-center max-w-md px-6">
          <h2 className="text-3xl font-bold mb-4">Izzy Print</h2>
          <p className="text-indigo-100">
            Acesso restrito a usuários autorizados pela empresa.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo 👋</h1>
          <p className="text-gray-500 mb-6">Entre na sua conta para continuar</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"}`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"}`}
                required
              />
            </div>

            {/* mensagem de erro */}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={openModal}
              className="text-indigo-600 hover:underline font-medium"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Acesso restrito
            </h3>
            <p className="text-gray-600 mb-4">
              Para criar uma conta, entre em contato com a empresa para autorização.
            </p>
            <p className="text-lg font-semibold text-indigo-600 mb-6">
              📞 (11) 94343-4060
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
