
export interface CVProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  score?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'paragraph' | 'list';
  description: string;
  items: string[];
}

export interface CVData {
  profile: CVProfile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  custom: CustomSection[];
  themeColor: string;
}

export enum GeneratorAction {
  SUMMARIZE = 'SUMMARIZE',
  ENHANCE_EXPERIENCE = 'ENHANCE_EXPERIENCE',
}