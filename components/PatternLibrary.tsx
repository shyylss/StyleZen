import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid2x2 as Grid, Search, Filter, Download, Star, Eye, Heart, Layers, Ruler, Palette } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Pattern {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  preview: string;
  designer: string;
  rating: number;
  downloads: number;
  likes: number;
  price: number;
  tags: string[];
  description: string;
  sizes: string[];
  formats: string[];
}

const patterns: Pattern[] = [
  {
    id: '1',
    name: 'Classic A-Line Dress',
    category: "Women's Dresses",
    difficulty: 'Beginner',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    preview: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
    designer: 'Emma Chen',
    rating: 4.8,
    downloads: 1234,
    likes: 567,
    price: 15,
    tags: ['Classic', 'Versatile', 'Timeless'],
    description: 'A timeless A-line dress pattern perfect for beginners. Includes detailed instructions and multiple size options.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    formats: ['PDF', 'DXF', 'SVG'],
  },
  {
    id: '2',
    name: 'Modern Blazer',
    category: "Women's Outerwear",
    difficulty: 'Advanced',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    preview: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
    designer: 'Sofia Kim',
    rating: 4.9,
    downloads: 892,
    likes: 423,
    price: 25,
    tags: ['Professional', 'Structured', 'Modern'],
    description: 'Contemporary blazer with clean lines and professional finish. Advanced pattern with detailed construction notes.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    formats: ['PDF', 'DXF'],
  },
  {
    id: '3',
    name: 'Casual Button-Up Shirt',
    category: "Men's Shirts",
    difficulty: 'Intermediate',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
    preview: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
    designer: 'Marcus Rodriguez',
    rating: 4.7,
    downloads: 756,
    likes: 334,
    price: 18,
    tags: ['Casual', 'Versatile', 'Classic'],
    description: 'Relaxed fit button-up shirt with modern details. Great for casual and smart-casual occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    formats: ['PDF', 'SVG'],
  },
  {
    id: '4',
    name: 'Kids Playful Romper',
    category: "Kids' Casual",
    difficulty: 'Beginner',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=300',
    preview: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
    designer: 'Little Wonders',
    rating: 4.6,
    downloads: 445,
    likes: 289,
    price: 12,
    tags: ['Playful', 'Comfortable', 'Easy'],
    description: 'Fun and comfortable romper for active kids. Simple construction with room for creative embellishments.',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    formats: ['PDF'],
  },
];

const categories = [
  'All',
  "Women's Dresses",
  "Women's Tops",
  "Women's Outerwear",
  "Men's Shirts",
  "Men's Pants",
  "Kids' Casual",
  "Baby Wear",
];

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function PatternLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [likedPatterns, setLikedPatterns] = useState<Set<string>>(new Set());

  const filteredPatterns = patterns.filter(pattern => {
    const categoryMatch = selectedCategory === 'All' || pattern.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || pattern.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const toggleLike = (patternId: string) => {
    setLikedPatterns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(patternId)) {
        newSet.delete(patternId);
      } else {
        newSet.add(patternId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderPattern = (pattern: Pattern) => (
    <TouchableOpacity key={pattern.id} style={styles.patternCard}>
      <View style={styles.patternImageContainer}>
        <Image source={{ uri: pattern.image }} style={styles.patternImage} />
        
        {/* Overlay with actions */}
        <View style={styles.patternOverlay}>
          <TouchableOpacity
            style={[
              styles.likeButton,
              likedPatterns.has(pattern.id) && styles.likedButton,
            ]}
            onPress={() => toggleLike(pattern.id)}>
            <Heart
              size={16}
              color={likedPatterns.has(pattern.id) ? '#FFFFFF' : '#FFFFFF'}
              fill={likedPatterns.has(pattern.id) ? '#FFFFFF' : 'none'}
            />
          </TouchableOpacity>
          
          <View style={styles.difficultyBadge}>
            <View style={[
              styles.difficultyDot,
              { backgroundColor: getDifficultyColor(pattern.difficulty) }
            ]} />
            <Text style={styles.difficultyText}>{pattern.difficulty}</Text>
          </View>
        </View>

        {/* Pattern preview */}
        <View style={styles.patternPreview}>
          <Image source={{ uri: pattern.preview }} style={styles.previewImage} />
          <View style={styles.previewLabel}>
            <Layers size={12} color="#FFFFFF" />
            <Text style={styles.previewText}>Pattern</Text>
          </View>
        </View>
      </View>

      <View style={styles.patternInfo}>
        <Text style={styles.patternName}>{pattern.name}</Text>
        <Text style={styles.patternDesigner}>by {pattern.designer}</Text>
        <Text style={styles.patternCategory}>{pattern.category}</Text>

        <View style={styles.patternStats}>
          <View style={styles.statItem}>
            <Star size={12} color="#F59E0B" />
            <Text style={styles.statText}>{pattern.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Download size={12} color="#6B7280" />
            <Text style={styles.statText}>{pattern.downloads}</Text>
          </View>
          <View style={styles.statItem}>
            <Heart size={12} color="#6B7280" />
            <Text style={styles.statText}>{pattern.likes}</Text>
          </View>
        </View>

        <View style={styles.patternTags}>
          {pattern.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {pattern.tags.length > 2 && (
            <Text style={styles.moreTags}>+{pattern.tags.length - 2}</Text>
          )}
        </View>

        <View style={styles.patternFooter}>
          <Text style={styles.patternPrice}>${pattern.price}</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={16} color="#FFFFFF" />
            <Text style={styles.downloadButtonText}>Get Pattern</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pattern Library</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Banner */}
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.featuredBanner}>
        <View style={styles.bannerContent}>
          <Grid size={24} color="#FFFFFF" />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Professional Patterns</Text>
            <Text style={styles.bannerSubtitle}>
              CAD-ready patterns from top designers
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  selectedCategory === category && styles.selectedFilter,
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={[
                  styles.filterText,
                  selectedCategory === category && styles.selectedFilterText,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Difficulty Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Difficulty</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.filterButton,
                  selectedDifficulty === difficulty && styles.selectedFilter,
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}>
                <Text style={[
                  styles.filterText,
                  selectedDifficulty === difficulty && styles.selectedFilterText,
                ]}>
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Patterns Grid */}
      <ScrollView style={styles.patternsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.patternsGrid}>
          {filteredPatterns.map(renderPattern)}
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  featuredBanner: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    marginLeft: 16,
    flex: 1,
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedFilter: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  patternsContainer: {
    flex: 1,
  },
  patternsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  patternCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 52) / 2,
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patternImageContainer: {
    position: 'relative',
  },
  patternImage: {
    width: '100%',
    height: 160,
  },
  patternOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 6,
    borderRadius: 12,
  },
  likedButton: {
    backgroundColor: '#EF4444',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  patternPreview: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    alignItems: 'center',
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  previewLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  previewText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 8,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  patternInfo: {
    padding: 12,
  },
  patternName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  patternDesigner: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  patternCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#8B5CF6',
    marginBottom: 8,
  },
  patternStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 2,
  },
  patternTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#6B7280',
  },
  moreTags: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#9CA3AF',
  },
  patternFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patternPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  downloadButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  downloadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});