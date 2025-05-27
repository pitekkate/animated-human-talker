
import { useState } from 'react';

export const useGameState = () => {
  const [maleAnimation, setMaleAnimation] = useState<string>('idle');
  const [femaleAnimation, setFemaleAnimation] = useState<string>('idle');
  const [characterScale, setCharacterScale] = useState<number>(0.5);
  const [malePosition, setMalePosition] = useState<[number, number, number]>([-1.5, 0, 0]);
  const [femalePosition, setFemalePosition] = useState<[number, number, number]>([1.5, 0, 0]);
  const [selectedCharacter, setSelectedCharacter] = useState<'male' | 'female'>('male');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const currentAnimation = selectedCharacter === 'male' ? maleAnimation : femaleAnimation;
  const currentPosition = selectedCharacter === 'male' ? malePosition : femalePosition;

  return {
    maleAnimation,
    setMaleAnimation,
    femaleAnimation,
    setFemaleAnimation,
    characterScale,
    setCharacterScale,
    malePosition,
    setMalePosition,
    femalePosition,
    setFemalePosition,
    selectedCharacter,
    setSelectedCharacter,
    isMuted,
    setIsMuted,
    vibrationEnabled,
    setVibrationEnabled,
    showSettings,
    setShowSettings,
    currentAnimation,
    currentPosition,
  };
};
