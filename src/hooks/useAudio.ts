
import { useCallback } from 'react';

export const useAudio = (isMuted: boolean) => {
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

  return { playSound };
};
