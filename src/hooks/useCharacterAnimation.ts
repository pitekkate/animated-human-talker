
import { useCallback, useEffect } from 'react';

interface UseCharacterAnimationProps {
  selectedCharacter: 'male' | 'female';
  setMaleAnimation: React.Dispatch<React.SetStateAction<string>>;
  setFemaleAnimation: React.Dispatch<React.SetStateAction<string>>;
  maleAnimation: string;
  femaleAnimation: string;
}

export const useCharacterAnimation = ({
  selectedCharacter,
  setMaleAnimation,
  setFemaleAnimation,
  maleAnimation,
  femaleAnimation
}: UseCharacterAnimationProps) => {
  // Auto-reset animation to idle after some time
  useEffect(() => {
    if (maleAnimation !== 'idle') {
      const timer = setTimeout(() => {
        setMaleAnimation('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [maleAnimation, setMaleAnimation]);

  useEffect(() => {
    if (femaleAnimation !== 'idle') {
      const timer = setTimeout(() => {
        setFemaleAnimation('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [femaleAnimation, setFemaleAnimation]);

  const setCurrentAnimation = useCallback((animation: string) => {
    if (selectedCharacter === 'male') {
      setMaleAnimation(animation);
    } else {
      setFemaleAnimation(animation);
    }
  }, [selectedCharacter, setMaleAnimation, setFemaleAnimation]);

  return { setCurrentAnimation };
};
