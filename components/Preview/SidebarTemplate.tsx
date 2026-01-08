import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, Globe, Linkedin, MapPin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const SidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { profile, experience, education, skills, languages, custom } = data;

  return (
    <div className="flex flex-row w-full h-full bg-white shadow-2xl print:shadow-none min-h-[1123px] max-w-[794px] mx-auto text-slate-800 print:w-full print:max-w-none overflow-hidden">
      
      {/* Left Sidebar */}
      <div className="w-[32%] bg-slate-900 text-slate-100 p-6 flex flex-col gap-8 print:bg-slate-900 print:text-white print:print-color-adjust-exact">
        
        {/* Profile Image & Contact */}
        <div className="text-center">
            {profile.image && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-700 mb-6 shadow-xl">
                    <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover" />
                </div>
            )}
            
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-700 pb-2 text-left">
                Contact
            </h2>
            
            <div className="flex flex-col gap-3 text-sm text-left">
                {profile.email && (
                    <div className="flex items-center gap-2 break-all">
                        <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-slate-300 font-light">{profile.email}</span>
                    </div>
                )}
                {profile.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-slate-300 font-light">{profile.phone}</span>
                    </div>
                )}
                 {profile.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-slate-300 font-light">{profile.location}</span>
                    </div>
                )}
                {profile.website && (
                    <div className="flex items-center gap-2 break-all">
                        <Globe className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-slate-300 font-light">{profile.website}</span>
                    </div>
                )}
                {profile.linkedin && (
                    <div className="flex items-center gap-2 break-all">
                        <Linkedin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-slate-300 font-light">{profile.linkedin}</span>
                    </div>
                )}
            </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
            <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-700 pb-2">
                    Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill.id} className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
             <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-700 pb-2">
                    Languages
                </h2>
                <div className="flex flex-col gap-2">
                    {languages.map(lang => (
                        <div key={lang.id} className="flex justify-between items-center text-sm">
                            <span className="text-slate-200">{lang.name}</span>
                            <span className="text-slate-500 text-xs uppercase">{lang.proficiency}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 bg-white">
        
        <header className="mb-8">
             <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase mb-2">
                {profile.fullName || "Your Name"}
            </h1>
            {/* We already showed location in sidebar, but maybe job title here? We don't have job title field specifically, using Summary for context */}
        </header>

         {/* Summary */}
        {profile.summary && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3">
                    Profile
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                    {profile.summary}
                </p>
            </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    Experience
                    <span className="h-[1px] bg-indigo-100 flex-1 ml-2"></span>
                </h2>
                <div className="space-y-6">
                    {experience.map(exp => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                        </div>
                        <div className="flex justify-between items-center mb-2 text-sm">
                             <span className="font-semibold text-slate-700">{exp.company}</span>
                             <span className="text-slate-500 italic">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                        </div>
                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-slate-100">
                             {exp.description}
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        )}

         {/* Education */}
        {education.length > 0 && (
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    Education
                    <span className="h-[1px] bg-indigo-100 flex-1 ml-2"></span>
                </h2>
                <div className="space-y-4">
                    {education.map(edu => (
                    <div key={edu.id}>
                         <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900">{edu.school}</h3>
                            <span className="text-xs font-medium text-slate-500">
                                {edu.endDate}
                            </span>
                        </div>
                        <div className="text-sm text-slate-700">
                             {edu.degree} <span className="text-slate-400">|</span> {edu.field}
                             {edu.score && <div className="text-indigo-600 text-xs font-semibold mt-0.5">{edu.score}</div>}
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        )}

        {/* Custom Sections */}
        {custom && custom.map(section => (
          <section key={section.id} className="mb-8 last:mb-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                  {section.title}
                  <span className="h-[1px] bg-indigo-100 flex-1 ml-2"></span>
              </h2>
              {section.type === 'list' ? (
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 pl-6">
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-slate-100">
                    {section.description}
                </div>
              )}
          </section>
        ))}

      </div>
    </div>
  );
};