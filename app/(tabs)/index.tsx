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
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp, Users, Clock, ChevronRight, Star, Heart, ShoppingBag, MessageCircle, Factory, Palette, Zap, Eye, ChartBar as BarChart3, Camera, Grid2x2 as Grid } from 'lucide-react-native';
import AIStyleAssistant from '@/components/AIStyleAssistant';
import CollaborationHub from '@/components/CollaborationHub';
import PatternLibrary from '@/components/PatternLibrary';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const { width } = Dimensions.get('window');

const featuredDesigns = [
  {
    id: 1,
    title: 'Sustainable Summer Collection',
    designer: 'Eco Fashion Co.',
    category: "Women's Dresses",
    price: '$45-89',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    likes: 1234,
    sustainable: true,
    aiConfidence: 94,
  },
  {
    id: 2,
    title: 'Urban Streetwear Line',
    designer: 'Metro Menswear',
    category: "Men's Casual",
    price: '$35-124',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    likes: 856,
    sustainable: false,
    aiConfidence: 89,
  },
  {
    id: 3,
    title: 'Happy Kids Collection',
    designer: 'Little Wonders',
    category: "Kids' Play Wear",
    price: '$25-65',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    likes: 642,
    sustainable: true,
    aiConfidence: 92,
  },
];

const trendingCategories = [
  { id: 1, name: "Women's Sustainable", growth: '+23%', color: '#10B981', icon: '🌱' },
  { id: 2, name: "Men's Streetwear", growth: '+18%', color: '#8B5CF6', icon: '👔' },
  { id: 3, name: "Kids' Organic", growth: '+15%', color: '#3B82F6', icon: '👕' },
];

const partnerHighlights = [
  {
    id: 1,
    name: 'Sustainable Threads Co.',
    type: 'Manufacturer',
    speciality: "Women's Eco-Friendly",
    orders: '2.5K+',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Urban Design Studio',
    type: 'Designer',
    speciality: "Men's Contemporary",
    orders: '1.8K+',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.8,
  },
];

const aiInsights = [
  {
    id: 1,
    title: 'Perfect Fit Prediction',
    description: 'AI analyzed 10K+ body types to predict your perfect size',
    confidence: 98,
    icon: Eye,
  },
  {
    id: 2,
    title: 'Style Compatibility',
    description: 'Based on your preferences, these styles suit you best',
    confidence: 94,
    icon: Sparkles,
  },
  {
    id: 3,
    title: 'Trend Forecast',
    description: 'Sustainable fashion will be 40% more popular this season',
    confidence: 87,
    icon: TrendingUp,
  },
];

const quickActions = [
  {
    id: 'design',
    title: 'Design Studio',
    subtitle: 'Create custom garments',
    icon: Palette,
    colors: ['#8B5CF6', '#EC4899'],
    route: '/design',
  },
  {
    id: 'tryon',
    title: '5D Try-On',
    subtitle: 'Virtual fitting experience',
    icon: Camera,
    colors: ['#10B981', '#059669'],
    route: '/try-on',
  },
  {
    id: 'patterns',
    title: 'Pattern Library',
    subtitle: 'Professional CAD patterns',
    icon: Grid,
    colors: ['#3B82F6', '#1D4ED8'],
    route: '/patterns',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    subtitle: 'Track your designs',
    icon: BarChart3,
    colors: ['#F59E0B', '#D97706'],
    route: '/analytics',
  },
];

export default function HomeScreen() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderQuickAction = (action: typeof quickActions[0]) => {
    const IconComponent = action.icon;
    return (
      <TouchableOpacity 
        key={action.id} 
        style={styles.quickActionCard}
        onPress={() => setActiveSection(action.id)}>
        <LinearGradient
          colors={action.colors}
          style={styles.quickActionGradient}>
          <IconComponent size={24} color="#FFFFFF" />
          <Text style={styles.quickActionTitle}>{action.title}</Text>
          <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // Show specific component based on active section
  if (activeSection === 'patterns') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setActiveSection(null)}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </View>
        <PatternLibrary />
      </SafeAreaView>
    );
  }

  if (activeSection === 'analytics') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setActiveSection(null)}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </View>
        <AnalyticsDashboard />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
            <ShoppingBag size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#8B5CF6', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Sparkles size={28} color="#FFFFFF" />
            <Text style={styles.heroTitle}>AI-Powered Fashion Creation</Text>
            <Text style={styles.heroSubtitle}>
              Design, visualize with 5D try-on, and manufacture custom clothing with verified partners
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Start Creating</Text>
              <ChevronRight size={18} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={styles.statNumber}>2.5K</Text>
            <Text style={styles.statLabel}>AI Designs</Text>
          </View>
          <View style={styles.statCard}>
            <Factory size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>420</Text>
            <Text style={styles.statLabel}>Manufacturers</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>7.2</Text>
            <Text style={styles.statLabel}>Avg. Days</Text>
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.insightsContainer}>
              {aiInsights.map((insight) => {
                const IconComponent = insight.icon;
                return (
                  <TouchableOpacity key={insight.id} style={styles.insightCard}>
                    <LinearGradient
                      colors={['#F0F9FF', '#FFFFFF']}
                      style={styles.insightGradient}>
                      <View style={styles.insightHeader}>
                        <IconComponent size={20} color="#3B82F6" />
                        <View style={styles.confidenceBadge}>
                          <Text style={styles.confidenceText}>{insight.confidence}%</Text>
                        </View>
                      </View>
                      <Text style={styles.insightTitle}>{insight.title}</Text>
                      <Text style={styles.insightDescription}>{insight.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* AI Style Assistant Component */}
        <AIStyleAssistant userStyle="casual-chic" bodyType="pear" occasion="work" />

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Featured Collections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI-Curated Collections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredDesigns.map((design) => (
              <TouchableOpacity key={design.id} style={styles.designCard}>
                <Image source={{ uri: design.image }} style={styles.designImage} />
                <View style={styles.designOverlay}>
                  {design.sustainable && (
                    <View style={styles.sustainableBadge}>
                      <Text style={styles.sustainableBadgeText}>🌱</Text>
                    </View>
                  )}
                  <View style={styles.aiConfidenceBadge}>
                    <Zap size={12} color="#FFFFFF" />
                    <Text style={styles.aiConfidenceText}>{design.aiConfidence}%</Text>
                  </View>
                  <TouchableOpacity style={styles.likeButton}>
                    <Heart size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.designInfo}>
                  <Text style={styles.designTitle}>{design.title}</Text>
                  <Text style={styles.designDesigner}>by {design.designer}</Text>
                  <Text style={styles.designCategory}>{design.category}</Text>
                  <View style={styles.designMeta}>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#F59E0B" />
                      <Text style={styles.ratingText}>{design.rating}</Text>
                    </View>
                    <Text style={styles.designPrice}>{design.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Categories</Text>
          {trendingCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.trendCard}>
              <View style={styles.trendInfo}>
                <Text style={styles.trendIcon}>{category.icon}</Text>
                <Text style={styles.trendName}>{category.name}</Text>
                <Text style={[styles.trendGrowth, { color: category.color }]}>
                  {category.growth}
                </Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Partner Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Partners</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {partnerHighlights.map((partner) => (
            <TouchableOpacity key={partner.id} style={styles.partnerCard}>
              <Image source={{ uri: partner.image }} style={styles.partnerAvatar} />
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <View style={styles.partnerTypeContainer}>
                  {partner.type === 'Manufacturer' ? (
                    <Factory size={14} color="#8B5CF6" />
                  ) : (
                    <Palette size={14} color="#8B5CF6" />
                  )}
                  <Text style={styles.partnerType}>{partner.type}</Text>
                </View>
                <Text style={styles.partnerSpeciality}>{partner.speciality}</Text>
              </View>
              <View style={styles.partnerStats}>
                <View style={styles.partnerRating}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={styles.partnerRatingText}>{partner.rating}</Text>
                </View>
                <Text style={styles.partnerOrders}>{partner.orders}</Text>
                <Text style={styles.partnerOrdersLabel}>orders</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Collaboration Hub Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Style Community</Text>
            <TouchableOpacity onPress={() => setActiveSection('collaboration')}>
              <Text style={styles.seeAllText}>Join community</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.communityPreview}
            onPress={() => setActiveSection('collaboration')}>
            <LinearGradient
              colors={['#F3E8FF', '#FFFFFF']}
              style={styles.communityGradient}>
              <Users size={24} color="#8B5CF6" />
              <View style={styles.communityContent}>
                <Text style={styles.communityTitle}>Connect with Designers</Text>
                <Text style={styles.communitySubtitle}>
                  Share designs, get feedback, and collaborate with the community
                </Text>
              </View>
              <ChevronRight size={20} color="#8B5CF6" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* AI Assistant Prompt */}
        <TouchableOpacity style={styles.aiPrompt}>
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.aiPromptGradient}>
            <MessageCircle size={24} color="#FFFFFF" />
            <View style={styles.aiPromptText}>
              <Text style={styles.aiPromptTitle}>Ask the AI Fashion Assistant</Text>
              <Text style={styles.aiPromptSubtitle}>
                "Help me design a sustainable dress for summer events"
              </Text>
            </View>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Show Collaboration Hub as overlay */}
      {activeSection === 'collaboration' && (
        <View style={styles.overlay}>
          <View style={styles.overlayHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setActiveSection(null)}>
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
          </View>
          <CollaborationHub />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#8B5CF6',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
  },
  overlayHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    zIndex: 1,
  },
  heroSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 20,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8B5CF6',
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
  },
  insightsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  insightCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  confidenceBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  confidenceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  insightTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  insightDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  quickActionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  designCard: {
    width: 220,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  designImage: {
    width: '100%',
    height: 240,
  },
  designOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sustainableBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 4,
    marginRight: 8,
  },
  sustainableBadgeText: {
    fontSize: 12,
  },
  aiConfidenceBadge: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  aiConfidenceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  designInfo: {
    padding: 16,
  },
  designTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  designDesigner: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  designCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 8,
  },
  designMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  designPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  trendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  trendName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginRight: 12,
  },
  trendGrowth: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  partnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  partnerTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnerType: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginLeft: 4,
  },
  partnerSpeciality: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  partnerStats: {
    alignItems: 'center',
  },
  partnerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnerRatingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1F2937',
    marginLeft: 2,
  },
  partnerOrders: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  partnerOrdersLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  communityPreview: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  communityGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityContent: {
    flex: 1,
    marginLeft: 16,
  },
  communityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  communitySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  aiPrompt: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  aiPromptGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiPromptText: {
    flex: 1,
    marginLeft: 16,
  },
  aiPromptTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  aiPromptSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
  },
});