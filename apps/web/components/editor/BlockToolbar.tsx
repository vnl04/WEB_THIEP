'use client';

interface BlockToolbarProps {
  block: string;
  card: any;
  onSave: (card: any) => void;
}

export default function BlockToolbar({ block, card, onSave }: BlockToolbarProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="font-bold text-sm uppercase text-gray-600">Edit: {block}</h3>

      {block === 'cover' && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Cover Image</label>
            <button className="w-full py-2 px-3 border rounded-lg hover:bg-gray-50">
              Upload Image
            </button>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Opacity</label>
            <input type="range" min="0" max="100" className="w-full" />
          </div>
        </div>
      )}

      {block === 'countdown' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">Countdown to wedding date</p>
          <button className="w-full btn-primary">Edit Date</button>
        </div>
      )}

      {block === 'gallery' && (
        <div className="space-y-3">
          <button className="w-full btn-primary">Add Photos</button>
          <button className="w-full py-2 px-3 border rounded-lg">Add Video</button>
        </div>
      )}

      {block === 'rsvp' && (
        <div className="space-y-3">
          <label className="text-sm font-medium block">Deadline</label>
          <input type="date" className="input-field" />
        </div>
      )}

      {block === 'wishes' && (
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Require approval</span>
          </label>
        </div>
      )}

      {block === 'gift' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">QR code automatically generated</p>
          <button className="w-full py-2 px-3 border rounded-lg">Download QR</button>
        </div>
      )}
    </div>
  );
}
