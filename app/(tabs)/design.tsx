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
  Shirt,
  Palette,
  Layers,
  Sparkles,
  ChevronDown,
  Check,
  Plus,
  Save,
  Share,
  Factory,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { 
    id: 'womens', 
    name: "Women's", 
    icon: '👗',
    subcategories: [
      { id: 'dresses', name: 'Dresses', icon: '👗' },
      { id: 'tops', name: 'Tops & Blouses', icon: '👚' },
      { id: 'bottoms', name: 'Bottoms', icon: '👖' },
      { id: 'outerwear', name: 'Outerwear', icon: '🧥' },
      { id: 'activewear', name: 'Activewear', icon: '🏃‍♀️' },
      { id: 'lingerie', name: 'Lingerie', icon: '👙' },
    ]
  },
  { 
    id: 'mens', 
    name: "Men's", 
    icon: '👔',
    subcategories: [
      { id: 'shirts', name: 'Shirts', icon: '👔' },
      { id: 'pants', name: 'Pants', icon: '👖' },
      { id: 'suits', name: 'Suits', icon: '🤵' },
      { id: 'casual', name: 'Casual Wear', icon: '👕' },
      { id: 'outerwear', name: 'Outerwear', icon: '🧥' },
      { id: 'activewear', name: 'Activewear', icon: '🏃‍♂️' },
    ]
  },
  { 
    id: 'kids', 
    name: "Kids'", 
    icon: '👕',
    subcategories: [
      { id: 'boys', name: 'Boys (2-12)', icon: '👦' },
      { id: 'girls', name: 'Girls (2-12)', icon: '👧' },
      { id: 'toddlers', name: 'Toddlers (1-3)', icon: '🧒' },
      { id: 'infants', name: 'Infants (0-12m)', icon: '👶' },
      { id: 'school', name: 'School Wear', icon: '🎒' },
      { id: 'play', name: 'Play Wear', icon: '🎮' },
    ]
  },
];

const fabrics = [
  { id: 'cotton', name: 'Cotton', price: '$8/yard', image: 'https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: true },
  { id: 'silk', name: 'Silk', price: '$24/yard', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: false },
  { id: 'denim', name: 'Denim', price: '$12/yard', image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: true },
  { id: 'wool', name: 'Wool', price: '$18/yard', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: true },
  { id: 'linen', name: 'Linen', price: '$15/yard', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: true },
  { id: 'polyester', name: 'Polyester', price: '$6/yard', image: 'https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=200', sustainable: false },
];

const colors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
  '#8B5CF6', '#EC4899', '#6B7280', '#1F2937',
  '#F97316', '#06B6D4', '#84CC16', '#A855F7'
];

const manufacturingOptions = [
  { id: 'small', name: 'Small Batch', description: '10-50 pieces', price: 'Premium pricing' },
  { id: 'medium', name: 'Medium Scale', description: '50-500 pieces', price: 'Competitive pricing' },
  { id: 'bulk', name: 'Bulk Order', description: '500+ pieces', price: 'Best pricing' },
];

export default function DesignScreen() {
  const [selectedCategory, setSelectedCategory] = useState('womens');
  const [selectedSubcategory, setSelectedSubcategory] = useState('dresses');
  const [selectedFabric, setSelectedFabric] = useState('cotton');
  const [selectedColor, setSelectedColor] = useState('#8B5CF6');
  const [selectedManufacturing, setSelectedManufacturing] = useState('small');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showSustainableOnly, setShowSustainableOnly] = useState(false);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const filteredFabrics = showSustainableOnly ? fabrics.filter(f => f.sustainable) : fabrics;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Design Studio</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Save size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* AI Suggestion Banner */}
        <LinearGradient
          colors={['#F3E8FF', '#FFFFFF']}
          style={styles.aiSuggestion}>
          <Sparkles size={20} color="#8B5CF6" />
          <Text style={styles.aiText}>
            AI suggests: Sustainable fabrics are trending for {currentCategory?.name.toLowerCase()} wear!
          </Text>
        </LinearGradient>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCard,
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory(category.subcategories[0].id);
                  }}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedText,
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Subcategory Selection */}
        {currentCategory && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{currentCategory.name} Types</Text>
            <View style={styles.subcategoryGrid}>
              {currentCategory.subcategories.map((subcategory) => (
                <TouchableOpacity
                  key={subcategory.id}
                  style={[
                    styles.subcategoryCard,
                    selectedSubcategory === subcategory.id && styles.selectedSubcategoryCard,
                  ]}
                  onPress={() => setSelectedSubcategory(subcategory.id)}>
                  <Text style={styles.subcategoryIcon}>{subcategory.icon}</Text>
                  <Text style={[
                    styles.subcategoryText,
                    selectedSubcategory === subcategory.id && styles.selectedSubcategoryText,
                  ]}>
                    {subcategory.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 3D Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3D Preview</Text>
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.previewImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.previewOverlay}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View in AR</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Fabric Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fabric</Text>
            <TouchableOpacity 
              style={styles.sustainableToggle}
              onPress={() => setShowSustainableOnly(!showSustainableOnly)}>
              <Text style={[
                styles.sustainableText,
                showSustainableOnly && styles.sustainableTextActive
              ]}>
                🌱 Sustainable Only
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.fabricContainer}>
              {filteredFabrics.map((fabric) => (
                <TouchableOpacity
                  key={fabric.id}
                  style={[
                    styles.fabricCard,
                    selectedFabric === fabric.id && styles.selectedFabricCard,
                  ]}
                  onPress={() => setSelectedFabric(fabric.id)}>
                  <Image source={{ uri: fabric.image }} style={styles.fabricImage} />
                  {fabric.sustainable && (
                    <View style={styles.sustainableBadge}>
                      <Text style={styles.sustainableBadgeText}>🌱</Text>
                    </View>
                  )}
                  {selectedFabric === fabric.id && (
                    <View style={styles.fabricCheck}>
                      <Check size={16} color="#FFFFFF" />
                    </View>
                  )}
                  <View style={styles.fabricInfo}>
                    <Text style={styles.fabricName}>{fabric.name}</Text>
                    <Text style={styles.fabricPrice}>{fabric.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorSwatch,
                ]}
                onPress={() => setSelectedColor(color)}>
                {selectedColor === color && (
                  <Check size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addColorButton}>
              <Plus size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Manufacturing Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manufacturing Scale</Text>
          <View style={styles.manufacturingContainer}>
            {manufacturingOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.manufacturingCard,
                  selectedManufacturing === option.id && styles.selectedManufacturingCard,
                ]}
                onPress={() => setSelectedManufacturing(option.id)}>
                <Factory 
                  size={24} 
                  color={selectedManufacturing === option.id ? '#8B5CF6' : '#6B7280'} 
                />
                <Text style={[
                  styles.manufacturingName,
                  selectedManufacturing === option.id && styles.selectedManufacturingText,
                ]}>
                  {option.name}
                </Text>
                <Text style={styles.manufacturingDescription}>{option.description}</Text>
                <Text style={styles.manufacturingPrice}>{option.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Size Guide */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sizeGuideHeader}
            onPress={() => setShowSizeGuide(!showSizeGuide)}>
            <Text style={styles.sectionTitle}>Size Guide</Text>
            <ChevronDown 
              size={20} 
              color="#6B7280"
              style={[styles.chevron, showSizeGuide && styles.chevronRotated]}
            />
          </TouchableOpacity>
          {showSizeGuide && (
            <View style={styles.sizeGuideContent}>
              <Text style={styles.sizeGuideText}>
                Upload your measurements or use our AI body measurement tool for the perfect fit. Our manufacturing partners will ensure precise sizing.
              </Text>
              <TouchableOpacity style={styles.measureButton}>
                <Text style={styles.measureButtonText}>Take Measurements</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Share size={20} color="#6B7280" />
            <Text style={styles.secondaryButtonText}>Share Design</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.primaryButtonGradient}>
              <Text style={styles.primaryButtonText}>Connect with Manufacturers</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  saveButton: {
    padding: 8,
  },
  aiSuggestion: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  aiText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    marginLeft: 8,
    flex: 1,
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
  sustainableToggle: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  sustainableText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#16A34A',
  },
  sustainableTextActive: {
    color: '#15803D',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedText: {
    color: '#8B5CF6',
  },
  subcategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  subcategoryCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedSubcategoryCard: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  subcategoryIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  subcategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedSubcategoryText: {
    color: '#8B5CF6',
  },
  previewContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 300,
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  fabricContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  fabricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedFabricCard: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  fabricImage: {
    width: 100,
    height: 80,
  },
  sustainableBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 2,
  },
  sustainableBadgeText: {
    fontSize: 10,
  },
  fabricCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 4,
  },
  fabricInfo: {
    padding: 12,
  },
  fabricName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  fabricPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  colorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorSwatch: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addColorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  manufacturingContainer: {
    paddingHorizontal: 20,
  },
  manufacturingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedManufacturingCard: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  manufacturingName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  selectedManufacturingText: {
    color: '#8B5CF6',
  },
  manufacturingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  manufacturingPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
  },
  sizeGuideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  sizeGuideContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sizeGuideText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  measureButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  measureButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  primaryButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});