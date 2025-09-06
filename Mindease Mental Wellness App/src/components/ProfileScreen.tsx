import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Calendar, Target, Heart, Award, Quote, Sparkles } from 'lucide-react';

interface UserStats {
  daysUsed: number;
  meditationsCompleted: number;
  moodCheckIns: number;
  currentStreak: number;
}

export function ProfileScreen() {
  const [stats, setStats] = useState<UserStats>({
    daysUsed: 0,
    meditationsCompleted: 0,
    moodCheckIns: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    // Calculate stats from localStorage (in a real app, this would come from a backend)
    const moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    const usageDays = new Set(moodEntries.map((entry: any) => 
      new Date(entry.timestamp).toDateString()
    )).size;

    // Calculate streak (simplified - just consecutive days)
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const hasCheckedInToday = moodEntries.some((entry: any) => 
      new Date(entry.timestamp).toDateString() === today
    );
    const hasCheckedInYesterday = moodEntries.some((entry: any) => 
      new Date(entry.timestamp).toDateString() === yesterday
    );

    setStats({
      daysUsed: Math.max(usageDays, 7), // Default to 7 for demo
      meditationsCompleted: Math.max(Math.floor(usageDays * 1.5), 12), // Default to 12 for demo
      moodCheckIns: Math.max(moodEntries.length, 5), // Default to 5 for demo
      currentStreak: hasCheckedInToday ? (hasCheckedInYesterday ? 3 : 1) : 0, // Default to 3 for demo
    });
  }, []);

  const userVibe = {
    favoriteQuote: "Peace comes from within. Do not seek it without.",
    interests: ["Meditation", "Nature Walks", "Reading", "Yoga"],
    mindfulnessFocus: "Daily Gratitude & Stress Management",
    joinedDate: "March 2024",
  };

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed your first check-in", icon: Target, earned: true },
    { id: 2, title: "Mindful Week", description: "7 days of consistent check-ins", icon: Calendar, earned: stats.currentStreak >= 7 },
    { id: 3, title: "Meditation Master", description: "Completed 10 meditation sessions", icon: Heart, earned: stats.meditationsCompleted >= 10 },
    { id: 4, title: "Wellness Warrior", description: "30 days of app usage", icon: Award, earned: stats.daysUsed >= 30 },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl mb-1">Your Wellness Journey</h1>
          <p className="text-muted-foreground">Member since {userVibe.joinedDate}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-primary">{stats.daysUsed}</div>
            <div className="text-sm text-muted-foreground">Days Used</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-blue-600">{stats.meditationsCompleted}</div>
            <div className="text-sm text-muted-foreground">Meditations</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-green-600">{stats.moodCheckIns}</div>
            <div className="text-sm text-muted-foreground">Check-ins</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1 text-orange-600">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
        </div>

        {/* My Wellness Vibe */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg">My Wellness Vibe</h2>
          </div>

          <div className="space-y-4">
            {/* Favorite Quote */}
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2 text-purple-800">Favorite Quote</h3>
                  <p className="text-purple-700 italic">"{userVibe.favoriteQuote}"</p>
                </div>
              </div>
            </Card>

            {/* Interests */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userVibe.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Mindfulness Focus */}
            <Card className="p-4">
              <h3 className="font-medium mb-2">Mindfulness Focus</h3>
              <p className="text-muted-foreground">{userVibe.mindfulnessFocus}</p>
            </Card>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-lg mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={achievement.id}
                  className={`p-4 ${achievement.earned ? 'bg-green-50 border-green-200' : 'opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Award className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <Button variant="outline" className="w-full">
            Export My Data
          </Button>
          <Button variant="outline" className="w-full">
            Share Progress
          </Button>
        </div>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </ScrollArea>
  );
}