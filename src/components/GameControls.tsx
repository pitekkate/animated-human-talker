
import { Button } from '@/components/ui/button';
import { Volume2, Heart, Smile, Music, Zap } from 'lucide-react';

interface GameControlsProps {
  onTouchHead: () => void;
  onTouchBody: () => void;
  onMakeHappy: () => void;
  onMakeDance: () => void;
  onSurprise: () => void;
  currentAnimation: string;
}

const GameControls = ({
  onTouchHead,
  onTouchBody,
  onMakeHappy,
  onMakeDance,
  onSurprise,
  currentAnimation
}: GameControlsProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600/90 to-transparent p-4">
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
      </div>
      
      <div className="text-center">
        <p className="text-white text-sm font-medium">
          {currentAnimation === 'idle' && "Tap the buttons to interact!"}
          {currentAnimation === 'happy' && "Your friend is happy! 😊"}
          {currentAnimation === 'dancing' && "Dancing time! 💃"}
          {currentAnimation === 'surprised' && "Wow! That was surprising! 😲"}
        </p>
      </div>
    </div>
  );
};

export default GameControls;
