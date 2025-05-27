
import { useCallback } from 'react';

export const useVibration = (vibrationEnabled: boolean) => {
  const triggerVibration = useCallback((pattern: number[]) => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [vibrationEnabled]);

  return { triggerVibration };
};
