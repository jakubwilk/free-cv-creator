'use client';

import { useReducedMotion } from '@mantine/hooks';

export function useMotionPreferences() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion,
    /** Pass as `initial` prop to motion elements */
    initial: shouldReduceMotion ? 'visible' : 'hidden',
    /** Wraps a variants object: returns empty object if motion is reduced */
    motionProps: (props: object) => (shouldReduceMotion ? {} : props),
  };
}
