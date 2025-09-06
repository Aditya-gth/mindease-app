import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Wind, Heart, Brain, Smile, Play, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExerciseTabScreenProps {
  onSelectExercise: (exerciseType: string) => void;
}

const breathingExercises = [
  { 
    id: 'box-breathing', 
    title: 'Box Breathing', 
    description: '4-4-4-4 technique for instant calm',
    duration: '5-10 min',
    difficulty: 'Beginner',
    icon: Wind, 
    color: 'from-green-500 to-emerald-500',
    benefits: ['Reduces stress', 'Improves focus', 'Calms anxiety']
  },
  { 
    id: '4-7-8-breathing', 
    title: '4-7-8 Breathing', 
    description: 'Deep relaxation technique',
    duration: '3-5 min',
    difficulty: 'Intermediate',
    icon: Heart, 
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Better sleep', 'Reduces anxiety', 'Lowers heart rate']
  },
];

const mindfulnessExercises = [
  { 
    id: 'body-scan', 
    title: 'Body Scan', 
    description: 'Progressive relaxation technique',
    duration: '10-20 min',
    difficulty: 'Beginner',
    icon: Brain, 
    color: 'from-purple-500 to-indigo-500',
    benefits: ['Body awareness', 'Muscle relaxation', 'Mindful presence']
  },
  { 
    id: 'loving-kindness', 
    title: 'Loving Kindness', 
    description: 'Cultivate compassion and positivity',
    duration: '8-15 min',
    difficulty: 'Beginner',
    icon: Smile, 
    color: 'from-rose-500 to-pink-500',
    benefits: ['Self-compassion', 'Positive emotions', 'Reduces negativity']
  },
];

export function ExerciseTabScreen({ onSelectExercise }: ExerciseTabScreenProps) {
  return (
    <ScrollArea className="h-full">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Exercise Library</h1>
          <p className="text-muted-foreground">Guided exercises for your mental wellness</p>
        </div>

        {/* Featured Exercise */}
        <div className="mb-8">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" />
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg mb-1">Featured Today</h2>
                  <h3 className="text-xl text-green-700">Box Breathing</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Perfect for beginners - reduce stress in just 5 minutes
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Wind className="w-6 h-6 text-white" />
                </div>
              </div>
              <Button 
                onClick={() => onSelectExercise('box-breathing')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Breathing Exercises */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Breathing Exercises</h2>
          <div className="space-y-4">
            {breathingExercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <Card key={exercise.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${exercise.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{exercise.title}</h3>
                          <p className="text-sm text-muted-foreground">{exercise.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            {exercise.duration}
                          </div>
                          <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {exercise.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {exercise.benefits.map((benefit, index) => (
                          <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onSelectExercise(exercise.id)}
                        className="w-full"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start Exercise
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Mindfulness Exercises */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Mindfulness Exercises</h2>
          <div className="space-y-4">
            {mindfulnessExercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <Card key={exercise.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${exercise.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{exercise.title}</h3>
                          <p className="text-sm text-muted-foreground">{exercise.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            {exercise.duration}
                          </div>
                          <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {exercise.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {exercise.benefits.map((benefit, index) => (
                          <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onSelectExercise(exercise.id)}
                        className="w-full"
                        disabled={true}
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="font-medium mb-3 text-blue-800">Exercise Tips</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Find a quiet, comfortable space where you won't be disturbed</li>
              <li>• Start with shorter sessions and gradually increase duration</li>
              <li>• Practice at the same time each day to build a routine</li>
              <li>• Don't worry if your mind wanders - gently bring focus back</li>
            </ul>
          </Card>
        </section>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </ScrollArea>
  );
}