"use client";
import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  role: string;
};

const getUsers = await fetch('http//localhost:3030/users/',{
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
});


const mockUsers: User[] = [
  { id: 1, name: "João Silva", username: "joaos", role: "Admin" },
  { id: 2, name: "Maria Souza", username: "marias", role: "Usuário" },
  { id: 3, name: "Carlos Lima", username: "carlima", role: "Usuário" },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleResetPassword = (user: User) => {
    alert(`Senha do usuário ${user.username} redefinida.`);
    // aqui depois você chama a API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-8 py-6">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-indigo-100">
          Gerenciamento de usuários do sistema
        </p>
      </header>

      {/* Conteúdo */}
      <main className="p-8">
        <div className="bg-white rounded-xl shadow p-6">
          {/* Busca */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Usuários 👥
            </h2>

            <input
              type="text"
              placeholder="Buscar por nome ou usuário..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Usuário</th>
                  <th className="px-4 py-3">Perfil</th>
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
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        @{user.username}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full
                            ${
                              user.role === "Admin"
                                ? "bg-indigo-100 text-indigo-700"
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
                          Mudar senha
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
                      colSpan={4}
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
      </main>
    </div>
  );
};

export default AdminUsers;
