import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error('Error fetching users (admin):', err);
        if (err.response?.status === 401) {
          alert('Unauthorized. Please log in as an admin.');
        }
      });
  }, []);

  const archiveUser = async (id) => {
    try {
      await API.put(`/users/archive/${id}`);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, archived: true } : user
        )
      );
    } catch (err) {
      console.error('Failed to archive user:', err);
    }
  };

  const deleteUser = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to permanently delete this user?"
    );
    if (!isConfirmed) return;

    try {
      await API.delete(`/users/${id}`);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const makeAdmin = async (id) => {
    try {
      await API.put(`/users/role/${id}`, 'admin', {
        headers: { 'Content-Type': 'application/json' }
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role: 'admin' } : user
        )
      );

      alert('User promoted to admin.');
    } catch (err) {
      console.error('Failed to promote user:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Mentor?</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={
                  user.archived
                    ? 'bg-gray-100 text-gray-400'
                    : 'hover:bg-gray-50'
                }
              >
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.wantsToMentor ? 'Yes' : 'No'}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => archiveUser(user.id)}
                    disabled={user.archived}
                  >
                    Archive
                  </button>

                  <button
                    className="text-sm text-gray-600 hover:underline"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>

                  {user.role !== 'admin' && (
                    <button
                      onClick={() => makeAdmin(user.id)}
                      className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
