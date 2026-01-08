import React, { useState, useRef } from 'react';
import { CVProfile } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Sparkles, Mail, Phone, Globe, Linkedin, User, Upload, X } from 'lucide-react';
import { generateProfessionalSummary } from '../../services/geminiService';

interface ProfileSectionProps {
  data: CVProfile;
  onChange: (data: CVProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ ...data, image: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateProfessionalSummary("Professional", data.fullName || "Candidate");
      onChange({ ...data, summary });
    } catch (error) {
      alert("Failed to generate summary. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-500" />
        Personal Details
      </h2>
      
      {/* Image Upload Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center ${!data.image ? 'border-dashed' : ''}`}>
            {data.image ? (
              <img src={data.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-slate-300" />
            )}
          </div>
          {data.image && (
            <button 
              onClick={removeImage}
              className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="flex-1">
           <label className="block text-sm font-medium text-slate-700 mb-2">Profile Picture</label>
           <div className="flex gap-3">
             <Button 
               variant="outline" 
               size="sm" 
               className="text-xs"
               onClick={() => fileInputRef.current?.click()}
               icon={<Upload className="w-3 h-3" />}
             >
               Upload Photo
             </Button>
             <input 
               type="file" 
               ref={fileInputRef}
               className="hidden" 
               accept="image/*"
               onChange={handleImageUpload}
             />
           </div>
           <p className="text-xs text-slate-400 mt-2">Recommended: Square JPG, PNG. Max 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Full Name" 
          name="fullName" 
          value={data.fullName} 
          onChange={handleChange} 
          placeholder="e.g. John Doe"
        />
        <Input 
          label="Job Title / Headline" 
          name="location"
          value={data.location} 
          onChange={handleChange} 
          placeholder="e.g. New York, USA"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
            <Mail className="absolute top-8 left-3 w-4 h-4 text-slate-400" />
            <Input 
              label="Email" 
              name="email" 
              type="email"
              value={data.email} 
              onChange={handleChange} 
              className="pl-9"
              placeholder="john@example.com"
            />
        </div>
        <div className="relative">
            <Phone className="absolute top-8 left-3 w-4 h-4 text-slate-400" />
            <Input 
              label="Phone" 
              name="phone" 
              value={data.phone} 
              onChange={handleChange} 
              className="pl-9"
              placeholder="+1 234 567 890"
            />
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
            <Globe className="absolute top-8 left-3 w-4 h-4 text-slate-400" />
            <Input 
              label="Website" 
              name="website" 
              value={data.website} 
              onChange={handleChange} 
              className="pl-9"
              placeholder="portfolio.com"
            />
        </div>
        <div className="relative">
            <Linkedin className="absolute top-8 left-3 w-4 h-4 text-slate-400" />
            <Input 
              label="LinkedIn" 
              name="linkedin" 
              value={data.linkedin} 
              onChange={handleChange} 
              className="pl-9"
              placeholder="linkedin.com/in/john"
            />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Professional Summary
          </label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGenerateSummary}
            isLoading={isGenerating}
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 h-8 text-xs"
            icon={<Sparkles className="w-3 h-3" />}
          >
            Auto-Generate
          </Button>
        </div>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none"
          placeholder="Briefly describe your professional background and key achievements..."
        />
      </div>
    </div>
  );
};