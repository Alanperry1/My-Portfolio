import React from 'react';

export interface Skill {
  name: string;
  icon: string;
}

// Using SimpleIcons CDN with color/dark-mode-color support where applicable
// Format: https://cdn.simpleicons.org/[SLUG]/[COLOR]/[DARK_MODE_COLOR]
export const SKILLS: Skill[] = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Go', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
  { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/000000/ffffff' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/000000/ffffff' },
  { name: 'Nest.js', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/2D3748' },
  { name: 'Drizzle', icon: 'https://cdn.simpleicons.org/drizzle/C5F74F' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
  { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
  { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
];
