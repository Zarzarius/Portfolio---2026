import { createServerFn } from '@tanstack/react-start';
import { projects, categories, showcaseProjects } from '../data/projects';
import { techCategories } from '../data/stack';
import { skills } from '../data/skills';

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
  return projects;
});

export const getCategories = createServerFn({ method: 'GET' }).handler(async () => {
  return categories;
});

export const getShowcaseProjects = createServerFn({ method: 'GET' }).handler(async () => {
  return showcaseProjects;
});

export const getStack = createServerFn({ method: 'GET' }).handler(async () => {
  return techCategories;
});

export const getSkills = createServerFn({ method: 'GET' }).handler(async () => {
  return skills;
});
