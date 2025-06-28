import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Sparkles,
  TrendingUp,
  Palette,
  Heart,
  Star,
  ChevronRight,
} from 'lucide-react-native';

interface StyleSuggestion {
  id: string;
  title: string;
  confidence: number;
  reason: string;
  image: string;
  colors: string[];
  tags: string[];
}

interface AIStyleAssistantProps {
  userStyle?: string;
  bodyType?: string;
  occasion?: string;
}

const styleSuggestions: StyleSuggestion[] = [
  {
    id: '1',
    title: 'Elegant Evening Look',
    confidence: 94,
    reason: 'Perfect for your body type and style preferences',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=300',
    colors: ['#1F2937', '#8B5CF6', '#F59E0B'],
    tags: ['Elegant', 'Evening', 'Sophisticated'],
  },
  {
    id: '2',
    title: 'Casual Chic Ensemble',
    confidence: 89,
    reason: 'Trending style that complements your preferences',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    colors: ['#10B981', '#F3F4F6', '#3B82F6'],
    tags: ['Casual', 'Trendy', 'Comfortable'],
  },
  {
    id: '3',
    title: 'Professional Power Look',
    confidence: 92,
    reason: 'Ideal for business occasions with modern flair',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    colors: ['#1F2937', '#FFFFFF', '#EF4444'],
    tags: ['Professional', 'Modern', 'Confident'],
  },
];

export default function AIStyleAssistant({ userStyle, bodyType, occasion }: AIStyleAssistantProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0F9FF', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Sparkles size={24} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>AI Style Assistant</Text>
            <Text style={styles.headerSubtitle}>
              Personalized recommendations based on your preferences
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.suggestionsContainer}>
          {styleSuggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={[
                styles.suggestionCard,
                selectedSuggestion === suggestion.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedSuggestion(suggestion.id)}>
              
              <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
              
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{suggestion.confidence}%</Text>
              </View>

              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestionReason}>{suggestion.reason}</Text>

                <View style={styles.colorsContainer}>
                  {suggestion.colors.map((color, index) => (
                    <View
                      key={index}
                      style={[styles.colorSwatch, { backgroundColor: color }]}
                    />
                  ))}
                </View>

                <View style={styles.tagsContainer}>
                  {suggestion.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.tryButton}>
                  <Text style={styles.tryButtonText}>Try This Style</Text>
                  <ChevronRight size={16} color="#8B5CF6" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.insights}>
        <View style={styles.insightItem}>
          <TrendingUp size={20} color="#10B981" />
          <Text style={styles.insightText}>
            Flowing silhouettes are trending for your body type
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Palette size={20} color="#8B5CF6" />
          <Text style={styles.insightText}>
            Jewel tones complement your skin undertone perfectly
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  suggestionCard: {
    width: 280,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  suggestionImage: {
    width: '100%',
    height: 200,
  },
  confidenceBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  suggestionContent: {
    padding: 16,
  },
  suggestionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  suggestionReason: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  colorsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
  },
  tryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
  },
  tryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8B5CF6',
    marginRight: 4,
  },
  insights: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
});