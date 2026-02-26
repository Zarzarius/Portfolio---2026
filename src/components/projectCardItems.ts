import type { Project, ProjectGroup } from '../data/projects';

/** Unified item shape for a single project or a project group (collection). */
export interface ProjectCardItem {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  /** Optional badge, e.g. priority "A" for projects or "Collection" for groups */
  badge?: string;
  /** Optional image URL; when missing, a placeholder is used */
  image?: string;
  imageAlt?: string;
}

export function projectToCardItem(project: Project): ProjectCardItem {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    badge: project.priority,
    image: project.image,
    imageAlt: project.imageAlt,
  };
}

export function groupToCardItem(
  group: ProjectGroup,
  options?: { collectionLabel?: string; projectsLabel?: string },
): ProjectCardItem {
  const projectsLabel = options?.projectsLabel ?? 'projects';
  return {
    id: group.id,
    title: group.title,
    description: group.description ?? `${group.items.length} ${projectsLabel}`,
    technologies: group.technologies,
    badge: options?.collectionLabel ?? 'Collection',
    image: group.image,
    imageAlt: group.imageAlt,
  };
}

