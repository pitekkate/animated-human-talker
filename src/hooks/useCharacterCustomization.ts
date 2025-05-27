
import { useState } from 'react';

export interface CharacterCustomization {
  hairColor: string;
  clothingColor: string;
  hasHat: boolean;
  hatColor: string;
}

export const useCharacterCustomization = () => {
  const [maleCustomization, setMaleCustomization] = useState<CharacterCustomization>({
    hairColor: '#8b4513',
    clothingColor: '#4ecdc4',
    hasHat: false,
    hatColor: '#ff0000',
  });

  const [femaleCustomization, setFemaleCustomization] = useState<CharacterCustomization>({
    hairColor: '#4a2c2a',
    clothingColor: '#ff69b4',
    hasHat: false,
    hatColor: '#ff0000',
  });

  const updateMaleCustomization = (updates: Partial<CharacterCustomization>) => {
    setMaleCustomization(prev => ({ ...prev, ...updates }));
  };

  const updateFemaleCustomization = (updates: Partial<CharacterCustomization>) => {
    setFemaleCustomization(prev => ({ ...prev, ...updates }));
  };

  return {
    maleCustomization,
    femaleCustomization,
    updateMaleCustomization,
    updateFemaleCustomization,
  };
};
