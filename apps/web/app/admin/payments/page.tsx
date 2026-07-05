'use client';

import { useState } from 'react';

export default function AdminPaymentsPage() {
  const [payments] = useState([
    {
      id: '1',
      transactionId: 'TXN-2025-001',
      amount: 299000,
      currency: 'VND',
      method: 'vnpay',
      status: 'confirmed',
      user: 'John Doe',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      transactionId: 'TXN-2025-002',
      amount: 199000,
      currency: 'VND',
      method: 'momo',
      status: 'confirmed',
      user: 'Jane Smith',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      transactionId: 'TXN-2025-003',
      amount: 500000,
      currency: 'VND',
      method: 'bank_transfer',
      status: 'pending',
      user: 'Mike Johnson',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]);

  const totalRevenue = payments
    .filter(p => p.status === 'confirmed')
    .reduce((sum, p) => sum + p.amount, 0);

  const confirmedCount = payments.filter(p => p.status === 'confirmed').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'vnpay':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">VNPay</span>;
      case 'momo':
        return <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Momo</span>;
      case 'bank_transfer':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Bank</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{method}</span>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">Payment Management</h1>
      <p className="text-gray-600 mb-8">Track all payments and transactions</p>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">{totalRevenue.toLocaleString()} VND</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Confirmed Payments</p>
          <p className="text-3xl font-bold text-primary">{confirmedCount}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white card p-6">
          <p className="text-gray-500 text-sm mb-2">Avg Transaction</p>
          <p className="text-3xl font-bold text-primary">
            {confirmedCount > 0 ? (totalRevenue / confirmedCount).toLocaleString() : 0} VND
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white card p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3">Transaction ID</th>
              <th className="text-left py-3">User</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Method</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-mono text-xs">{payment.transactionId}</td>
                <td className="py-3">{payment.user}</td>
                <td className="py-3 font-bold">{payment.amount.toLocaleString()} VND</td>
                <td className="py-3">{getMethodBadge(payment.method)}</td>
                <td className="py-3">
                  <span className={`inline-block px-3 py-1 rounded text-xs font-bold ${
                    payment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3">{payment.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-6">
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded font-medium">
          Export Report
        </button>
      </div>
    </div>
  );
}
