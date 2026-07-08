'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalPayments: 0,
    pendingWishes: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In production, these would be separate admin API endpoints
        const cardsResponse = await apiClient.getCards();
        const paymentsResponse = await apiClient.getPayments();
        
        setStats({
          totalUsers: 0, // Would fetch from admin API
          totalCards: cardsResponse.data.data?.length || 0,
          totalPayments: paymentsResponse.data.data?.length || 0,
          pendingWishes: 0, // Would fetch from admin API
          totalRevenue: 0, // Would calculate from payments
        });
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-5 gap-4 mb-12">
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Total Cards</p>
          <p className="text-3xl font-bold text-primary">{stats.totalCards}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Payments</p>
          <p className="text-3xl font-bold text-primary">{stats.totalPayments}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Pending Wishes</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingWishes}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">{stats.totalRevenue.toLocaleString()} VND</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/templates" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Manage Templates</h3>
          <p className="text-gray-600 text-sm mb-4">Create, edit, and manage wedding card templates</p>
          <button className="btn-primary text-sm">Go to Templates</button>
        </Link>

        <Link href="/admin/wishes" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Moderate Wishes</h3>
          <p className="text-gray-600 text-sm mb-4">Review and approve guest wishes and messages</p>
          <button className="btn-primary text-sm">Review Wishes</button>
        </Link>

        <Link href="/admin/payments" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Payment Reports</h3>
          <p className="text-gray-600 text-sm mb-4">View payment transactions and revenue analytics</p>
          <button className="btn-primary text-sm">View Payments</button>
        </Link>

        <Link href="/admin/users" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm mb-4">View user accounts and manage permissions</p>
          <button className="btn-primary text-sm">Manage Users</button>
        </Link>

        <Link href="/admin/subscriptions" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Subscriptions</h3>
          <p className="text-gray-600 text-sm mb-4">Monitor active subscriptions and renewals</p>
          <button className="btn-primary text-sm">View Subscriptions</button>
        </Link>

        <Link href="/admin/settings" className="bg-white card p-6 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Settings</h3>
          <p className="text-gray-600 text-sm mb-4">Configure system settings and integrations</p>
          <button className="btn-primary text-sm">Go to Settings</button>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-2">Activity</th>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">Card Created</td>
              <td>John Doe</td>
              <td>2 hours ago</td>
              <td><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Success</span></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">Payment Received</td>
              <td>Jane Smith</td>
              <td>4 hours ago</td>
              <td><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Success</span></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">Wish Submitted</td>
              <td>Mike Johnson</td>
              <td>6 hours ago</td>
              <td><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
