
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseGameActionsProps {
  selectedCharacter: 'male' | 'female';
  setSelectedCharacter: React.Dispatch<React.SetStateAction<'male' | 'female'>>;
  setMalePosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  setFemalePosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  setCurrentAnimation: (animation: string) => void;
  playSound: (soundType: string) => void;
  triggerVibration: (pattern: number[]) => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  vibrationEnabled: boolean;
  setVibrationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setMaleAnimation: React.Dispatch<React.SetStateAction<string>>;
  setFemaleAnimation: React.Dispatch<React.SetStateAction<string>>;
}

export const useGameActions = ({
  selectedCharacter,
  setSelectedCharacter,
  setMalePosition,
  setFemalePosition,
  setCurrentAnimation,
  playSound,
  triggerVibration,
  isMuted,
  setIsMuted,
  vibrationEnabled,
  setVibrationEnabled,
  setMaleAnimation,
  setFemaleAnimation
}: UseGameActionsProps) => {
  const handleToggleCharacter = useCallback(() => {
    setSelectedCharacter(prev => prev === 'male' ? 'female' : 'male');
    toast({
      title: selectedCharacter === 'male' ? "Karakter Cewek! 👩" : "Karakter Cowok! 👨",
      description: selectedCharacter === 'male' ? "Sekarang mengontrol karakter cewek" : "Sekarang mengontrol karakter cowok",
      duration: 2000,
    });
  }, [selectedCharacter, setSelectedCharacter]);

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
  }, [selectedCharacter, playSound, setMalePosition, setFemalePosition, setMaleAnimation, setFemaleAnimation]);

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
  }, [isMuted, setIsMuted]);

  const handleToggleVibration = useCallback(() => {
    setVibrationEnabled(!vibrationEnabled);
    if (!vibrationEnabled) {
      triggerVibration([100]);
    }
  }, [vibrationEnabled, setVibrationEnabled, triggerVibration]);

  return {
    handleToggleCharacter,
    handleResetCharacter,
    handleTouchHead,
    handleTouchBody,
    handleMakeHappy,
    handleMakeWalk,
    handleMakeDance,
    handleSurprise,
    handleToggleMute,
    handleToggleVibration,
  };
};
