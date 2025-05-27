
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Shirt, Crown } from 'lucide-react';
import { CharacterCustomization } from '@/hooks/useCharacterCustomization';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  characterScale: number;
  onScaleChange: (scale: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  vibrationEnabled: boolean;
  onToggleVibration: () => void;
  selectedCharacter: 'male' | 'female';
  maleCustomization: CharacterCustomization;
  femaleCustomization: CharacterCustomization;
  onUpdateMale: (updates: Partial<CharacterCustomization>) => void;
  onUpdateFemale: (updates: Partial<CharacterCustomization>) => void;
}

const hairColors = ['#8b4513', '#4a2c2a', '#ffd700', '#000000', '#ff6b6b', '#9b59b6'];
const clothingColors = ['#4ecdc4', '#ff69b4', '#3498db', '#e74c3c', '#2ecc71', '#f39c12'];
const hatColors = ['#ff0000', '#000000', '#0000ff', '#ffff00', '#ff69b4', '#9b59b6'];

const SettingsDialog = ({
  isOpen,
  onClose,
  characterScale,
  onScaleChange,
  isMuted,
  onToggleMute,
  vibrationEnabled,
  onToggleVibration,
  selectedCharacter,
  maleCustomization,
  femaleCustomization,
  onUpdateMale,
  onUpdateFemale
}: SettingsDialogProps) => {
  const currentCustomization = selectedCharacter === 'male' ? maleCustomization : femaleCustomization;
  const updateCustomization = selectedCharacter === 'male' ? onUpdateMale : onUpdateFemale;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-purple-100 to-pink-100">
        <DialogHeader>
          <DialogTitle className="text-center text-purple-800">Pengaturan Game</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Umum</TabsTrigger>
            <TabsTrigger value="character">Karakter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-purple-700 font-medium">Ukuran Karakter</Label>
              <Slider
                value={[characterScale]}
                onValueChange={(value) => onScaleChange(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-purple-600">Saat ini: {characterScale}x</p>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-purple-700 font-medium">Efek Suara</Label>
              <Switch
                checked={!isMuted}
                onCheckedChange={() => onToggleMute()}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-purple-700 font-medium">Getaran</Label>
              <Switch
                checked={vibrationEnabled}
                onCheckedChange={onToggleVibration}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="character" className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-purple-800 font-bold mb-3">
                Kustomisasi {selectedCharacter === 'male' ? 'Cowok' : 'Cewek'}
              </h3>
            </div>
            
            {/* Hair Color */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-700" />
                <Label className="text-purple-700 font-medium">Warna Rambut</Label>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {hairColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      currentCustomization.hairColor === color ? 'border-purple-600 ring-2 ring-purple-300' : 'border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateCustomization({ hairColor: color })}
                  />
                ))}
              </div>
            </div>

            {/* Clothing Color */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-purple-700" />
                <Label className="text-purple-700 font-medium">Warna Baju</Label>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {clothingColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      currentCustomization.clothingColor === color ? 'border-purple-600 ring-2 ring-purple-300' : 'border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateCustomization({ clothingColor: color })}
                  />
                ))}
              </div>
            </div>

            {/* Hat */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-700" />
                <Label className="text-purple-700 font-medium">Topi</Label>
              </div>
              <Button
                onClick={() => updateCustomization({ hasHat: !currentCustomization.hasHat })}
                className={`w-full mb-3 ${
                  currentCustomization.hasHat ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                }`}
                size="sm"
              >
                {currentCustomization.hasHat ? 'Lepas Topi' : 'Pakai Topi'}
              </Button>
              
              {currentCustomization.hasHat && (
                <div className="grid grid-cols-6 gap-2">
                  {hatColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        currentCustomization.hatColor === color ? 'border-purple-600 ring-2 ring-purple-300' : 'border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => updateCustomization({ hatColor: color })}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-4">
          <Button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Simpan Pengaturan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
