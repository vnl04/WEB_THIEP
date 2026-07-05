'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api';

export default function PaymentConfirmationPage() {
  const params = useSearchParams();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const transactionId = params.get('transactionId');

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        if (transactionId) {
          const response = await apiClient.getPaymentStatus(transactionId);
          setPayment(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch payment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchPayment();
    }
  }, [transactionId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500">Loading payment status...</p>
        </div>
      </div>
    );
  }

  const isSuccess = payment?.status === 'confirmed';

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          {isSuccess ? (
            <div>
              <div className="text-6xl mb-4">✓</div>
              <h1 className="text-4xl font-serif font-bold text-green-600 mb-2">Payment Successful</h1>
              <p className="text-gray-600">Your subscription has been activated</p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">⏳</div>
              <h1 className="text-4xl font-serif font-bold text-yellow-600 mb-2">Payment Pending</h1>
              <p className="text-gray-600">Please complete the bank transfer as instructed</p>
            </div>
          )}
        </div>

        {payment && (
          <div className="bg-white card p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono">{payment.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">{payment.amount.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="capitalize">{payment.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold ${isSuccess ? 'text-green-600' : 'text-yellow-600'}`}>
                  {payment.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {!isSuccess && payment?.paymentMethod === 'bank_transfer' && (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <h3 className="font-bold mb-4">Bank Transfer Instructions</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Bank:</strong> Vietcombank</p>
              <p><strong>Account:</strong> 1234567890</p>
              <p><strong>Account Name:</strong> Wedding Card Platform</p>
              <p><strong>Reference:</strong> {payment.transactionId}</p>
              <p><strong>Amount:</strong> {payment.amount.toLocaleString()} VND</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-8 text-sm">
          <p className="text-gray-600 mb-3">What happens next?</p>
          <ul className="space-y-2 text-gray-600">
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your subscription will be activated immediately upon payment confirmation</li>
            <li>✓ You can manage your subscription from the dashboard</li>
            <li>✓ Contact support if you have any questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
