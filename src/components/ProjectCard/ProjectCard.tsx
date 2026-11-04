import { useRef, type MouseEvent, type PointerEvent } from 'react';
import { Link } from '@tanstack/react-router';
import classNames from 'classnames/bind';
import { getCardImageUrl, type ProjectCardItem } from './projectCardItems';
import styles from './ProjectCard.module.scss';

const cx = classNames.bind(styles);

function trackSpotlight(event: PointerEvent<HTMLAnchorElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
  card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
}

type TitleLevel = 2 | 3 | 4;

type ProjectCardProps = {
  item: ProjectCardItem;
  to: string;
  params: Record<string, string>;
  titleLevel?: TitleLevel;
};

function cardTitleTag(level: TitleLevel): 'h2' | 'h3' | 'h4' {
  switch (level) {
    case 2:
      return 'h2';
    case 3:
      return 'h3';
    case 4:
      return 'h4';
    default: {
      const exhaustive: never = level;
      return exhaustive;
    }
  }
}

export function ProjectCard({
  item,
  to,
  params,
  titleLevel = 2,
}: ProjectCardProps) {
  const Title = cardTitleTag(titleLevel);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const markSharedElements = (event: MouseEvent<HTMLAnchorElement>) => {
    const opensElsewhere =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    if (opensElsewhere) return;
    titleRef.current?.style.setProperty('view-transition-name', 'project-title');
    imageRef.current?.style.setProperty('view-transition-name', 'project-image');
  };

  return (
    <Link
      to={to}
      params={params}
      className={cx('card')}
      data-project-card
      preload="intent"
      onPointerMove={trackSpotlight}
      onClick={markSharedElements}
    >
      <div className={cx('cardMedia')}>
        <img
          ref={imageRef}
          className={cx('cardMediaImage')}
          src={getCardImageUrl(item)}
          alt={item.imageAlt ?? item.title}
          loading="lazy"
          decoding="async"
        />
        {item.badge && (
          <span className={cx('badge')}>{item.badge}</span>
        )}
      </div>
      <div className={cx('cardBody')}>
        <Title ref={titleRef} className={cx('cardTitle')}>
          {item.title}
        </Title>
        <div className={cx('cardContentSlot')}>
          <p className={cx('cardDescription')}>{item.description}</p>
          <div className={cx('tech')}>
            {item.technologies.map((tech, idx) => (
              <span key={idx} className={cx('techTag')}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
