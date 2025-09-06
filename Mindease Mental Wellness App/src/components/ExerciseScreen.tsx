import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface ExerciseScreenProps {
  exerciseType: string;
  onBack: () => void;
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

const phases: { phase: BreathingPhase; duration: number; instruction: string }[] = [
  { phase: 'inhale', duration: 4, instruction: 'Breathe in slowly' },
  { phase: 'hold1', duration: 4, instruction: 'Hold your breath' },
  { phase: 'exhale', duration: 4, instruction: 'Breathe out slowly' },
  { phase: 'hold2', duration: 4, instruction: 'Hold empty' },
];

export function ExerciseScreen({ exerciseType, onBack }: ExerciseScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const currentPhase = phases[currentPhaseIndex];
  const progress = ((currentPhase.duration - timeLeft) / currentPhase.duration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 0.1);
        setTotalTime((prev) => prev + 0.1);
      }, 100);
    } else if (isActive && timeLeft <= 0) {
      // Move to next phase
      const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      
      if (nextPhaseIndex === 0) {
        setCycleCount((prev) => prev + 1);
      }
      
      setCurrentPhaseIndex(nextPhaseIndex);
      setTimeLeft(phases[nextPhaseIndex].duration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentPhaseIndex]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(phases[0].duration);
    setCycleCount(0);
    setTotalTime(0);
  };

  const getBreathingCircleScale = () => {
    const baseScale = 0.5;
    const maxScale = 1;
    
    switch (currentPhase.phase) {
      case 'inhale':
        return baseScale + (maxScale - baseScale) * (progress / 100);
      case 'hold1':
        return maxScale;
      case 'exhale':
        return maxScale - (maxScale - baseScale) * (progress / 100);
      case 'hold2':
        return baseScale;
      default:
        return baseScale;
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase.phase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold1':
        return 'from-green-400 to-green-600';
      case 'exhale':
        return 'from-purple-400 to-purple-600';
      case 'hold2':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  if (exerciseType !== 'box-breathing') {
    return (
      <div className="flex flex-col h-full bg-background px-6 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-2 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">Exercise Coming Soon</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <h2 className="text-lg mb-2">This exercise is coming soon!</h2>
            <p className="text-muted-foreground">We're working on bringing you more wellness activities.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <Button variant="ghost" onClick={onBack} className="mr-2 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl">Box Breathing</h1>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">{cycleCount}</div>
            <div className="text-sm text-muted-foreground">Cycles</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">{Math.floor(totalTime / 60)}:{String(Math.floor(totalTime % 60)).padStart(2, '0')}</div>
            <div className="text-sm text-muted-foreground">Time</div>
          </Card>
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative">
          <motion.div
            className={`w-64 h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} shadow-lg`}
            animate={{
              scale: getBreathingCircleScale(),
            }}
            transition={{
              duration: 0.1,
              ease: "linear",
            }}
          />
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-sm uppercase tracking-wider mb-2 opacity-90">
              {currentPhase.phase.replace(/\d/, ' ')}
            </div>
            <div className="text-3xl mb-2">
              {Math.ceil(timeLeft)}
            </div>
            <div className="text-sm opacity-90 text-center px-4">
              {currentPhase.instruction}
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <div className="mb-2 text-sm text-center text-muted-foreground">
          Phase {currentPhaseIndex + 1} of 4
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Controls */}
      <div className="px-6 pb-8">
        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <Button onClick={handleStart} size="lg" className="flex-1 max-w-xs">
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline" size="lg" className="flex-1 max-w-xs">
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 pb-6">
        <Card className="p-4">
          <h3 className="font-medium mb-2">How it works:</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Box breathing is a simple technique that can help reduce stress and improve focus. 
            Follow the circle as it expands and contracts, breathing in for 4 counts, holding for 4, 
            exhaling for 4, and holding empty for 4.
          </p>
        </Card>
      </div>
    </div>
  );
}