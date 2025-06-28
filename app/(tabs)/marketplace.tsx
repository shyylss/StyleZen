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
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Users,
  ChevronRight,
  Heart,
  MessageCircle,
  Factory,
  Palette,
  Package,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'all', name: 'All', count: 1250 },
  { id: 'designers', name: 'Designers', count: 680 },
  { id: 'manufacturers', name: 'Manufacturers', count: 420 },
  { id: 'suppliers', name: 'Suppliers', count: 150 },
];

const clothingCategories = [
  { id: 'womens', name: "Women's", icon: '👗', subcategories: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Lingerie', 'Activewear'] },
  { id: 'mens', name: "Men's", icon: '👔', subcategories: ['Shirts', 'Pants', 'Suits', 'Casual', 'Outerwear', 'Activewear'] },
  { id: 'kids', name: "Kids'", icon: '👕', subcategories: ['Boys', 'Girls', 'Toddlers', 'Infants', 'School Wear', 'Play Wear'] },
];

const featuredPartners = [
  {
    id: 1,
    name: 'Sustainable Threads Co.',
    type: 'Manufacturer',
    rating: 4.9,
    reviews: 1234,
    location: 'Los Angeles, CA',
    specialties: ["Women's Dresses", 'Sustainable Fabrics', 'Small Batch Production'],
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    responseTime: '2 hours',
    completedOrders: 856,
    featured: true,
    minOrder: 50,
    priceRange: '$15-45',
    categories: ['womens'],
  },
  {
    id: 2,
    name: 'Urban Design Studio',
    type: 'Designer',
    rating: 4.8,
    reviews: 892,
    location: 'New York, NY',
    specialties: ["Men's Streetwear", 'Custom Designs', 'Trend Forecasting'],
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    responseTime: '1 hour',
    completedOrders: 623,
    featured: true,
    minOrder: 25,
    priceRange: '$25-80',
    categories: ['mens'],
  },
  {
    id: 3,
    name: 'Little Wonders Manufacturing',
    type: 'Manufacturer',
    rating: 4.7,
    reviews: 456,
    location: 'Portland, OR',
    specialties: ["Kids' Clothing", 'Organic Materials', 'Safety Certified'],
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
    responseTime: '4 hours',
    completedOrders: 234,
    featured: false,
    minOrder: 100,
    priceRange: '$12-35',
    categories: ['kids'],
  },
  {
    id: 4,
    name: 'Elite Fashion House',
    type: 'Designer',
    rating: 4.9,
    reviews: 678,
    location: 'Miami, FL',
    specialties: ["Women's Evening Wear", 'Luxury Fabrics', 'Custom Couture'],
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=300',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    responseTime: '3 hours',
    completedOrders: 445,
    featured: true,
    minOrder: 10,
    priceRange: '$80-250',
    categories: ['womens'],
  },
];

const topPerformers = [
  { name: 'Eco Fashion Co.', specialty: "Women's Sustainable", orders: 2341, growth: '+25%' },
  { name: 'Metro Menswear', specialty: "Men's Business", orders: 1987, growth: '+18%' },
  { name: 'Happy Kids Apparel', specialty: "Children's Casual", orders: 1654, growth: '+32%' },
];

export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClothingCategory, setSelectedClothingCategory] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Manufacturer': return Factory;
      case 'Designer': return Palette;
      case 'Supplier': return Package;
      default: return Users;
    }
  };

  const renderPartnerCard = (partner: typeof featuredPartners[0]) => {
    const TypeIcon = getTypeIcon(partner.type);
    
    return (
      <TouchableOpacity key={partner.id} style={styles.partnerCard}>
        <Image source={{ uri: partner.image }} style={styles.partnerImage} />
        
        {/* Featured Badge */}
        {partner.featured && (
          <View style={styles.featuredBadge}>
            <Award size={12} color="#FFFFFF" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}

        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={16} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.partnerInfo}>
          <View style={styles.partnerHeader}>
            <Image source={{ uri: partner.avatar }} style={styles.avatar} />
            <View style={styles.partnerDetails}>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <View style={styles.typeContainer}>
                <TypeIcon size={14} color="#8B5CF6" />
                <Text style={styles.partnerType}>{partner.type}</Text>
              </View>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Star size={14} color="#F59E0B" />
            <Text style={styles.rating}>{partner.rating}</Text>
            <Text style={styles.reviews}>({partner.reviews})</Text>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.location}>{partner.location}</Text>
          </View>

          <View style={styles.specialtiesContainer}>
            {partner.specialties.slice(0, 2).map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
            {partner.specialties.length > 2 && (
              <Text style={styles.moreSpecialties}>+{partner.specialties.length - 2}</Text>
            )}
          </View>

          <View style={styles.businessInfo}>
            <View style={styles.businessItem}>
              <Text style={styles.businessLabel}>Min Order:</Text>
              <Text style={styles.businessValue}>{partner.minOrder} pcs</Text>
            </View>
            <View style={styles.businessItem}>
              <Text style={styles.businessLabel}>Price Range:</Text>
              <Text style={styles.businessValue}>{partner.priceRange}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Clock size={12} color="#6B7280" />
              <Text style={styles.statText}>{partner.responseTime}</Text>
              <Text style={styles.statLabel}>response</Text>
            </View>
            <View style={styles.stat}>
              <Package size={12} color="#6B7280" />
              <Text style={styles.statText}>{partner.completedOrders}</Text>
              <Text style={styles.statLabel}>orders</Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.messageButton}>
              <MessageCircle size={16} color="#8B5CF6" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Profile</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Partner Network</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Connect with Manufacturers & Designers</Text>
            <Text style={styles.heroSubtitle}>
              Find verified partners for small to medium scale production
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Become a Partner</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={styles.statNumber}>1,250+</Text>
            <Text style={styles.statLabel}>Verified Partners</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>45K+</Text>
            <Text style={styles.statLabel}>Happy Brands</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>4.8★</Text>
            <Text style={styles.statLabel}>Avg. Rating</Text>
          </View>
        </View>

        {/* Clothing Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.clothingCategoriesGrid}>
            {clothingCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.clothingCategoryCard,
                  selectedClothingCategory === category.id && styles.selectedClothingCategory,
                ]}
                onPress={() => setSelectedClothingCategory(category.id)}>
                <Text style={styles.clothingCategoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.clothingCategoryName,
                  selectedClothingCategory === category.id && styles.selectedClothingCategoryText,
                ]}>
                  {category.name}
                </Text>
                <View style={styles.subcategoriesContainer}>
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <Text key={index} style={styles.subcategoryText}>{sub}</Text>
                  ))}
                  {category.subcategories.length > 3 && (
                    <Text style={styles.moreSubcategories}>+{category.subcategories.length - 3} more</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Partner Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Partner Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText,
                  ]}>
                    {category.name}
                  </Text>
                  <Text style={[
                    styles.categoryCount,
                    selectedCategory === category.id && styles.selectedCategoryCount,
                  ]}>
                    {category.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Top Performers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Performers</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {topPerformers.map((performer, index) => (
            <TouchableOpacity key={index} style={styles.performerCard}>
              <View style={styles.performerRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.performerInfo}>
                <Text style={styles.performerName}>{performer.name}</Text>
                <Text style={styles.performerSpecialty}>{performer.specialty}</Text>
              </View>
              <View style={styles.performerStats}>
                <Text style={styles.performerOrders}>{performer.orders} orders</Text>
                <Text style={[styles.performerGrowth, { color: '#10B981' }]}>
                  {performer.growth}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Partners */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Partners</Text>
          {featuredPartners.map(renderPartnerCard)}
        </View>
      </ScrollView>
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
    paddingBottom: 20,
  },
  title: {
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
  heroBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  heroButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#3B82F6',
  },
  statsSection: {
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
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
  },
  clothingCategoriesGrid: {
    paddingHorizontal: 20,
  },
  clothingCategoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedClothingCategory: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  clothingCategoryIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  clothingCategoryName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  selectedClothingCategoryText: {
    color: '#8B5CF6',
  },
  subcategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subcategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  moreSubcategories: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  selectedCategoryCount: {
    color: '#FFFFFF',
  },
  performerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#8B5CF6',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  performerSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  performerStats: {
    alignItems: 'flex-end',
  },
  performerOrders: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  performerGrowth: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  partnerImage: {
    width: '100%',
    height: 200,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  partnerInfo: {
    padding: 16,
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  specialtyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#374151',
  },
  moreSpecialties: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  businessInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  businessItem: {
    alignItems: 'center',
  },
  businessLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  businessValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    marginRight: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  cardActions: {
    flexDirection: 'row',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8B5CF6',
    marginLeft: 4,
  },
  viewButton: {
    flex: 2,
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
});