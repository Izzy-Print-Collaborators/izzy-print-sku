"use client";
import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  role: string;
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

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
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch(`http://localhost:3030/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleResetPassword = async (user: User) => {
    await fetch(`http://localhost:3030/users/${user.id}/reset-password`, {
      method: "POST",
      credentials: "include",
    });

    alert(`Senha do usuário ${user.username} redefinida.`);
  };

return (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Usuários
        </h1>

        <input
          type="text"
          placeholder="Buscar por nome ou username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Username</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-600">
                    {user.code}
                  </td>

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

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm px-3 py-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);

};

export default AdminUsers;
