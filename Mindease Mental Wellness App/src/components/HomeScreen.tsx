import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, Zap, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const dailyAffirmations = [
  "I am capable of handling whatever comes my way today.",
  "I choose peace over worry and trust over fear.",
  "My mental health matters, and I prioritize it today.",
  "I am worthy of love, kindness, and compassion.",
  "Each breath I take brings me closer to inner calm.",
  "I have the strength to overcome any challenge.",
  "Today I choose to focus on what brings me joy.",
];

interface HomeScreenProps {
  onQuickReset: () => void;
  onOpenChat: () => void;
}

export function HomeScreen({ onQuickReset, onOpenChat }: HomeScreenProps) {
  const todayAffirmation = dailyAffirmations[new Date().getDay()];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="text-center">
          <h1 className="text-3xl mb-2 text-primary">Welcome to Mindease</h1>
          <p className="text-muted-foreground">Your mental wellness companion</p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-6 mb-6">
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1687180948607-9ba1dd045e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTcxNDE2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Peaceful meditation scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-4 flex-1">
        {/* Quick Reset Button */}
        <Button
          onClick={onQuickReset}
          className="w-full h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors"
        >
          <Zap className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium">Quick Reset</div>
            <div className="text-sm opacity-90">Instant relief in seconds</div>
          </div>
        </Button>

        {/* Mindful Companion Card */}
        <Card 
          className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          onClick={onOpenChat}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Mindful Companion</h3>
              <p className="text-sm text-muted-foreground">
                Chat with your AI wellness companion for instant, personalized support
              </p>
            </div>
          </div>
        </Card>

        {/* Daily Affirmation */}
        <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2 text-rose-800">Today's Affirmation</h3>
              <p className="text-rose-700 leading-relaxed">"{todayAffirmation}"</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Padding for Navigation */}
      <div className="h-4" />
    </div>
  );
}