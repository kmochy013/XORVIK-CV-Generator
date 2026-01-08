import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { profile, experience, education, skills, languages, custom } = data;

  return (
    <div className="w-full h-full bg-white shadow-2xl print:shadow-none min-h-[1123px] max-w-[794px] mx-auto p-[40px] md:p-[50px] text-slate-800 print:w-full print:max-w-none">
      
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase mb-2 break-words">
            {profile.fullName || "Your Name"}
          </h1>
          {profile.location && (
              <div className="text-lg text-slate-500 font-medium mb-4">{profile.location}</div>
          )}
          
          <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-600">
            {profile.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">{profile.website}</span>
              </div>
            )}
            {profile.linkedin && (
               <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">{profile.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {profile.image && (
          <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-100 shadow-sm flex-shrink-0">
            <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Summary */}
      {profile.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-100 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {profile.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
           <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-1">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-semibold text-indigo-700 mb-2">{exp.company}</div>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
           <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-1">
            Education
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
                  {edu.degree} {edu.field && `in ${edu.field}`}
                  {edu.score && <span className="ml-2 text-slate-500 font-medium">• {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

       {/* Skills & Languages Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-1">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-800">{lang.name}</span>
                    <span className="text-slate-500 text-xs uppercase">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
       </div>

      {/* Custom Sections - Moved to bottom */}
      {custom && custom.map(section => (
        <section key={section.id} className="mb-8 last:mb-0">
           <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-1">
            {section.title}
          </h2>
          {section.type === 'list' ? (
             <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
             </ul>
          ) : (
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {section.description}
            </div>
          )}
        </section>
      ))}

    </div>
  );
};