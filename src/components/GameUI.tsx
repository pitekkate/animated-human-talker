
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Home, VolumeX, Volume2 } from 'lucide-react';

interface GameUIProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onShowSettings: () => void;
}

const GameUI = ({ isMuted, onToggleMute, onShowSettings }: GameUIProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-purple-600/80 to-transparent">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full"
            onClick={onToggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="text-center">
          <h1 className="text-white text-xl font-bold drop-shadow-lg">
            Talking Friend
          </h1>
          <p className="text-white/80 text-xs">Tap to interact!</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full"
          onClick={onShowSettings}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default GameUI;
