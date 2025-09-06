import { useState } from 'react';
import { Home, Compass, Activity, BookOpen, User, MessageCircle } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { DiscoverScreen } from './components/DiscoverScreen';
import { CheckInScreen } from './components/CheckInScreen';
import { ExerciseScreen } from './components/ExerciseScreen';
import { ExerciseTabScreen } from './components/ExerciseTabScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ChatScreen } from './components/ChatScreen';

type Screen = 'home' | 'discover' | 'checkin' | 'exercise' | 'profile' | 'chat';

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'checkin', label: 'Check-In', icon: Activity },
  { id: 'exercise', label: 'Exercise', icon: BookOpen },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showExercise, setShowExercise] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const renderScreen = () => {
    if (showExercise) {
      return (
        <ExerciseScreen 
          exerciseType={showExercise}
          onBack={() => setShowExercise(null)}
        />
      );
    }

    if (showChat) {
      return <ChatScreen onBack={() => setShowChat(false)} />;
    }

    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onQuickReset={() => setCurrentScreen('discover')}
            onOpenChat={() => setShowChat(true)}
          />
        );
      case 'discover':
        return <DiscoverScreen onSelectExercise={setShowExercise} />;
      case 'checkin':
        return <CheckInScreen />;
      case 'exercise':
        return <ExerciseTabScreen onSelectExercise={setShowExercise} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onQuickReset={() => setCurrentScreen('discover')} onOpenChat={() => setShowChat(true)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {!showExercise && !showChat && (
        <div className="bg-white border-t border-border px-4 py-2 safe-area-pb">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-primary bg-accent' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}