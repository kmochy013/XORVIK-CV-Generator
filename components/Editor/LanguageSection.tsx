import React from 'react';
import { Language } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Languages, Plus, Trash2 } from 'lucide-react';

interface LanguageSectionProps {
  items: Language[];
  onChange: (items: Language[]) => void;
}

const PROFICIENCY_LEVELS = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Beginner"
];

export const LanguageSection: React.FC<LanguageSectionProps> = ({ items, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        name: '',
        proficiency: ''
      }
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Language, value: string) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Languages className="w-5 h-5 text-indigo-500" />
          Languages
        </h2>
        <Button onClick={handleAdd} variant="outline" size="sm" icon={<Plus className="w-4 h-4"/>}>
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50/50 group hover:border-indigo-100 transition-colors">
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Language" 
                value={item.name} 
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                placeholder="e.g. English"
              />
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Proficiency
                </label>
                <select
                  value={item.proficiency}
                  onChange={(e) => updateItem(item.id, 'proficiency', e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm text-slate-800 bg-white"
                >
                  <option value="" disabled>Select level</option>
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
         {items.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm italic">
            No languages added yet.
          </div>
        )}
      </div>
    </div>
  );
};