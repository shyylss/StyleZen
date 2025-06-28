import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Sparkles,
  ShoppingBag,
  Heart,
  Zap,
  User,
  Bot,
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { id: 'sizing', text: 'Help with sizing', icon: '📏' },
  { id: 'style', text: 'Style advice', icon: '✨' },
  { id: 'fabric', text: 'Fabric info', icon: '🧵' },
  { id: 'order', text: 'Track order', icon: '📦' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi! I'm your AI fashion assistant. I can help you with design ideas, sizing, fabric selection, and style advice. What would you like to explore today?",
    isUser: false,
    timestamp: new Date(),
    suggestions: ['Show me trending styles', 'Help me pick colors', 'Size guide for dresses'],
  },
];

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const simulateAIResponse = (userMessage: string): Message => {
    // Simple AI response simulation
    let responseText = "I'd be happy to help with that! ";
    let suggestions: string[] = [];

    if (userMessage.toLowerCase().includes('color')) {
      responseText += "Based on current trends, I recommend soft pastels like lavender and sage green for spring, or rich jewel tones like emerald and sapphire for a bold look.";
      suggestions = ['Show color palettes', 'What matches my skin tone?', 'Trending color combos'];
    } else if (userMessage.toLowerCase().includes('size') || userMessage.toLowerCase().includes('fit')) {
      responseText += "For the perfect fit, I recommend using our AI body measurement tool. Would you like me to guide you through it?";
      suggestions = ['Start body scan', 'Size chart help', 'Fit troubleshooting'];
    } else if (userMessage.toLowerCase().includes('style') || userMessage.toLowerCase().includes('trend')) {
      responseText += "This season's hottest trends include cottagecore aesthetics, Y2K revival pieces, and sustainable minimalism. Which style resonates with you?";
      suggestions = ['Show cottagecore looks', 'Y2K outfit ideas', 'Minimalist wardrobe'];
    } else if (userMessage.toLowerCase().includes('fabric')) {
      responseText += "Great question! For summer, I recommend lightweight cotton, linen, or bamboo blends. For formal wear, silk and crepe work beautifully.";
      suggestions = ['Fabric comparison', 'Care instructions', 'Sustainable options'];
    } else {
      responseText += "Could you tell me more about what you're looking for? I can help with design ideas, styling tips, sizing, or fabric recommendations.";
      suggestions = ['Design a dress', 'Style consultation', 'Fabric guide', 'Size help'];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      isUser: false,
      timestamp: new Date(),
      suggestions,
    };
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionTexts = {
      sizing: "Can you help me with sizing?",
      style: "I need style advice",
      fabric: "Tell me about fabrics",
      order: "I want to track my order",
    };
    sendMessage(actionTexts[action as keyof typeof actionTexts]);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop voice recognition
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.aiAvatar}>
              <Sparkles size={20} color="#FFFFFF" />
            </LinearGradient>
            <View>
              <Text style={styles.headerTitle}>AI Stylist</Text>
              <Text style={styles.headerSubtitle}>Online • Ready to help</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
            onPress={toggleVoice}>
            {isListening ? (
              <MicOff size={20} color={isListening ? "#FFFFFF" : "#8B5CF6"} />
            ) : (
              <Mic size={20} color="#8B5CF6" />
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionButton}
                onPress={() => handleQuickAction(action.id)}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              <View style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}>
                {!message.isUser && (
                  <View style={styles.messageHeader}>
                    <Bot size={16} color="#8B5CF6" />
                    <Text style={styles.aiLabel}>AI Stylist</Text>
                  </View>
                )}
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {message.text}
                </Text>
              </View>

              {/* Suggestions */}
              {message.suggestions && (
                <View style={styles.suggestionsContainer}>
                  {message.suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionButton}
                      onPress={() => sendMessage(suggestion)}>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Voice Listening Indicator */}
        {isListening && (
          <View style={styles.listeningIndicator}>
            <LinearGradient
              colors={['#EF4444', '#F97316']}
              style={styles.listeningGradient}>
              <View style={styles.listeningContent}>
                <Mic size={20} color="#FFFFFF" />
                <Text style={styles.listeningText}>Listening...</Text>
                <View style={styles.soundWaves}>
                  <View style={styles.soundWave} />
                  <View style={styles.soundWave} />
                  <View style={styles.soundWave} />
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask about styles, sizing, fabrics..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}>
              <Send size={20} color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#10B981',
  },
  voiceButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  voiceButtonActive: {
    backgroundColor: '#EF4444',
  },
  quickActions: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  quickActionButton: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#8B5CF6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  aiLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginLeft: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#374151',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingLeft: 8,
  },
  suggestionButton: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  suggestionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  typingDot1: {
    animationDelay: '0s',
  },
  typingDot2: {
    animationDelay: '0.2s',
  },
  typingDot3: {
    animationDelay: '0.4s',
  },
  listeningIndicator: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  listeningGradient: {
    borderRadius: 16,
    padding: 20,
  },
  listeningContent: {
    alignItems: 'center',
  },
  listeningText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 16,
  },
  soundWaves: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundWave: {
    width: 4,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#8B5CF6',
  },
});