import {
  ProjectCard,
  groupToCardItem,
  projectToCardItem,
} from '@/components/ProjectCard';
import type { Project, ProjectGroup } from '@/data/projects';

type ProjectSectionsClassNames = {
  projectGroup: string;
  groupTitle: string;
  grid: string;
};

type ProjectSectionsProps = {
  projects: Project[];
  groups: ProjectGroup[];
  locale: string;
  professionalLabel: string;
  personalLabel: string;
  collectionLabel: string;
  projectsLabel: string;
  classNames: ProjectSectionsClassNames;
  headingLevel?: 2 | 3;
};

export function ProjectSections({
  projects,
  groups,
  locale,
  professionalLabel,
  personalLabel,
  collectionLabel,
  projectsLabel,
  classNames,
  headingLevel = 2,
}: ProjectSectionsProps) {
  const professionalProjects = projects.filter(
    (project) => project.type === 'professional',
  );
  const personalProjects = projects.filter(
    (project) => project.type === 'personal',
  );
  const professionalGroups = groups.filter(
    (group) => group.type === 'professional',
  );
  const personalGroups = groups.filter((group) => group.type === 'personal');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <>
      {(professionalProjects.length > 0 || professionalGroups.length > 0) && (
        <section className={classNames.projectGroup}>
          <Heading className={classNames.groupTitle}>{professionalLabel}</Heading>
          <div className={classNames.grid}>
            {professionalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                item={projectToCardItem(project)}
                to="/$locale/projects/$projectSlug"
                params={{ locale, projectSlug: project.slug }}
              />
            ))}
            {professionalGroups.map((group) => (
              <ProjectCard
                key={`group-${group.id}`}
                item={groupToCardItem(group, {
                  collectionLabel,
                  projectsLabel,
                })}
                to="/$locale/projects/group/$groupSlug"
                params={{ locale, groupSlug: group.slug }}
              />
            ))}
          </div>
        </section>
      )}

      {(personalProjects.length > 0 || personalGroups.length > 0) && (
        <section className={classNames.projectGroup}>
          <Heading className={classNames.groupTitle}>{personalLabel}</Heading>
          <div className={classNames.grid}>
            {personalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                item={projectToCardItem(project)}
                to="/$locale/projects/$projectSlug"
                params={{ locale, projectSlug: project.slug }}
              />
            ))}
            {personalGroups.map((group) => (
              <ProjectCard
                key={`group-${group.id}`}
                item={groupToCardItem(group, {
                  collectionLabel,
                  projectsLabel,
                })}
                to="/$locale/projects/group/$groupSlug"
                params={{ locale, groupSlug: group.slug }}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
