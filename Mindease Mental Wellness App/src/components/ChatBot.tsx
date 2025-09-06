interface ChatResponse {
  content: string;
  followUp?: string[];
}

interface ConversationContext {
  lastTopic?: string;
  mood?: string;
  userName?: string;
  conversationLength: number;
}

export class ChatBot {
  private context: ConversationContext = {
    conversationLength: 0
  };

  private wellnessTopics = {
    stress: [
      "I understand stress can feel overwhelming. What's been weighing on your mind lately?",
      "Stress is a natural response, but it doesn't have to control you. Have you tried any breathing exercises today?",
      "It sounds like you're dealing with a lot right now. Remember, it's okay to take things one step at a time.",
      "When I feel stressed, I find it helpful to focus on what I can control. What's one small thing you could do right now to care for yourself?"
    ],
    anxiety: [
      "Anxiety can be really challenging. You're brave for acknowledging it and reaching out.",
      "I hear you. Anxiety often feels bigger than it actually is. Let's try to ground ourselves - can you name 3 things you can see around you right now?",
      "That sounds really difficult. Remember that anxious thoughts are just thoughts - they don't define reality.",
      "Anxiety is your mind's way of trying to protect you, even when it's not needed. You're safe right now."
    ],
    sadness: [
      "I'm sorry you're feeling down. Your emotions are valid, and it's okay to sit with them for a moment.",
      "Sadness is a natural part of the human experience. It shows that you care deeply about things that matter to you.",
      "Thank you for sharing how you're feeling. Sometimes just naming our emotions can help us process them.",
      "It's okay to not be okay sometimes. What's one small act of kindness you could show yourself today?"
    ],
    happiness: [
      "It's wonderful to hear you're feeling good! What's bringing you joy today?",
      "I love seeing you in good spirits! These positive moments are worth celebrating.",
      "That's fantastic! It's important to savor these happy feelings when they come.",
      "Your positive energy is contagious! What's been going well for you lately?"
    ],
    sleep: [
      "Sleep is so important for our mental health. Have you been having trouble with your sleep routine?",
      "Good sleep hygiene can make such a difference. Do you have a bedtime routine that helps you wind down?",
      "Sleep challenges are really common. Have you tried any relaxation techniques before bed?",
      "Quality sleep is one of the best gifts you can give yourself. What usually helps you feel more relaxed?"
    ]
  };

  private casualResponses = [
    "That's interesting! Tell me more about that.",
    "I can see why you'd feel that way. How has that been for you?",
    "Thanks for sharing that with me. What's your take on it?",
    "That sounds like quite an experience. How are you processing it?",
    "I appreciate you opening up about that. What's been on your mind about it?",
    "That's a lot to think about. How are you handling everything?",
    "I'm here to listen. What would be most helpful for you right now?",
    "That makes sense. How are you feeling about all of this?"
  ];

  private encouragingResponses = [
    "You're showing real strength by talking about this. That takes courage.",
    "I admire how you're working through this. You're more resilient than you know.",
    "It sounds like you're being really thoughtful about this situation.",
    "You're taking such good care of yourself by reflecting on this.",
    "I can hear how much you care about this. That's a beautiful quality.",
    "You're handling this with such grace. Be proud of how far you've come.",
    "Your awareness and willingness to grow is inspiring.",
    "You're being so kind to yourself by taking time to process this."
  ];

  private greetings = [
    "Hello there! I'm so glad you decided to chat with me today. How are you feeling?",
    "Hi! It's wonderful to see you here. What's on your mind today?",
    "Hey! I'm here and ready to listen. How has your day been treating you?",
    "Hello! I'm your mindful companion, and I'm here for whatever you need. How are you doing?",
    "Hi there! Thanks for reaching out. What would you like to talk about today?"
  ];

  private checkInQuestions = [
    "How are you feeling right now, in this moment?",
    "What's one thing that went well for you today?",
    "If your current mood had a color, what would it be?",
    "What's something you're grateful for today, however small?",
    "How would you describe your energy level right now?",
    "What's been the highlight of your day so far?"
  ];

  private detectTopic(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm') || lowerMessage.includes('pressure')) {
      return 'stress';
    }
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry') || lowerMessage.includes('nervous')) {
      return 'anxiety';
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed') || lowerMessage.includes('blue')) {
      return 'sadness';
    }
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('excited') || lowerMessage.includes('joy')) {
      return 'happiness';
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest')) {
      return 'sleep';
    }
    
    return 'general';
  }

  private detectMood(message: string): string | undefined {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('fine') || lowerMessage.includes('well')) {
      return 'positive';
    }
    if (lowerMessage.includes('bad') || lowerMessage.includes('terrible') || lowerMessage.includes('awful') || lowerMessage.includes('not good')) {
      return 'negative';
    }
    if (lowerMessage.includes('okay') || lowerMessage.includes('alright') || lowerMessage.includes('so-so')) {
      return 'neutral';
    }
    
    return undefined;
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private shouldAskFollowUp(): boolean {
    return Math.random() < 0.3 && this.context.conversationLength > 2;
  }

  private getFollowUpQuestion(topic: string): string[] {
    const followUps: Record<string, string[]> = {
      stress: [
        "What's usually most helpful when you're feeling stressed?",
        "Have you been able to take any breaks today?",
        "What's one small thing that might help you feel more grounded right now?"
      ],
      anxiety: [
        "What does anxiety feel like in your body?",
        "Are there any thoughts that seem to be on repeat?",
        "What helps you feel more centered when anxiety shows up?"
      ],
      sadness: [
        "What would you tell a good friend who was feeling this way?",
        "Is there anything specific that triggered these feelings?",
        "What's one small comfort you could offer yourself right now?"
      ],
      happiness: [
        "What do you think contributed to feeling this good?",
        "How can you carry this positive energy with you?",
        "What would you like to do while you're feeling this way?"
      ],
      general: [
        "How are you taking care of yourself lately?",
        "What's been bringing you peace recently?",
        "Is there anything you'd like to explore more?"
      ]
    };

    return followUps[topic] || followUps.general;
  }

  generateResponse(userMessage: string): ChatResponse {
    this.context.conversationLength++;
    
    // Handle greetings
    if (this.context.conversationLength === 1 || 
        userMessage.toLowerCase().match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return {
        content: this.getRandomResponse(this.greetings),
        followUp: this.checkInQuestions.slice(0, 2)
      };
    }

    // Detect topic and mood
    const topic = this.detectTopic(userMessage);
    const mood = this.detectMood(userMessage);
    
    this.context.lastTopic = topic;
    this.context.mood = mood;

    // Generate appropriate response
    let response: string;
    let followUp: string[] | undefined;

    if (topic in this.wellnessTopics) {
      response = this.getRandomResponse(this.wellnessTopics[topic as keyof typeof this.wellnessTopics]);
      
      if (this.shouldAskFollowUp()) {
        followUp = this.getFollowUpQuestion(topic);
      }
    } else {
      // Mix casual and encouraging responses
      const shouldEncourage = Math.random() < 0.4;
      const responsePool = shouldEncourage ? this.encouragingResponses : this.casualResponses;
      response = this.getRandomResponse(responsePool);
      
      if (this.shouldAskFollowUp()) {
        followUp = this.getFollowUpQuestion('general');
      }
    }

    // Add wellness suggestions occasionally
    if (Math.random() < 0.2 && this.context.conversationLength > 3) {
      const suggestions = [
        " Have you tried any of the breathing exercises in the app today?",
        " You might find the guided meditations helpful for what you're going through.",
        " Remember, you can always do a quick mood check-in to track how you're feeling.",
        " The exercises section has some great tools that might support you right now."
      ];
      response += this.getRandomResponse(suggestions);
    }

    return {
      content: response,
      followUp: followUp?.slice(0, 2)
    };
  }

  reset(): void {
    this.context = {
      conversationLength: 0
    };
  }
}