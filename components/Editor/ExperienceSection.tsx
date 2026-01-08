import React, { useState } from 'react';
import { Experience } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Briefcase, Plus, Trash2, Sparkles, Wand2 } from 'lucide-react';
import { enhanceExperienceDescription } from '../../services/geminiService';

interface ExperienceSectionProps {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items, onChange }) => {
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const handleAdd = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Experience, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleEnhance = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || !item.description) return;

    setEnhancingId(id);
    try {
      const enhanced = await enhanceExperienceDescription(item.description, item.position || "Professional");
      updateItem(id, 'description', enhanced);
    } catch (error) {
      alert("Enhancement failed.");
    } finally {
      setEnhancingId(null);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          Experience
        </h2>
        <Button onClick={handleAdd} variant="outline" size="sm" icon={<Plus className="w-4 h-4"/>}>
          Add
        </Button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50/50 group hover:border-indigo-100 transition-colors">
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="Company" 
                value={item.company} 
                onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                placeholder="Google"
              />
              <Input 
                label="Position" 
                value={item.position} 
                onChange={(e) => updateItem(item.id, 'position', e.target.value)}
                placeholder="Senior Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="Start Date" 
                value={item.startDate} 
                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                placeholder="Jan 2020"
              />
              <div className="flex items-end gap-2">
                 <Input 
                  label="End Date" 
                  value={item.endDate} 
                  onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  disabled={item.current}
                  className="w-full"
                />
                <div className="flex items-center h-10 pb-2">
                  <input 
                    type="checkbox" 
                    checked={item.current}
                    onChange={(e) => updateItem(item.id, 'current', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-xs text-slate-600">Current</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Description
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEnhance(item.id)}
                  isLoading={enhancingId === item.id}
                  disabled={!item.description}
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 h-8 text-xs"
                  icon={<Wand2 className="w-3 h-3" />}
                >
                  Enhance
                </Button>
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none"
                placeholder="• Led a team of 5 developers..."
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm italic">
            No experience added yet.
          </div>
        )}
      </div>
    </div>
  );
};