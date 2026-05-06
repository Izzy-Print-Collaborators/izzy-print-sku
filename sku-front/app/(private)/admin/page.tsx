"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  role: string;
};

type NewUser = {
  name: string;
  password: string;
  role: string;
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    password: "",
    role: "user",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3030/users", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Erro ao buscar usuários");
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (name: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch("http://localhost:3030/users/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      setUsers(users.filter((u) => u.name !== name));
    }
  };

  const handleResetPassword = async (user: User) => {
    await fetch(`http://localhost:3030/users/${user.id}/reset-password`, {
      method: "POST",
      credentials: "include",
    });

    alert(`Senha do usuário ${user.username} redefinida.`);
  };

  const handleCreateUser = async () => {
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3030/users/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        setFormError("Erro ao criar usuário. Tente novamente.");
        return;
      }

      const newUser: User = await response.json();
      setUsers((prev) => [...prev, newUser]);
      setShowModal(false);
      setFormData({ name: "", password: "", role: "user" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setFormError("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", password: "", role: "user" });
    setFormError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciamento de Usuários
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/sku"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              ← Voltar para SKU
            </Link>

            <input
              type="text"
              placeholder="Buscar por nome ou username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80"
            />
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium whitespace-nowrap"
            >
              + Novo Usuário
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-600">{user.code}</td>

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.name}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : user.role === "moderator"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleResetPassword(user)}
                        className="text-sm px-3 py-1 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        Resetar senha
                      </button>
                      {user.role !== "admin" &&
                        <button
                           onClick={() => handleDelete(user.name)}
                           className="text-sm px-3 py-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition"
                        >
                          Deletar 
                        </button>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Novo Usuário</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Será salvo como: {formData.name.toLowerCase().replace(/\s/g, "") || "..."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Digite a senha"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {formError && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateUser}
                  disabled={isSubmitting || !formData.name || !formData.password}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Criando..." : "Criar Usuário"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
