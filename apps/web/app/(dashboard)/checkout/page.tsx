'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/api';

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const amount = parseInt(params.get('amount') || '0');
  const planId = params.get('planId') || 'basic';
  const cardId = params.get('cardId');

  const handlePaymentVNPay = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.createPayment({
        amount,
        currency: 'VND',
        paymentMethod: 'vnpay',
        cardId,
        planId,
      });

      const { paymentUrl } = response.data.data;
      window.location.href = paymentUrl;
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMomo = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.createPayment({
        amount,
        currency: 'VND',
        paymentMethod: 'momo',
        cardId,
        planId,
      });

      const { paymentUrl } = response.data.data;
      window.location.href = paymentUrl;
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentBankTransfer = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.createPayment({
        amount,
        currency: 'VND',
        paymentMethod: 'bank_transfer',
        cardId,
        planId,
      });

      router.push(`/checkout/confirmation?transactionId=${response.data.data.transactionId}`);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Payment setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-2">Payment Checkout</h1>
        <p className="text-gray-600 mb-8">Select your payment method</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white card p-6 mb-8">
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Plan: <span className="font-bold capitalize">{planId}</span></p>
            <p className="text-gray-600 mb-4">Amount: <span className="text-2xl font-bold text-primary">{amount.toLocaleString()} VND</span></p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePaymentVNPay}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? 'Processing...' : 'Pay with VNPay'}
            </button>

            <button
              onClick={handlePaymentMomo}
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? 'Processing...' : 'Pay with Momo'}
            </button>

            <button
              onClick={handlePaymentBankTransfer}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? 'Processing...' : 'Bank Transfer'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Payment Security</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ All payments are secured with SSL encryption</li>
            <li>✓ Your payment information is never stored on our servers</li>
            <li>✓ We use industry-standard payment processors</li>
            <li>✓ You will receive an email confirmation after payment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8"><p>Loading checkout...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
