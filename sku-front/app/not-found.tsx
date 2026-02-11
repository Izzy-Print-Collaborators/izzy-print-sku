"use client";
import { useRouter } from "next/navigation";

interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  showLoginButton?: boolean;
}

export default function NotFoundPage({
  title = "Página não encontrada",
  subtitle = "A URL pode estar errada ou a página não existe mais.",
  showLoginButton = true,
}: NotFoundPageProps) {
  const router = useRouter();

return (
  <div className="min-h-screen w-full flex items-center justify-center bg-white p-8">
    <div className="w-full max-w-sm text-center">
      <h1 className="text-6xl font-extrabold text-red-800 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h2>

      <p className="text-gray-500 mb-8">
        {subtitle}
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => router.back()}
          className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          Voltar
        </button>

        {showLoginButton && (
          <button
            onClick={() => router.push("/login")}
            className="w-full py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Ir para o login
          </button>
        )}
      </div>
    </div>
  </div>
);

}
