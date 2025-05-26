
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MovementControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

const MovementControls = ({ onMoveUp, onMoveDown, onMoveLeft, onMoveRight }: MovementControlsProps) => {
  return (
    <div className="absolute left-4 bottom-20 bg-white/20 backdrop-blur-sm rounded-lg p-3">
      <div className="grid grid-cols-3 gap-2 w-32 h-32">
        {/* Top row */}
        <div></div>
        <Button
          onClick={onMoveUp}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
        <div></div>
        
        {/* Middle row */}
        <Button
          onClick={onMoveLeft}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div></div>
        <Button
          onClick={onMoveRight}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        {/* Bottom row */}
        <div></div>
        <Button
          onClick={onMoveDown}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <div></div>
      </div>
    </div>
  );
};

export default MovementControls;
