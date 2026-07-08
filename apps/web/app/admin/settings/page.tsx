'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Wedding Card Platform',
    siteDescription: 'Create beautiful digital wedding cards',
    contactEmail: 'support@weddingcards.com',
    phoneNumber: '+84 123 456 789',
    maxGuestLimit: 500,
    maxMediaPerCard: 50,
    freeCardLimit: 3,
    maintenanceMode: false,
  });

  const [payments, setPayments] = useState({
    vnpayEnabled: true,
    momoEnabled: true,
    bankTransferEnabled: true,
    stripeEnabled: false,
  });

  const [email, setEmail] = useState({
    provider: 'sendgrid',
    senderName: 'Wedding Cards',
    senderEmail: 'noreply@weddingcards.com',
    apiKeyConfigured: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    console.log('Settings saved:', { settings, payments, email });
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">System Settings</h1>
      <p className="text-gray-600 mb-8">Configure platform settings and integrations</p>

      {/* General Settings */}
      <div className="bg-white card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">General Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={settings.phoneNumber}
                onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Max Guests Per Card</label>
              <input
                type="number"
                value={settings.maxGuestLimit}
                onChange={(e) => handleSettingChange('maxGuestLimit', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Free Cards Per User</label>
              <input
                type="number"
                value={settings.freeCardLimit}
                onChange={(e) => handleSettingChange('freeCardLimit', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenance"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="maintenance" className="ml-2 text-sm font-medium">
              Enable Maintenance Mode (Disable user access)
            </label>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">VNPay Integration</span>
            <input
              type="checkbox"
              checked={payments.vnpayEnabled}
              onChange={(e) => setPayments({ ...payments, vnpayEnabled: e.target.checked })}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">Momo Integration</span>
            <input
              type="checkbox"
              checked={payments.momoEnabled}
              onChange={(e) => setPayments({ ...payments, momoEnabled: e.target.checked })}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">Bank Transfer</span>
            <input
              type="checkbox"
              checked={payments.bankTransferEnabled}
              onChange={(e) => setPayments({ ...payments, bankTransferEnabled: e.target.checked })}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Stripe Integration</span>
            <input
              type="checkbox"
              checked={payments.stripeEnabled}
              onChange={(e) => setPayments({ ...payments, stripeEnabled: e.target.checked })}
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Email Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Provider</label>
            <select
              value={email.provider}
              onChange={(e) => setEmail({ ...email, provider: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
              <option value="aws-ses">AWS SES</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sender Name</label>
            <input
              type="text"
              value={email.senderName}
              onChange={(e) => setEmail({ ...email, senderName: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sender Email</label>
            <input
              type="email"
              value={email.senderEmail}
              onChange={(e) => setEmail({ ...email, senderEmail: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded">
            <p className="text-sm">
              <span className="font-medium">API Key Status:</span>{' '}
              {email.apiKeyConfigured ? (
                <span className="text-green-600">Configured</span>
              ) : (
                <span className="text-red-600">Not Configured</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-white card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Database Status</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-green-600 font-medium">Connected</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span>PostgreSQL</span>
          </div>
          <div className="flex justify-between">
            <span>Host:</span>
            <span className="font-mono">db.example.com</span>
          </div>
          <div className="flex justify-between">
            <span>Backup Status:</span>
            <span className="text-green-600 font-medium">Daily</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded font-medium"
        >
          Save Settings
        </button>
        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}
