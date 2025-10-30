import React, { useState, useEffect } from "react";
const ENV = import.meta.env;
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}/${ENV.VITE_API_BASE}`;

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [editingId, setEditingId] = useState(null); 

  const fetchUsers = async () => {
    console.log("Claves de entorno:", import.meta.env);
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId !== null) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ fullName: "", email: "", phoneNumber: "" });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Tabla usuarios */}
      <div className="w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Teléfono</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{u.id}</td>
                <td className="py-2 px-4">{u.fullName}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.phoneNumber}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario */}
      <div className="w-1/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {editingId !== null ? "Editar Usuario" : "Agregar Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Teléfono</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded text-white ${
              editingId !== null
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editingId !== null ? "Guardar Cambios" : "Agregar Usuario"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
