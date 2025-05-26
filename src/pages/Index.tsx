import { useState, useCallback, useEffect } from 'react';
import GameScene from '@/components/GameScene';
import GameControls from '@/components/GameControls';
import MovementControls from '@/components/MovementControls';
import GameUI from '@/components/GameUI';
import SettingsDialog from '@/components/SettingsDialog';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [currentAnimation, setCurrentAnimation] = useState<string>('idle');
  const [characterScale, setCharacterScale] = useState<number>(0.7); // Made smaller
  const [characterPosition, setCharacterPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Auto-reset animation to idle after some time
  useEffect(() => {
    if (currentAnimation !== 'idle') {
      const timer = setTimeout(() => {
        setCurrentAnimation('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentAnimation]);

  // Movement functions
  const moveCharacter = useCallback((direction: string) => {
    const moveDistance = 0.5;
    setCharacterPosition((prevPos) => {
      const [x, y, z] = prevPos;
      switch (direction) {
        case 'up':
          return [x, y, Math.max(z - moveDistance, -3)];
        case 'down':
          return [x, y, Math.min(z + moveDistance, 3)];
        case 'left':
          return [Math.max(x - moveDistance, -3), y, z];
        case 'right':
          return [Math.min(x + moveDistance, 3), y, z];
        default:
          return prevPos;
      }
    });
    playSound('move');
  }, []);

  const playSound = useCallback((soundType: string) => {
    if (!isMuted) {
      // Create simple sound effects using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (soundType) {
        case 'happy':
          oscillator.frequency.value = 800;
          break;
        case 'surprise':
          oscillator.frequency.value = 1000;
          break;
        case 'touch':
          oscillator.frequency.value = 600;
          break;
        case 'move':
          oscillator.frequency.value = 300;
          break;
        default:
          oscillator.frequency.value = 400;
      }
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  }, [isMuted]);

  const triggerVibration = useCallback((pattern: number[]) => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [vibrationEnabled]);

  const handleTouchHead = useCallback(() => {
    setCurrentAnimation('happy');
    playSound('happy');
    triggerVibration([50]);
    toast({
      title: "Head pat! 🥰",
      description: "Your friend loves head pats!",
      duration: 2000,
    });
  }, [playSound, triggerVibration]);

  const handleTouchBody = useCallback(() => {
    setCurrentAnimation('surprised');
    playSound('touch');
    triggerVibration([100, 50, 100]);
    toast({
      title: "Ticklish! 😄",
      description: "That tickles!",
      duration: 2000,
    });
  }, [playSound, triggerVibration]);

  const handleMakeHappy = useCallback(() => {
    setCurrentAnimation('happy');
    playSound('happy');
    triggerVibration([200]);
    toast({
      title: "So happy! 😊",
      description: "Your friend is jumping with joy!",
      duration: 2000,
    });
  }, [playSound, triggerVibration]);

  const handleMakeDance = useCallback(() => {
    setCurrentAnimation('dancing');
    playSound('happy');
    triggerVibration([100, 100, 100]);
    toast({
      title: "Dance time! 💃",
      description: "Let's dance together!",
      duration: 2000,
    });
  }, [playSound, triggerVibration]);

  const handleSurprise = useCallback(() => {
    setCurrentAnimation('surprised');
    playSound('surprise');
    triggerVibration([300]);
    toast({
      title: "Surprise! 😲",
      description: "That was unexpected!",
      duration: 2000,
    });
  }, [playSound, triggerVibration]);

  const handleToggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound On 🔊" : "Sound Off 🔇",
      description: isMuted ? "Audio effects enabled" : "Audio effects disabled",
      duration: 1000,
    });
  }, [isMuted]);

  const handleToggleVibration = useCallback(() => {
    setVibrationEnabled(!vibrationEnabled);
    if (!vibrationEnabled) {
      triggerVibration([100]);
    }
  }, [vibrationEnabled, triggerVibration]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Game Scene */}
      <GameScene 
        animation={currentAnimation} 
        characterScale={characterScale} 
        characterPosition={characterPosition}
      />
      
      {/* UI Overlay */}
      <GameUI
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onShowSettings={() => setShowSettings(true)}
      />
      
      {/* Movement Controls */}
      <MovementControls
        onMoveUp={() => moveCharacter('up')}
        onMoveDown={() => moveCharacter('down')}
        onMoveLeft={() => moveCharacter('left')}
        onMoveRight={() => moveCharacter('right')}
      />
      
      {/* Game Controls */}
      <GameControls
        onTouchHead={handleTouchHead}
        onTouchBody={handleTouchBody}
        onMakeHappy={handleMakeHappy}
        onMakeDance={handleMakeDance}
        onSurprise={handleSurprise}
        currentAnimation={currentAnimation}
      />
      
      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        characterScale={characterScale}
        onScaleChange={setCharacterScale}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        vibrationEnabled={vibrationEnabled}
        onToggleVibration={handleToggleVibration}
      />
    </div>
  );
};

export default Index;
