import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { ArrowLeft, Send, Bot, User, Lightbulb } from 'lucide-react';
import { ChatBot } from './ChatBot';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'suggestion';
  content: string;
  timestamp: Date;
  followUp?: string[];
}

interface ChatScreenProps {
  onBack: () => void;
}

const chatBot = new ChatBot();
const welcomeMessages: Message[] = [];



export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Send initial greeting when component mounts
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const response = chatBot.generateResponse("hello");
        const botMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: response.content,
          timestamp: new Date(),
          followUp: response.followUp,
        };
        setMessages([botMessage]);
        setIsTyping(false);
      }, 800);
    }
  }, []);

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate bot response using the chatbot
    setTimeout(() => {
      const response = chatBot.generateResponse(textToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        followUp: response.followUp,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-white">
        <Button variant="ghost" onClick={onBack} className="mr-2 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-medium">Mindful Companion</h1>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className="space-y-2">
                  <Card className={`p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white border-border'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </Card>
                  
                  {/* Follow-up suggestions */}
                  {message.type === 'bot' && message.followUp && message.followUp.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Lightbulb className="w-3 h-3" />
                        <span>You might want to explore:</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {message.followUp.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-left justify-start h-auto py-2 px-3 text-xs"
                            onClick={() => handleSend(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="p-3 bg-white border-border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSend()} 
            size="icon"
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Your mindful companion powered by contextual AI • Always here to support you
        </p>
      </div>
    </div>
  );
}