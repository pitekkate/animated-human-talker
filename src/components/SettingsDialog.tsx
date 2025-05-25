
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  characterScale: number;
  onScaleChange: (scale: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  vibrationEnabled: boolean;
  onToggleVibration: () => void;
}

const SettingsDialog = ({
  isOpen,
  onClose,
  characterScale,
  onScaleChange,
  isMuted,
  onToggleMute,
  vibrationEnabled,
  onToggleVibration
}: SettingsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-100 to-pink-100">
        <DialogHeader>
          <DialogTitle className="text-center text-purple-800">Game Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-purple-700 font-medium">Character Size</Label>
            <Slider
              value={[characterScale]}
              onValueChange={(value) => onScaleChange(value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-purple-600">Current: {characterScale}x</p>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-purple-700 font-medium">Sound Effects</Label>
            <Switch
              checked={!isMuted}
              onCheckedChange={() => onToggleMute()}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-purple-700 font-medium">Vibration</Label>
            <Switch
              checked={vibrationEnabled}
              onCheckedChange={onToggleVibration}
            />
          </div>
          
          <div className="pt-4 space-y-2">
            <Button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
