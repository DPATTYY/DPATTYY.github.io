import { useEffect, useRef } from 'react';

/**
 * Custom hook for magnetic button effect
 * Buttons subtly follow the cursor when hovering nearby
 * @param {number} strength - How strong the magnetic pull is (0-1, default 0.3)
 */
export default function useMagneticEffect(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrameId = null;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100; // Start effect within 100px

      if (distance < maxDistance) {
        const pull = 1 - distance / maxDistance;
        const moveX = deltaX * pull * strength;
        const moveY = deltaY * pull * strength;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
          element.style.transform = 'translate(0, 0)';
        });
      }
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
