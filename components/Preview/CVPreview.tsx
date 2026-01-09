import React from 'react';
import { CVData } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { SidebarTemplate } from './SidebarTemplate';
import { ClassicTemplate } from './ClassicTemplate';

interface CVPreviewProps {
  data: CVData;
  template: 'modern' | 'sidebar' | 'classic';
  exportMode?: boolean;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, template, exportMode = false }) => {
  if (template === 'sidebar') {
    return <SidebarTemplate data={data} exportMode={exportMode} />;
  }
  if (template === 'classic') {
    return <ClassicTemplate data={data} exportMode={exportMode} />;
  }
  return <ModernTemplate data={data} exportMode={exportMode} />;
};