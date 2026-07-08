'use client';

import { useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      status: 'active',
      cards: 2,
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      email: 'jane@example.com',
      name: 'Jane Smith',
      role: 'user',
      status: 'active',
      cards: 1,
      joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      cards: 0,
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
  ]);

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Admin</span>;
    }
    return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">User</span>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>;
    }
    return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Inactive</span>;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded font-medium">
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-primary">{users.length}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Active Users</p>
          <p className="text-3xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Admin Users</p>
          <p className="text-3xl font-bold text-red-600">{users.filter(u => u.role === 'admin').length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white card p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Cards</th>
              <th className="text-left py-3">Joined</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{user.name}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">{getRoleBadge(user.role)}</td>
                <td className="py-3">{getStatusBadge(user.status)}</td>
                <td className="py-3">{user.cards}</td>
                <td className="py-3">{user.joinedAt.toLocaleDateString()}</td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
