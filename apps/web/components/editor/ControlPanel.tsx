'use client';

import { useState } from 'react';

interface ControlPanelProps {
  card: any;
  activeTab: string;
  onSave: (card: any) => void;
  selectedBlock: string | null;
  onBlockSelect: (blockId: string) => void;
}

export default function ControlPanel({
  card,
  activeTab,
  onSave,
  selectedBlock,
  onBlockSelect,
}: ControlPanelProps) {
  const [formData, setFormData] = useState({
    brideName: card.brideName || '',
    groomName: card.groomName || '',
    weddingDate: card.weddingDate || '',
    story: card.story || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveContent = () => {
    onSave({ ...card, ...formData });
  };

  return (
    <div className="p-4 space-y-4">
      {activeTab === 'content' && (
        <>
          <div>
            <label className="text-sm font-medium block mb-1">Bride Name</label>
            <input
              type="text"
              name="brideName"
              value={formData.brideName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter bride's name"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Groom Name</label>
            <input
              type="text"
              name="groomName"
              value={formData.groomName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter groom's name"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Wedding Date</label>
            <input
              type="datetime-local"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Story</label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              className="input-field h-24 resize-none"
              placeholder="Tell your love story..."
            />
          </div>

          <button onClick={handleSaveContent} className="btn-primary w-full">
            Save Content
          </button>
        </>
      )}

      {activeTab === 'design' && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Primary Color</label>
            <div className="flex gap-2">
              {['#D4736E', '#8B6F47', '#F5E6D3'].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border-2"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Font Style</label>
            <select className="input-field">
              <option>Modern</option>
              <option>Traditional</option>
              <option>Elegant</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'guests' && (
        <div className="space-y-3">
          <button className="btn-primary w-full">Add Guest</button>
          <button className="btn-secondary w-full">Import CSV</button>
          <div className="text-sm text-gray-500">0 guests added</div>
        </div>
      )}

      {activeTab === 'gifts' && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Bank Account</label>
            <input
              type="text"
              className="input-field"
              placeholder="Account number"
            />
          </div>
          <button className="btn-primary w-full">Configure QR</button>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Card Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="My Wedding Card"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-save</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      )}
    </div>
  );
}
