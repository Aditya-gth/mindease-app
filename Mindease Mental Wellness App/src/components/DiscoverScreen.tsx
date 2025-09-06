import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Play, BookOpen, Wind, Heart, Moon, Focus, PenTool } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DiscoverScreenProps {
  onSelectExercise: (exerciseType: string) => void;
}

const meditations = [
  { id: 'anxiety', title: 'Anxiety Relief', duration: '10 min', icon: Heart, color: 'from-rose-500 to-pink-500' },
  { id: 'sleep', title: 'Sleep Stories', duration: '15 min', icon: Moon, color: 'from-indigo-500 to-purple-500' },
  { id: 'focus', title: 'Focus Boost', duration: '8 min', icon: Focus, color: 'from-emerald-500 to-teal-500' },
];

const journalPrompts = [
  { id: 'gratitude', title: 'Gratitude Practice', subtitle: 'What are you thankful for?', icon: Heart, color: 'from-amber-500 to-orange-500' },
  { id: 'thoughts', title: 'Thought Logging', subtitle: 'Process your emotions', icon: PenTool, color: 'from-blue-500 to-cyan-500' },
];

const breathingExercises = [
  { id: 'box-breathing', title: 'Box Breathing', subtitle: '4-4-4-4 technique', icon: Wind, color: 'from-green-500 to-emerald-500' },
];

export function DiscoverScreen({ onSelectExercise }: DiscoverScreenProps) {
  return (
    <ScrollArea className="h-full">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Discover Wellness</h1>
          <p className="text-muted-foreground">Explore guided activities for your mental health</p>
        </div>

        {/* Hero Section */}
        <div className="relative h-40 rounded-2xl overflow-hidden mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1725452119206-f04b8fdfe034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc1NzE0MTYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mindfulness and journaling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="text-white px-6">
              <h2 className="text-xl mb-1">Start Your Journey</h2>
              <p className="text-white/90 text-sm">Choose what feels right for you today</p>
            </div>
          </div>
        </div>

        {/* Guided Meditations */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Guided Meditations</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {meditations.map((meditation) => {
              const Icon = meditation.icon;
              return (
                <Card key={meditation.id} className="flex-shrink-0 w-48 p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${meditation.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium mb-1">{meditation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{meditation.duration}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onSelectExercise(meditation.id)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Journaling Prompts */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Journaling Prompts</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {journalPrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <Card key={prompt.id} className="flex-shrink-0 w-56 p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${prompt.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium mb-1">{prompt.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{prompt.subtitle}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onSelectExercise(prompt.id)}
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    Write
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Breathing Exercises */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Breathing Exercises</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {breathingExercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <Card key={exercise.id} className="flex-shrink-0 w-52 p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${exercise.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium mb-1">{exercise.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{exercise.subtitle}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onSelectExercise(exercise.id)}
                  >
                    <Wind className="w-3 h-3 mr-1" />
                    Breathe
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </ScrollArea>
  );
}