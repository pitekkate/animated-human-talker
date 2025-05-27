
import { useCallback } from 'react';

interface UseCharacterMovementProps {
  selectedCharacter: 'male' | 'female';
  setMalePosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  setFemalePosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  playSound: (soundType: string) => void;
}

export const useCharacterMovement = ({
  selectedCharacter,
  setMalePosition,
  setFemalePosition,
  playSound
}: UseCharacterMovementProps) => {
  const moveCharacter = useCallback((direction: string) => {
    const moveDistance = 0.5;
    
    if (selectedCharacter === 'male') {
      setMalePosition((prevPos) => {
        const [x, y, z] = prevPos;
        switch (direction) {
          case 'up':
            return [x, y, Math.max(z - moveDistance, -4)];
          case 'down':
            return [x, y, Math.min(z + moveDistance, 4)];
          case 'left':
            return [Math.max(x - moveDistance, -4), y, z];
          case 'right':
            return [Math.min(x + moveDistance, 4), y, z];
          default:
            return prevPos;
        }
      });
    } else {
      setFemalePosition((prevPos) => {
        const [x, y, z] = prevPos;
        switch (direction) {
          case 'up':
            return [x, y, Math.max(z - moveDistance, -4)];
          case 'down':
            return [x, y, Math.min(z + moveDistance, 4)];
          case 'left':
            return [Math.max(x - moveDistance, -4), y, z];
          case 'right':
            return [Math.min(x + moveDistance, 4), y, z];
          default:
            return prevPos;
        }
      });
    }
    playSound('move');
  }, [selectedCharacter, setMalePosition, setFemalePosition, playSound]);

  return { moveCharacter };
};
