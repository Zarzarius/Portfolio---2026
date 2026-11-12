import { useEffect, useRef } from 'react';

interface MagneticOptions {
  strength?: number;
  maxDistance?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
) {
  const { strength = 0.32, maxDistance = 12 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

    const animate = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (el) {
        el.style.setProperty('--magnet-x', `${currentX.toFixed(2)}px`);
        el.style.setProperty('--magnet-y', `${currentY.toFixed(2)}px`);
      }

      // Continue animating until settled
      if (
        isHovered ||
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentX = 0;
        currentY = 0;
        if (el) {
          el.style.setProperty('--magnet-x', '0px');
          el.style.setProperty('--magnet-y', '0px');
        }
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp to max distance
      const dist = Math.hypot(deltaX, deltaY);
      if (dist > maxDistance) {
        targetX = (deltaX / dist) * maxDistance;
        targetY = (deltaY / dist) * maxDistance;
      } else {
        targetX = deltaX;
        targetY = deltaY;
      }

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerEnter = () => {
      isHovered = true;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.removeProperty('--magnet-x');
      el.style.removeProperty('--magnet-y');
    };
  }, [strength, maxDistance]);

  return ref;
}
