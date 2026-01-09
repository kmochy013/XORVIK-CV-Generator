import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, Globe, Linkedin, MapPin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { profile, experience, education, skills, languages, custom, themeColor } = data;

  return (
    <div className="w-full h-full bg-white shadow-2xl print:shadow-none min-h-[1123px] max-w-[794px] mx-auto p-8 text-slate-800 print:w-full print:max-w-none text-sm">
      
      {/* Header */}
      <div className="flex gap-6 mb-8 border-b-2 pb-6 items-center" style={{ borderColor: themeColor }}>
        {profile.image && (
           <div className="w-32 h-32 flex-shrink-0">
             <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover rounded-full border-4 border-slate-100 shadow-md" />
           </div>
        )}
        <div className="flex-1">
           <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wide mb-4">{profile.fullName}</h1>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600">
              {profile.location && (
                <div className="flex items-center gap-2">
                   <MapPin className="w-3.5 h-3.5" style={{ color: themeColor }} />
                   <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2">
                   <Mail className="w-3.5 h-3.5" style={{ color: themeColor }} />
                   <span className="break-all">{profile.email}</span>
                </div>
              )}
               {profile.phone && (
                <div className="flex items-center gap-2">
                   <Phone className="w-3.5 h-3.5" style={{ color: themeColor }} />
                   <span>{profile.phone}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2">
                   <Globe className="w-3.5 h-3.5" style={{ color: themeColor }} />
                   <span className="break-all">{profile.website}</span>
                </div>
              )}
               {profile.linkedin && (
                <div className="flex items-center gap-2">
                   <Linkedin className="w-3.5 h-3.5" style={{ color: themeColor }} />
                   <span className="break-all">{profile.linkedin}</span>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* About Me */}
        {profile.summary && (
            <section>
                <h2 className="text-sm font-bold uppercase mb-3 tracking-wider" style={{ color: themeColor }}>About Me</h2>
                <div className="text-slate-700 leading-relaxed border-l-2 pl-4" style={{ borderColor: `${themeColor}30` }}>
                    {profile.summary}
                </div>
            </section>
        )}

        {/* Education */}
        {education.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase mb-4 tracking-wider border-b border-slate-100 pb-2" style={{ color: themeColor }}>Education and Training</h2>
                <div className="space-y-4">
                    {education.map(edu => (
                        <div key={edu.id} className="flex flex-col md:flex-row gap-2 md:gap-8">
                            <div className="md:w-1/4 text-xs font-medium text-slate-500 pt-1 whitespace-nowrap">
                                [ {edu.startDate} – {edu.endDate} ]
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-800 text-base">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                                <div className="text-slate-700 font-medium">{edu.school}</div>
                                {edu.score && <div className="text-slate-600 text-xs mt-1">Grade: {edu.score}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
             <section>
                <h2 className="text-sm font-bold uppercase mb-4 tracking-wider border-b border-slate-100 pb-2" style={{ color: themeColor }}>Work Experience</h2>
                <div className="space-y-6">
                    {experience.map(exp => (
                        <div key={exp.id} className="flex flex-col md:flex-row gap-2 md:gap-8">
                            <div className="md:w-1/4 text-xs font-medium text-slate-500 pt-1 whitespace-nowrap">
                                [ {exp.startDate} – {exp.current ? 'Current' : exp.endDate} ]
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-800 text-base">{exp.position}</div>
                                <div className="font-medium mb-2" style={{ color: themeColor }}>{exp.company}</div>
                                <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                                    {exp.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}
        
        <div className="space-y-6">
             {/* Languages */}
            {languages && languages.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase mb-4 tracking-wider border-b border-slate-100 pb-2" style={{ color: themeColor }}>Language Skills</h2>
                    <div className="space-y-2">
                        {languages.map(lang => (
                            <div key={lang.id} className="flex justify-between border-b border-slate-50 pb-1 last:border-0">
                                <span className="font-semibold text-slate-700">{lang.name}</span>
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{lang.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
             {skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase mb-4 tracking-wider border-b border-slate-100 pb-2" style={{ color: themeColor }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                             <span key={skill.id} className="border border-slate-200 text-slate-700 px-3 py-1 rounded text-xs font-medium">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>

        {/* Custom Sections - Moved to bottom */}
        {custom && custom.map(section => (
            <section key={section.id}>
                <h2 className="text-sm font-bold uppercase mb-3 tracking-wider border-b border-slate-100 pb-2" style={{ color: themeColor }}>{section.title}</h2>
                {section.type === 'list' ? (
                   <ul className="list-disc pl-5 text-slate-700 space-y-1 border-l-2 pl-6" style={{ borderColor: `${themeColor}30` }}>
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                   </ul>
                ) : (
                  <div className="text-slate-700 leading-relaxed border-l-2 pl-4 whitespace-pre-line" style={{ borderColor: `${themeColor}30` }}>
                      {section.description}
                  </div>
                )}
            </section>
        ))}

      </div>
    </div>
  );
};