
import { Button } from '@/components/ui/button';
import { Hand, Footprints, RotateCcw } from 'lucide-react';

interface BodyPartControlsProps {
  onMoveLeftArm: () => void;
  onMoveRightArm: () => void;
  onMoveLeftLeg: () => void;
  onMoveRightLeg: () => void;
  onResetPose: () => void;
}

const BodyPartControls = ({ 
  onMoveLeftArm, 
  onMoveRightArm, 
  onMoveLeftLeg, 
  onMoveRightLeg, 
  onResetPose 
}: BodyPartControlsProps) => {
  return (
    <div className="absolute right-4 bottom-20 bg-white/20 backdrop-blur-sm rounded-lg p-3">
      <div className="space-y-2">
        <div className="text-white text-xs font-semibold text-center mb-2">Body Parts</div>
        
        {/* Arms */}
        <div className="flex space-x-2">
          <Button
            onClick={onMoveLeftArm}
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex-1"
          >
            <Hand className="w-3 h-3 mr-1" />
            L Arm
          </Button>
          <Button
            onClick={onMoveRightArm}
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex-1"
          >
            <Hand className="w-3 h-3 mr-1" />
            R Arm
          </Button>
        </div>
        
        {/* Legs */}
        <div className="flex space-x-2">
          <Button
            onClick={onMoveLeftLeg}
            size="sm"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex-1"
          >
            <Footprints className="w-3 h-3 mr-1" />
            L Leg
          </Button>
          <Button
            onClick={onMoveRightLeg}
            size="sm"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex-1"
          >
            <Footprints className="w-3 h-3 mr-1" />
            R Leg
          </Button>
        </div>
        
        {/* Reset */}
        <Button
          onClick={onResetPose}
          size="sm"
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg w-full"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default BodyPartControls;
