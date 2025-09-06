import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Smile, Frown, Meh, Heart, Zap, Cloud, Sun, Moon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
  { id: 'calm', label: 'Calm', icon: Heart, color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { id: 'energetic', label: 'Energetic', icon: Zap, color: 'text-green-500 bg-green-50 border-green-200' },
  { id: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500 bg-gray-50 border-gray-200' },
  { id: 'tired', label: 'Tired', icon: Moon, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
  { id: 'cloudy', label: 'Cloudy', icon: Cloud, color: 'text-slate-500 bg-slate-50 border-slate-200' },
  { id: 'stressed', label: 'Stressed', icon: AlertCircle, color: 'text-orange-500 bg-orange-50 border-orange-200' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'text-purple-500 bg-purple-50 border-purple-200' },
];

export function CheckInScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');

  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Please select a mood before saving');
      return;
    }

    // Save mood and journal entry (in a real app, this would go to a database)
    const entry = {
      mood: selectedMood,
      journal: journalEntry,
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage for demo purposes
    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    existingEntries.push(entry);
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

    toast.success('Mood check-in saved successfully!');
    
    // Reset form
    setSelectedMood(null);
    setJournalEntry('');
  };

  return (
    <ScrollArea className="h-full">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">How are you feeling?</h1>
          <p className="text-muted-foreground">Take a moment to check in with yourself</p>
        </div>

        {/* Current Date */}
        <div className="mb-6">
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </Card>
        </div>

        {/* Mood Selection */}
        <div className="mb-8">
          <Label className="text-base mb-4 block">Select your current mood:</Label>
          <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              
              return (
                <Card
                  key={mood.id}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? `${mood.color} ring-2 ring-current` 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-current' : 'text-muted-foreground'}`} />
                    <span className={`font-medium ${isSelected ? 'text-current' : 'text-foreground'}`}>
                      {mood.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Journal Entry */}
        <div className="mb-8">
          <Label htmlFor="journal" className="text-base mb-4 block">
            Optional: Write about how you're feeling
          </Label>
          <Textarea
            id="journal"
            placeholder="What's on your mind today? You can write about anything - your thoughts, feelings, or what happened in your day..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="min-h-32 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your thoughts are private and will only be stored locally on your device.
          </p>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full h-12 mb-8"
          disabled={!selectedMood}
        >
          Save Check-In
        </Button>

        {/* Bottom Padding */}
        <div className="h-20" />
      </div>
    </ScrollArea>
  );
}