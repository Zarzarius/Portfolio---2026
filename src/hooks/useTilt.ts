import { useEffect, useRef } from 'react';

interface TiltOptions {
  maxRotation?: number; // Maximum tilt angle in degrees (default 6)
  perspective?: number; // Perspective distance in px (default 1000)
  scale?: number; // Scale on hover (default 1.015)
}

export function useTilt<T extends HTMLElement = HTMLElement>(
  options: TiltOptions = {},
) {
  const { maxRotation = 6, perspective = 1000, scale = 1.015 } = options;
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
    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetScale = 1;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentScale = 1;
    let isHovered = false;

    const animate = () => {
      // Smooth lerp
      currentRotateX += (targetRotateX - currentRotateX) * 0.14;
      currentRotateY += (targetRotateY - currentRotateY) * 0.14;
      currentScale += (targetScale - currentScale) * 0.14;

      if (el) {
        el.style.setProperty('--tilt-rx', `${currentRotateX.toFixed(2)}deg`);
        el.style.setProperty('--tilt-ry', `${currentRotateY.toFixed(2)}deg`);
        el.style.setProperty('--tilt-scale', currentScale.toFixed(3));
      }

      if (
        isHovered ||
        Math.abs(targetRotateX - currentRotateX) > 0.02 ||
        Math.abs(targetRotateY - currentRotateY) > 0.02 ||
        Math.abs(targetScale - currentScale) > 0.002
      ) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentRotateX = 0;
        currentRotateY = 0;
        currentScale = 1;
        if (el) {
          el.style.setProperty('--tilt-rx', '0deg');
          el.style.setProperty('--tilt-ry', '0deg');
          el.style.setProperty('--tilt-scale', '1');
        }
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position
      el.style.setProperty('--spot-x', `${x}px`);
      el.style.setProperty('--spot-y', `${y}px`);

      // Calculate tilt angles:
      // Mouse at top (y = 0) -> positive rotateX (tilts back)
      // Mouse at bottom (y = height) -> negative rotateX (tilts forward)
      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotateY = normX * maxRotation;
      targetRotateX = -normY * maxRotation;
      targetScale = scale;

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerEnter = () => {
      isHovered = true;
      targetScale = scale;
      el.style.setProperty('--tilt-active', '1');
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
      targetScale = 1;
      el.style.setProperty('--tilt-active', '0');
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    el.style.setProperty('--tilt-perspective', `${perspective}px`);
    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.removeProperty('--tilt-rx');
      el.style.removeProperty('--tilt-ry');
      el.style.removeProperty('--tilt-scale');
      el.style.removeProperty('--tilt-perspective');
      el.style.removeProperty('--tilt-active');
    };
  }, [maxRotation, perspective, scale]);

  return ref;
}
