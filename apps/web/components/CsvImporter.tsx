'use client';

import { useState, useRef } from 'react';
import { apiClient } from '@/lib/api';

interface CsvImporterProps {
  cardId: string;
  onSuccess?: () => void;
}

export function CsvImporter({ cardId, onSuccess }: CsvImporterProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiClient.importGuests(cardId, file);
      setSuccess(`Successfully imported ${file.name}`);
      if (onSuccess) onSuccess();
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to import guests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
          id="csv-upload"
        />
        <label htmlFor="csv-upload" className="cursor-pointer block">
          <div className="text-gray-600">
            <p className="font-semibold">Click to upload CSV</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
            <p className="text-xs text-gray-400 mt-2">Format: name, email, phone</p>
          </div>
        </label>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">{success}</div>}

      <details className="text-sm text-gray-600">
        <summary className="cursor-pointer font-semibold mb-2">CSV Format Example</summary>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{`name,email,phone
John Doe,john@example.com,+84900000001
Jane Smith,jane@example.com,+84900000002`}
        </pre>
      </details>
    </div>
  );
}
