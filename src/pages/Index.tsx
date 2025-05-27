
import GameScene from '@/components/GameScene';
import GameControls from '@/components/GameControls';
import MovementControls from '@/components/MovementControls';
import GameUI from '@/components/GameUI';
import SettingsDialog from '@/components/SettingsDialog';
import CharacterCustomizationPanel from '@/components/CharacterCustomization';
import { useGameState } from '@/hooks/useGameState';
import { useAudio } from '@/hooks/useAudio';
import { useVibration } from '@/hooks/useVibration';
import { useCharacterMovement } from '@/hooks/useCharacterMovement';
import { useCharacterAnimation } from '@/hooks/useCharacterAnimation';
import { useGameActions } from '@/hooks/useGameActions';
import { useCharacterCustomization } from '@/hooks/useCharacterCustomization';

const Index = () => {
  const gameState = useGameState();
  const { playSound } = useAudio(gameState.isMuted);
  const { triggerVibration } = useVibration(gameState.vibrationEnabled);
  
  const customization = useCharacterCustomization();
  
  const { moveCharacter } = useCharacterMovement({
    selectedCharacter: gameState.selectedCharacter,
    setMalePosition: gameState.setMalePosition,
    setFemalePosition: gameState.setFemalePosition,
    playSound,
  });

  const { setCurrentAnimation } = useCharacterAnimation({
    selectedCharacter: gameState.selectedCharacter,
    setMaleAnimation: gameState.setMaleAnimation,
    setFemaleAnimation: gameState.setFemaleAnimation,
    maleAnimation: gameState.maleAnimation,
    femaleAnimation: gameState.femaleAnimation,
  });

  const gameActions = useGameActions({
    selectedCharacter: gameState.selectedCharacter,
    setSelectedCharacter: gameState.setSelectedCharacter,
    setMalePosition: gameState.setMalePosition,
    setFemalePosition: gameState.setFemalePosition,
    setCurrentAnimation,
    playSound,
    triggerVibration,
    isMuted: gameState.isMuted,
    setIsMuted: gameState.setIsMuted,
    vibrationEnabled: gameState.vibrationEnabled,
    setVibrationEnabled: gameState.setVibrationEnabled,
    setMaleAnimation: gameState.setMaleAnimation,
    setFemaleAnimation: gameState.setFemaleAnimation,
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Game Scene */}
      <GameScene 
        maleAnimation={gameState.maleAnimation}
        femaleAnimation={gameState.femaleAnimation}
        characterScale={gameState.characterScale} 
        malePosition={gameState.malePosition}
        femalePosition={gameState.femalePosition}
        maleCustomization={customization.maleCustomization}
        femaleCustomization={customization.femaleCustomization}
      />
      
      {/* UI Overlay */}
      <GameUI
        isMuted={gameState.isMuted}
        onToggleMute={gameActions.handleToggleMute}
        onShowSettings={() => gameState.setShowSettings(true)}
      />
      
      {/* Character Customization Panel */}
      <CharacterCustomizationPanel
        selectedCharacter={gameState.selectedCharacter}
        maleCustomization={customization.maleCustomization}
        femaleCustomization={customization.femaleCustomization}
        onUpdateMale={customization.updateMaleCustomization}
        onUpdateFemale={customization.updateFemaleCustomization}
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
        onTouchHead={gameActions.handleTouchHead}
        onTouchBody={gameActions.handleTouchBody}
        onMakeHappy={gameActions.handleMakeHappy}
        onMakeWalk={gameActions.handleMakeWalk}
        onMakeDance={gameActions.handleMakeDance}
        onSurprise={gameActions.handleSurprise}
        onResetCharacter={gameActions.handleResetCharacter}
        onMoveUp={() => moveCharacter('up')}
        onMoveDown={() => moveCharacter('down')}
        onMoveLeft={() => moveCharacter('left')}
        onMoveRight={() => moveCharacter('right')}
        onToggleCharacter={gameActions.handleToggleCharacter}
        currentAnimation={gameState.currentAnimation}
        selectedCharacter={gameState.selectedCharacter}
      />
      
      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={gameState.showSettings}
        onClose={() => gameState.setShowSettings(false)}
        characterScale={gameState.characterScale}
        onScaleChange={gameState.setCharacterScale}
        isMuted={gameState.isMuted}
        onToggleMute={gameActions.handleToggleMute}
        vibrationEnabled={gameState.vibrationEnabled}
        onToggleVibration={gameActions.handleToggleVibration}
      />
    </div>
  );
};

export default Index;
