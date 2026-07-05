'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CanvasPreview from '@/components/editor/CanvasPreview';
import ControlPanel from '@/components/editor/ControlPanel';
import BlockToolbar from '@/components/editor/BlockToolbar';

export default function EditorPage() {
  const params = useParams();
  const cardId = params.cardId as string;
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards/${cardId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCard(data);
      } catch (error) {
        console.error('Failed to fetch card:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cardId) {
      fetchCard();
    }
  }, [cardId]);

  const handleSave = async (updatedCard: any) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards/${cardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCard),
      });
      setCard(updatedCard);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards/${cardId}/publish`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCard(data);
      alert('Card published! Shareable link: ' + `https://yourapp.com/${data.slug}`);
    } catch (error) {
      console.error('Publish failed:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }

  if (!card) {
    return <div className="flex items-center justify-center h-screen">Card not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-light">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{card.name}</h1>
          <p className="text-sm text-gray-500">Edit your wedding card</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Preview
          </button>
          <button onClick={handlePublish} className="btn-primary">
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Control Panel */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="flex border-b">
            {['content', 'design', 'guests', 'gifts', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <ControlPanel
            card={card}
            activeTab={activeTab}
            onSave={handleSave}
            selectedBlock={selectedBlock}
            onBlockSelect={setSelectedBlock}
          />
        </div>

        {/* Canvas Preview */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-auto">
          <CanvasPreview
            card={card}
            onBlockSelect={setSelectedBlock}
            selectedBlock={selectedBlock}
            onSave={handleSave}
          />
        </div>

        {/* Block Toolbar */}
        {selectedBlock && (
          <div className="w-64 bg-white border-l overflow-y-auto">
            <BlockToolbar block={selectedBlock} card={card} onSave={handleSave} />
          </div>
        )}
      </div>
    </div>
  );
}
