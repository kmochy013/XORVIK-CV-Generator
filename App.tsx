import React, { useState, useRef } from 'react';
import { CVData } from './types';
import { ProfileSection } from './components/Editor/ProfileSection';
import { ExperienceSection } from './components/Editor/ExperienceSection';
import { EducationSection } from './components/Editor/EducationSection';
import { LanguageSection } from './components/Editor/LanguageSection';
import { CustomSectionEditor } from './components/Editor/CustomSectionEditor';
import { CVPreview } from './components/Preview/CVPreview';
import { Button } from './components/ui/Button';
import { Printer, Layout, Sparkles, Trash2, FileText, Columns, Clock, Palette, Download } from 'lucide-react';
import { Input } from './components/ui/Input';

const INITIAL_DATA: CVData = {
  profile: {
    fullName: 'Alex Anderson',
    email: 'alex.anderson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'www.alexanderson.dev',
    linkedin: 'linkedin.com/in/alexanderson',
    summary: 'Senior Software Engineer with 8+ years of experience in full-stack development. Proven track record of leading teams and delivering scalable web applications. Passionate about clean code and user-centric design.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2020',
      endDate: 'Present',
      current: true,
      description: '• Architected the core frontend platform using React and TypeScript.\n• Improved application performance by 40% through code splitting and lazy loading.\n• Mentored 4 junior developers and established code review standards.'
    },
    {
      id: '2',
      company: 'Creative Studio',
      position: 'Web Developer',
      startDate: '2018',
      endDate: '2020',
      current: false,
      description: '• Developed responsive websites for 20+ clients using modern web technologies.\n• Collaborated with designers to implement pixel-perfect user interfaces.\n• Managed deployment pipelines and reduced downtime by 99%.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      score: '3.8 GPA'
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 5 },
    { id: '2', name: 'TypeScript', level: 5 },
    { id: '3', name: 'Node.js', level: 4 },
    { id: '4', name: 'Tailwind CSS', level: 5 },
    { id: '5', name: 'AWS', level: 3 },
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Intermediate' }
  ],
  custom: [],
  themeColor: '#4f46e5'
};

const THEME_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Slate', value: '#475569' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Orange', value: '#ea580c' },
];

function App() {
  const [data, setData] = useState<CVData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [template, setTemplate] = useState<'modern' | 'sidebar' | 'classic'>('modern');
  const [newSkill, setNewSkill] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    setIsDownloading(true);
    const element = printRef.current;
    
    // Configure html2pdf options
    const opt = {
      margin: 0,
      filename: `${data.profile.fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use globally available html2pdf from CDN
    // @ts-ignore
    if (window.html2pdf) {
       // @ts-ignore
       window.html2pdf().set(opt).from(element).save().then(() => {
         setIsDownloading(false);
       }).catch((err: any) => {
         console.error("PDF generation failed:", err);
         setIsDownloading(false);
         alert("Failed to generate PDF. Please try again.");
       });
    } else {
      alert("PDF library not loaded. Please refresh the page.");
      setIsDownloading(false);
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, { id: crypto.randomUUID(), name: newSkill.trim(), level: 3 }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Xorvik<span className="text-indigo-600">CV</span></span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex md:hidden bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('editor')}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${activeTab === 'editor' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Editor
                </button>
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Preview
                </button>
             </div>

            <Button 
              onClick={generatePDF} 
              variant="primary" 
              isLoading={isDownloading}
              icon={<Download className="w-4 h-4" />}
            >
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Editor Column */}
          <div className={`lg:col-span-5 space-y-8 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            
            {/* Template Selector */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <Layout className="w-5 h-5 text-indigo-500" />
                  Select Template
               </h2>
               <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setTemplate('modern')}
                    className={`p-2 rounded-lg border-2 text-left transition-all flex flex-col items-center justify-center gap-2 h-24 ${template === 'modern' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                     <FileText className={`w-6 h-6 ${template === 'modern' ? 'text-indigo-600' : 'text-slate-400'}`} />
                     <span className={`font-semibold text-xs ${template === 'modern' ? 'text-indigo-900' : 'text-slate-700'}`}>Modern</span>
                  </button>

                   <button 
                    onClick={() => setTemplate('sidebar')}
                    className={`p-2 rounded-lg border-2 text-left transition-all flex flex-col items-center justify-center gap-2 h-24 ${template === 'sidebar' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                     <Columns className={`w-6 h-6 ${template === 'sidebar' ? 'text-indigo-600' : 'text-slate-400'}`} />
                     <span className={`font-semibold text-xs ${template === 'sidebar' ? 'text-indigo-900' : 'text-slate-700'}`}>Sidebar</span>
                  </button>

                  <button 
                    onClick={() => setTemplate('classic')}
                    className={`p-2 rounded-lg border-2 text-left transition-all flex flex-col items-center justify-center gap-2 h-24 ${template === 'classic' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                     <Clock className={`w-6 h-6 ${template === 'classic' ? 'text-indigo-600' : 'text-slate-400'}`} />
                     <span className={`font-semibold text-xs ${template === 'classic' ? 'text-indigo-900' : 'text-slate-700'}`}>Timeline</span>
                  </button>
               </div>
            </div>

            {/* Theme Color Picker */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-indigo-500" />
                Theme Color
              </h2>
              <div className="flex flex-wrap gap-3">
                {THEME_COLORS.map((color) => (
                   <button
                     key={color.value}
                     onClick={() => setData(prev => ({ ...prev, themeColor: color.value }))}
                     className={`w-8 h-8 rounded-full border-2 transition-all ${data.themeColor === color.value ? 'border-slate-800 scale-110' : 'border-transparent hover:scale-110'}`}
                     style={{ backgroundColor: color.value }}
                     title={color.name}
                   />
                ))}
                <div className="relative group">
                    <input 
                        type="color"
                        value={data.themeColor}
                        onChange={(e) => setData(prev => ({ ...prev, themeColor: e.target.value }))}
                        className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-all group-hover:scale-110" style={{ background: `conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)` }}>
                    </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 items-start">
               <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600">
                 <Sparkles className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-semibold text-indigo-900 text-sm">AI Powered</h3>
                 <p className="text-xs text-indigo-700 mt-1">Use the magic wand icons to auto-generate summaries or enhance your job descriptions with Google Gemini.</p>
               </div>
            </div>

            <ProfileSection 
              data={data.profile} 
              onChange={(profile) => setData(prev => ({ ...prev, profile }))} 
            />
            
            <ExperienceSection 
              items={data.experience} 
              onChange={(experience) => setData(prev => ({ ...prev, experience }))} 
            />

            <EducationSection 
              items={data.education} 
              onChange={(education) => setData(prev => ({ ...prev, education }))} 
            />

            <LanguageSection 
              items={data.languages} 
              onChange={(languages) => setData(prev => ({ ...prev, languages }))} 
            />

            <CustomSectionEditor 
              items={data.custom}
              onChange={(custom) => setData(prev => ({ ...prev, custom }))}
            />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Layout className="w-5 h-5 text-indigo-500" />
                Skills
              </h2>
              <div className="mb-4">
                 <Input 
                  label="Add Skill (Press Enter)" 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="e.g. Project Management"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <div key={skill.id} className="group flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-700">
                    <span>{skill.name}</span>
                    <button onClick={() => removeSkill(skill.id)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Preview Column */}
          <div className={`lg:col-span-7 ${activeTab === 'editor' ? 'hidden lg:block' : ''}`}>
             <div className="sticky top-24">
                <div className="mb-4 flex justify-between items-center lg:hidden">
                   <h2 className="font-bold text-slate-500 uppercase text-xs tracking-wider">Live Preview</h2>
                </div>
                
                {/* Visual wrapper for the paper effect */}
                <div>
                    <CVPreview data={data} template={template} />
                </div>
                
                <div className="mt-8 text-center text-xs text-slate-400">
                   <p>Preview updates automatically as you type.</p>
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* Hidden Render Container for HTML2PDF */}
      {/* Positioned off-screen but rendered to ensure html2canvas can capture it */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        <div ref={printRef} className="w-[794px]">
             <CVPreview data={data} template={template} exportMode={true} />
        </div>
      </div>

    </div>
  );
}

export default App;