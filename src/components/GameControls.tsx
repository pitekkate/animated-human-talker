
import { Button } from '@/components/ui/button';
import { Volume2, Heart, Smile, Music, Zap, PersonStanding, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Users } from 'lucide-react';

interface GameControlsProps {
  onTouchHead: () => void;
  onTouchBody: () => void;
  onMakeHappy: () => void;
  onMakeDance: () => void;
  onSurprise: () => void;
  onMakeWalk: () => void;
  onResetCharacter: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onToggleCharacter: () => void;
  currentAnimation: string;
  selectedCharacter: 'male' | 'female';
}

const GameControls = ({
  onTouchHead,
  onTouchBody,
  onMakeHappy,
  onMakeDance,
  onSurprise,
  onMakeWalk,
  onResetCharacter,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onToggleCharacter,
  currentAnimation,
  selectedCharacter
}: GameControlsProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600/90 to-transparent p-4">
      {/* Character Selection */}
      <div className="flex justify-center mb-3">
        <Button
          onClick={onToggleCharacter}
          size="lg"
          className={`${selectedCharacter === 'male' ? 'bg-blue-600' : 'bg-pink-600'} hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transform transition-transform active:scale-95`}
        >
          <Users className="w-5 h-5 mr-2" />
          {selectedCharacter === 'male' ? 'Cowok' : 'Cewek'}
        </Button>
      </div>
      
      {/* Movement Controls */}
      <div className="flex justify-center mb-3">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <Button
            onClick={onMoveUp}
            size="sm"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded p-2 shadow-lg transform transition-transform active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          <div></div>
          
          <Button
            onClick={onMoveLeft}
            size="sm"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded p-2 shadow-lg transform transition-transform active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div></div>
          <Button
            onClick={onMoveRight}
            size="sm"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded p-2 shadow-lg transform transition-transform active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <div></div>
          <Button
            onClick={onMoveDown}
            size="sm"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded p-2 shadow-lg transform transition-transform active:scale-95"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
          <div></div>
        </div>
      </div>
      
      {/* Action Controls */}
      <div className="flex justify-center space-x-3 mb-4">
        <Button
          onClick={onTouchHead}
          size="lg"
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
          disabled={currentAnimation !== 'idle'}
        >
          <Heart className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onMakeHappy}
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
        >
          <Smile className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onMakeWalk}
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
        >
          <PersonStanding className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onMakeDance}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
        >
          <Music className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onSurprise}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
        >
          <Zap className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onTouchBody}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
          disabled={currentAnimation !== 'idle'}
        >
          <Volume2 className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onResetCharacter}
          size="lg"
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-4 shadow-lg transform transition-transform active:scale-95"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-white text-sm font-medium">
          {currentAnimation === 'idle' && `Kontrol karakter ${selectedCharacter === 'male' ? 'cowok' : 'cewek'}! Gunakan panah untuk menggeser.`}
          {currentAnimation === 'happy' && `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} senang! 😊`}
          {currentAnimation === 'walking' && `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} sedang jalan! 🚶‍♂️`}
          {currentAnimation === 'dancing' && `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} sedang menari! 💃`}
          {currentAnimation === 'surprised' && `${selectedCharacter === 'male' ? 'Cowok' : 'Cewek'} kaget! 😲`}
        </p>
      </div>
    </div>
  );
};

export default GameControls;
