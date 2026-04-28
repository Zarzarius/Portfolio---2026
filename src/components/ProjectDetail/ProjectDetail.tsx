import { Link } from '@tanstack/react-router';
import { ArrowIcon } from '@/components/ArrowIcon';

type BackToProjectsLinkProps = {
  locale: string;
  label: string;
  className: string;
  iconClassName: string;
};

type DetailHeaderProps = {
  title: string;
  meta: string;
  headerClassName: string;
  metaClassName: string;
  titleClassName: string;
};

type AchievementsListProps = {
  achievements: string[] | undefined;
  heading: string;
  sectionClassName: string;
  headingClassName: string;
  listClassName: string;
  itemClassName: string;
};

type TechTagListProps = {
  technologies: string[];
  heading: string;
  sectionClassName: string;
  headingClassName: string;
  listClassName: string;
  tagClassName: string;
};

export function BackToProjectsLink({
  locale,
  label,
  className,
  iconClassName,
}: BackToProjectsLinkProps) {
  return (
    <Link
      to="/$locale/projects"
      params={{ locale }}
      className={className}
      preload="intent"
    >
      <ArrowIcon direction="left" className={iconClassName} />
      {label}
    </Link>
  );
}

export function DetailHeader({
  title,
  meta,
  headerClassName,
  metaClassName,
  titleClassName,
}: DetailHeaderProps) {
  return (
    <header className={headerClassName}>
      <span className={metaClassName}>{meta}</span>
      <h1 className={titleClassName}>{title}</h1>
    </header>
  );
}

export function AchievementsList({
  achievements,
  heading,
  sectionClassName,
  headingClassName,
  listClassName,
  itemClassName,
}: AchievementsListProps) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className={sectionClassName}>
      <h2 className={headingClassName}>{heading}</h2>
      <ul className={listClassName}>
        {achievements.map((achievement) => (
          <li key={achievement} className={itemClassName}>
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechTagList({
  technologies,
  heading,
  sectionClassName,
  headingClassName,
  listClassName,
  tagClassName,
}: TechTagListProps) {
  return (
    <div className={sectionClassName}>
      <h2 className={headingClassName}>{heading}</h2>
      <ul className={listClassName}>
        {technologies.map((tech) => (
          <li key={tech} className={tagClassName}>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

