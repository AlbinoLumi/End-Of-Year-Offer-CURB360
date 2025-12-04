import React from 'react';

export interface Package {
  id: string;
  name: string;
  spend: number;
  back: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface NavItem {
  label: string;
  href: string;
}