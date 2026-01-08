import React from 'react';
import { CustomSection } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Layers, Plus, Trash2, AlignLeft, List as ListIcon, X } from 'lucide-react';

interface CustomSectionProps {
  items: CustomSection[];
  onChange: (items: CustomSection[]) => void;
}

export const CustomSectionEditor: React.FC<CustomSectionProps> = ({ items, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        title: '',
        type: 'paragraph',
        description: '',
        items: []
      }
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof CustomSection, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItemToList = (sectionId: string, value: string) => {
    if (!value.trim()) return;
    const section = items.find(i => i.id === sectionId);
    if (section) {
      updateItem(sectionId, 'items', [...section.items, value]);
    }
  };

  const removeItemFromList = (sectionId: string, index: number) => {
    const section = items.find(i => i.id === sectionId);
    if (section) {
      const newItems = [...section.items];
      newItems.splice(index, 1);
      updateItem(sectionId, 'items', newItems);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          Additional Sections
        </h2>
        <Button onClick={handleAdd} variant="outline" size="sm" icon={<Plus className="w-4 h-4"/>}>
          Add
        </Button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50/50 group hover:border-indigo-100 transition-colors">
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <Input
                label="Section Title"
                value={item.title}
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                placeholder="e.g. Projects, Volunteering, Awards"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Content Format
              </label>
              <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 inline-flex">
                <button
                  onClick={() => updateItem(item.id, 'type', 'paragraph')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    item.type === 'paragraph' 
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                  Paragraph
                </button>
                <button
                  onClick={() => updateItem(item.id, 'type', 'list')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    item.type === 'list' 
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ListIcon className="w-4 h-4" />
                  Bullet Points
                </button>
              </div>
            </div>

            {item.type === 'paragraph' ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Content
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none"
                  placeholder="Describe your achievements..."
                />
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  List Items
                </label>
                <div className="space-y-2">
                  {item.items.map((listItem, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800">
                        {listItem}
                      </div>
                      <button
                        onClick={() => removeItemFromList(item.id, idx)}
                        className="text-slate-400 hover:text-red-500 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add item and press Enter..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItemToList(item.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
         {items.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm italic">
            Add custom sections like "Volunteering", "Awards", or "Projects".
          </div>
        )}
      </div>
    </div>
  );
};