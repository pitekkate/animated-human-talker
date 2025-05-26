
import { useState, useCallback, useEffect } from 'react';
import GameScene from '@/components/GameScene';
import GameControls from '@/components/GameControls';
import MovementControls from '@/components/MovementControls';
import GameUI from '@/components/GameUI';
import SettingsDialog from '@/components/SettingsDialog';
import { toast } from '@/hooks/use-toast';

const Index = () => {
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

  // Auto-reset animation to idle after some time
  useEffect(() => {
    if (maleAnimation !== 'idle') {
      const timer = setTimeout(() => {
        setMaleAnimation('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [maleAnimation]);

  useEffect(() => {
    if (femaleAnimation !== 'idle') {
      const timer = setTimeout(() => {
        setFemaleAnimation('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [femaleAnimation]);

  // Movement functions
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
  }, [selectedCharacter]);

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
        case 'walk':
          oscillator.frequency.value = 400;
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

  const setCurrentAnimation = useCallback((animation: string) => {
    if (selectedCharacter === 'male') {
      setMaleAnimation(animation);
    } else {
      setFemaleAnimation(animation);
    }
  }, [selectedCharacter]);

  const handleToggleCharacter = useCallback(() => {
    setSelectedCharacter(prev => prev === 'male' ? 'female' : 'male');
    toast({
      title: selectedCharacter === 'male' ? "Karakter Cewek! 👩" : "Karakter Cowok! 👨",
      description: selectedCharacter === 'male' ? "Sekarang mengontrol karakter cewek" : "Sekarang mengontrol karakter cowok",
      duration: 2000,
    });
  }, [selectedCharacter]);

  const handleResetCharacter = useCallback(() => {
    if (selectedCharacter === 'male') {
      setMalePosition([-1.5, 0, 0]);
      setMaleAnimation('idle');
    } else {
      setFemalePosition([1.5, 0, 0]);
      setFemaleAnimation('idle');
    }
    playSound('touch');
    toast({
      title: "Karakter Di-reset! 🔄",
      description: `Karakter ${selectedCharacter === 'male' ? 'cowok' : 'cewek'} kembali ke posisi awal`,
      duration: 2000,
    });
  }, [selectedCharacter, playSound]);

  const handleTouchHead = useCallback(() => {
    setCurrentAnimation('happy');
    playSound('happy');
    triggerVibration([50]);
    toast({
      title: "Elus kepala! 🥰",
      description: `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} suka dielus!`,
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration, selectedCharacter]);

  const handleTouchBody = useCallback(() => {
    setCurrentAnimation('surprised');
    playSound('touch');
    triggerVibration([100, 50, 100]);
    toast({
      title: "Geli! 😄",
      description: "Itu geli!",
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration]);

  const handleMakeHappy = useCallback(() => {
    setCurrentAnimation('happy');
    playSound('happy');
    triggerVibration([200]);
    toast({
      title: "Senang! 😊",
      description: `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} lompat kesenangan!`,
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration, selectedCharacter]);

  const handleMakeWalk = useCallback(() => {
    setCurrentAnimation('walking');
    playSound('walk');
    triggerVibration([100, 100]);
    toast({
      title: "Jalan! 🚶‍♂️",
      description: `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} sedang jalan-jalan!`,
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration, selectedCharacter]);

  const handleMakeDance = useCallback(() => {
    setCurrentAnimation('dancing');
    playSound('happy');
    triggerVibration([100, 100, 100]);
    toast({
      title: "Waktu menari! 💃",
      description: "Ayo menari bersama!",
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration]);

  const handleSurprise = useCallback(() => {
    setCurrentAnimation('surprised');
    playSound('surprise');
    triggerVibration([300]);
    toast({
      title: "Kejutan! 😲",
      description: "Itu tidak terduga!",
      duration: 2000,
    });
  }, [setCurrentAnimation, playSound, triggerVibration]);

  const handleToggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Suara Nyala 🔊" : "Suara Mati 🔇",
      description: isMuted ? "Efek suara diaktifkan" : "Efek suara dinonaktifkan",
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
        maleAnimation={maleAnimation}
        femaleAnimation={femaleAnimation}
        characterScale={characterScale} 
        malePosition={malePosition}
        femalePosition={femalePosition}
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
        onMakeWalk={handleMakeWalk}
        onMakeDance={handleMakeDance}
        onSurprise={handleSurprise}
        onResetCharacter={handleResetCharacter}
        onMoveUp={() => moveCharacter('up')}
        onMoveDown={() => moveCharacter('down')}
        onMoveLeft={() => moveCharacter('left')}
        onMoveRight={() => moveCharacter('right')}
        onToggleCharacter={handleToggleCharacter}
        currentAnimation={currentAnimation}
        selectedCharacter={selectedCharacter}
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
