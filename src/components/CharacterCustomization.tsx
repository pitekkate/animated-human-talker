
import { Button } from '@/components/ui/button';
import { Palette, Shirt, Crown } from 'lucide-react';
import { CharacterCustomization } from '@/hooks/useCharacterCustomization';

interface CharacterCustomizationProps {
  selectedCharacter: 'male' | 'female';
  maleCustomization: CharacterCustomization;
  femaleCustomization: CharacterCustomization;
  onUpdateMale: (updates: Partial<CharacterCustomization>) => void;
  onUpdateFemale: (updates: Partial<CharacterCustomization>) => void;
}

const hairColors = ['#8b4513', '#4a2c2a', '#ffd700', '#000000', '#ff6b6b', '#9b59b6'];
const clothingColors = ['#4ecdc4', '#ff69b4', '#3498db', '#e74c3c', '#2ecc71', '#f39c12'];
const hatColors = ['#ff0000', '#000000', '#0000ff', '#ffff00', '#ff69b4', '#9b59b6'];

const CharacterCustomizationPanel = ({ 
  selectedCharacter, 
  maleCustomization, 
  femaleCustomization,
  onUpdateMale,
  onUpdateFemale
}: CharacterCustomizationProps) => {
  const currentCustomization = selectedCharacter === 'male' ? maleCustomization : femaleCustomization;
  const updateCustomization = selectedCharacter === 'male' ? onUpdateMale : onUpdateFemale;

  return (
    <div className="absolute right-4 top-20 bg-white/20 backdrop-blur-sm rounded-lg p-4 w-64">
      <h3 className="text-white font-bold mb-3 text-center">
        Kustomisasi {selectedCharacter === 'male' ? 'Cowok' : 'Cewek'}
      </h3>
      
      {/* Hair Color */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Warna Rambut</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {hairColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 ${
                currentCustomization.hairColor === color ? 'border-white' : 'border-gray-400'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateCustomization({ hairColor: color })}
            />
          ))}
        </div>
      </div>

      {/* Clothing Color */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shirt className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Warna Baju</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {clothingColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 ${
                currentCustomization.clothingColor === color ? 'border-white' : 'border-gray-400'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateCustomization({ clothingColor: color })}
            />
          ))}
        </div>
      </div>

      {/* Hat */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Topi</span>
        </div>
        <Button
          onClick={() => updateCustomization({ hasHat: !currentCustomization.hasHat })}
          className={`w-full mb-2 ${
            currentCustomization.hasHat ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
          size="sm"
        >
          {currentCustomization.hasHat ? 'Lepas Topi' : 'Pakai Topi'}
        </Button>
        
        {currentCustomization.hasHat && (
          <div className="grid grid-cols-6 gap-1">
            {hatColors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  currentCustomization.hatColor === color ? 'border-white' : 'border-gray-400'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => updateCustomization({ hatColor: color })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCustomizationPanel;
