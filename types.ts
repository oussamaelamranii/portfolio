import React from 'react';

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  details?: string;
}

export interface Project {
  title: string;
  status?: string;
  year?: string;
  description: string[];
  tech: string[];
  category: 'Web' | 'IoT' | 'Mobile' | 'Other';
  image: string;
  link: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ElementType;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}