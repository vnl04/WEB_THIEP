'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ConfirmationContent() {
  const params = useSearchParams();
  const transactionId = params.get('transactionId') || 'pending';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card p-12 text-center max-w-md">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-serif font-bold mb-4">Payment Successful!</h1>
        <p className="text-foreground-muted mb-6">
          Thank you for your payment. Your transaction has been processed successfully.
        </p>
        <div className="bg-surface-light p-4 rounded mb-6 text-sm">
          <p className="text-foreground-muted">Transaction ID:</p>
          <p className="font-mono font-bold">{transactionId}</p>
        </div>
        <Link href="/dashboard" className="btn-primary w-full">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8"><p>Loading...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
