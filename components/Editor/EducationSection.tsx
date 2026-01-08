import React from 'react';
import { Education } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationSectionProps {
  items: Education[];
  onChange: (items: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ items, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        score: ''
      }
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Education, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-500" />
          Education
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="School / University" 
                value={item.school} 
                onChange={(e) => updateItem(item.id, 'school', e.target.value)}
                placeholder="Stanford University"
              />
              <Input 
                label="Degree" 
                value={item.degree} 
                onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <Input 
                label="Field of Study" 
                value={item.field} 
                onChange={(e) => updateItem(item.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
               <Input 
                label="Grade / GPA" 
                value={item.score || ''} 
                onChange={(e) => updateItem(item.id, 'score', e.target.value)}
                placeholder="e.g. 3.8/4.0 or 85%"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input 
                label="Start Date" 
                value={item.startDate} 
                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                placeholder="2014"
              />
              <Input 
                label="End Date" 
                value={item.endDate} 
                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                placeholder="2018"
              />
            </div>
          </div>
        ))}
         {items.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm italic">
            No education added yet.
          </div>
        )}
      </div>
    </div>
  );
};