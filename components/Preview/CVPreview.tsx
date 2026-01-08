import React from 'react';
import { CVData } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { SidebarTemplate } from './SidebarTemplate';
import { ClassicTemplate } from './ClassicTemplate';

interface CVPreviewProps {
  data: CVData;
  template: 'modern' | 'sidebar' | 'classic';
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, template }) => {
  if (template === 'sidebar') {
    return <SidebarTemplate data={data} />;
  }
  if (template === 'classic') {
    return <ClassicTemplate data={data} />;
  }
  return <ModernTemplate data={data} />;
};