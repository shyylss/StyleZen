import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Camera,
  Upload,
  RotateCcw,
  Zap,
  Eye,
  Layers,
  ChevronRight,
  Play,
  Pause,
  Share,
  Ruler,
  Sparkles,
  Settings,
  Download,
} from 'lucide-react-native';
import BodyMeasurement from '@/components/BodyMeasurement';

const { width, height } = Dimensions.get('window');

const tryOnModes = [
  { 
    id: '3d', 
    name: '3D View', 
    description: 'Realistic 3D rendering',
    features: ['360° rotation', 'Fabric draping', 'Lighting effects']
  },
  { 
    id: '4d', 
    name: '4D Motion', 
    description: 'See how it moves',
    features: ['Walking simulation', 'Fabric movement', 'Real-time physics']
  },
  { 
    id: '5d', 
    name: '5D Reality', 
    description: 'Ultra-realistic experience',
    features: ['Haptic feedback', 'Environmental context', 'AI body analysis']
  },
];

const outfitSuggestions = [
  {
    id: 1,
    title: 'Summer Casual',
    items: ['Floral Dress', 'Sandals', 'Sun Hat'],
    confidence: 94,
    fitScore: 98,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    aiRecommendation: 'Perfect for your body type and style preferences',
  },
  {
    id: 2,
    title: 'Office Chic',
    items: ['Blazer', 'Blouse', 'Trousers'],
    confidence: 89,
    fitScore: 95,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    aiRecommendation: 'Professional look that enhances your silhouette',
  },
  {
    id: 3,
    title: 'Evening Elegance',
    items: ['Silk Dress', 'Heels', 'Clutch'],
    confidence: 96,
    fitScore: 97,
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=300',
    aiRecommendation: 'Stunning choice for special occasions',
  },
];

const bodyAnalysisData = {
  measurements: {
    chest: '36"',
    waist: '28"',
    hips: '38"',
    shoulders: '16"',
  },
  bodyType: 'Pear',
  skinTone: 'Warm',
  recommendations: [
    'A-line silhouettes work best for your body type',
    'Warm colors like coral and gold complement your skin tone',
    'Empire waistlines will enhance your natural proportions',
  ],
};

export default function TryOnScreen() {
  const [selectedMode, setSelectedMode] = useState('5d');
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleStartTryOn = () => {
    setShowCamera(true);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleMeasurementComplete = () => {
    setShowMeasurement(false);
    setShowCamera(true);
  };

  if (showMeasurement) {
    return <BodyMeasurement />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>5D Virtual Try-On</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Share size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Analysis Banner */}
        <LinearGradient
          colors={['#F0F9FF', '#FFFFFF']}
          style={styles.aiAnalysis}>
          <Eye size={20} color="#3B82F6" />
          <View style={styles.aiAnalysisText}>
            <Text style={styles.aiAnalysisTitle}>AI Body Analysis Complete</Text>
            <Text style={styles.aiAnalysisSubtitle}>
              Perfect fit guarantee with 98% accuracy
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.analysisButton}
            onPress={() => setShowAnalysis(!showAnalysis)}>
            <Zap size={20} color="#F59E0B" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Body Analysis Results */}
        {showAnalysis && (
          <View style={styles.analysisResults}>
            <Text style={styles.analysisTitle}>Your Body Analysis</Text>
            
            <View style={styles.measurementsGrid}>
              {Object.entries(bodyAnalysisData.measurements).map(([key, value]) => (
                <View key={key} style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Text style={styles.measurementValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bodyTypeSection}>
              <Text style={styles.bodyTypeLabel}>Body Type: </Text>
              <Text style={styles.bodyTypeValue}>{bodyAnalysisData.bodyType}</Text>
              <Text style={styles.skinToneLabel}>Skin Tone: </Text>
              <Text style={styles.skinToneValue}>{bodyAnalysisData.skinTone}</Text>
            </View>

            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
              {bodyAnalysisData.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Sparkles size={14} color="#8B5CF6" />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Try-On Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience Mode</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.modesContainer}>
              {tryOnModes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.modeCard,
                    selectedMode === mode.id && styles.selectedModeCard,
                  ]}
                  onPress={() => setSelectedMode(mode.id)}>
                  <Layers 
                    size={24} 
                    color={selectedMode === mode.id ? '#8B5CF6' : '#6B7280'} 
                  />
                  <Text style={[
                    styles.modeName,
                    selectedMode === mode.id && styles.selectedModeName,
                  ]}>
                    {mode.name}
                  </Text>
                  <Text style={styles.modeDescription}>{mode.description}</Text>
                  
                  <View style={styles.featuresContainer}>
                    {mode.features.map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Camera/Upload Section */}
        {!showCamera ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get Started</Text>
            <View style={styles.uploadContainer}>
              <View style={styles.uploadArea}>
                <Camera size={48} color="#8B5CF6" />
                <Text style={styles.uploadTitle}>Start Virtual Try-On</Text>
                <Text style={styles.uploadSubtitle}>
                  Use our AI body measurement for perfect fitting
                </Text>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.measurementButton}
                    onPress={() => setShowMeasurement(true)}>
                    <Ruler size={20} color="#6B7280" />
                    <Text style={styles.measurementButtonText}>Take Measurements</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.cameraButton}
                    onPress={handleStartTryOn}>
                    <LinearGradient
                      colors={['#8B5CF6', '#EC4899']}
                      style={styles.cameraButtonGradient}>
                      <Camera size={20} color="#FFFFFF" />
                      <Text style={styles.cameraButtonText}>Start Camera</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.uploadButton}>
                <Upload size={20} color="#6B7280" />
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.cameraContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.cameraPreview}
              />
              
              {/* Camera Controls */}
              <View style={styles.cameraControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <RotateCcw size={20} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.recordButton, isRecording && styles.recordingButton]}
                  onPress={toggleRecording}>
                  {isRecording ? (
                    <Pause size={24} color="#FFFFFF" />
                  ) : (
                    <Play size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.controlButton}>
                  <Download size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Live AI Feedback */}
              <View style={styles.liveFeedback}>
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.9)', 'rgba(139, 92, 246, 0.9)']}
                  style={styles.feedbackGradient}>
                  <Zap size={16} color="#FFFFFF" />
                  <Text style={styles.feedbackText}>
                    AI analyzing fit... 94% confidence
                  </Text>
                </LinearGradient>
              </View>

              {/* Fit Score */}
              <View style={styles.fitScore}>
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.9)', 'rgba(5, 150, 105, 0.9)']}
                  style={styles.fitScoreGradient}>
                  <Text style={styles.fitScoreText}>Fit Score: 98%</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

        {/* AI Outfit Suggestions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Style Suggestions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.suggestionsContainer}>
              {outfitSuggestions.map((outfit) => (
                <TouchableOpacity 
                  key={outfit.id} 
                  style={[
                    styles.suggestionCard,
                    selectedOutfit === outfit.id && styles.selectedSuggestion,
                  ]}
                  onPress={() => setSelectedOutfit(outfit.id)}>
                  <Image source={{ uri: outfit.image }} style={styles.suggestionImage} />
                  
                  <View style={styles.suggestionBadges}>
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.confidenceText}>{outfit.confidence}%</Text>
                    </View>
                    <View style={styles.fitScoreBadge}>
                      <Text style={styles.fitScoreText}>Fit: {outfit.fitScore}%</Text>
                    </View>
                  </View>

                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.suggestionOverlay}>
                    <Text style={styles.suggestionTitle}>{outfit.title}</Text>
                    <Text style={styles.suggestionItems}>
                      {outfit.items.join(' • ')}
                    </Text>
                    <Text style={styles.aiRecommendation}>
                      {outfit.aiRecommendation}
                    </Text>
                    
                    <TouchableOpacity style={styles.tryOnButton}>
                      <Text style={styles.tryOnButtonText}>Try This On</Text>
                      <ChevronRight size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Features List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5D Try-On Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Eye size={20} color="#3B82F6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Real-time Body Mapping</Text>
                <Text style={styles.featureDescription}>
                  AI analyzes your body shape for perfect fit predictions
                </Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.featureStatusText}>Active</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Layers size={20} color="#10B981" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>5D Virtual Reality</Text>
                <Text style={styles.featureDescription}>
                  Experience fabric texture and movement in ultra-realistic detail
                </Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.featureStatusText}>Premium</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Zap size={20} color="#F59E0B" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Smart Recommendations</Text>
                <Text style={styles.featureDescription}>
                  AI suggests perfect colors and styles based on your preferences
                </Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.featureStatusText}>AI-Powered</Text>
              </View>
            </View>
          </View>
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
  aiAnalysis: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  aiAnalysisText: {
    flex: 1,
    marginHorizontal: 12,
  },
  aiAnalysisTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  aiAnalysisSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  analysisButton: {
    padding: 8,
  },
  analysisResults: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  analysisTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  measurementItem: {
    width: '50%',
    paddingVertical: 8,
  },
  measurementLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  measurementValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  bodyTypeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  bodyTypeLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  bodyTypeValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#8B5CF6',
    marginRight: 16,
  },
  skinToneLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  skinToneValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#10B981',
  },
  recommendationsSection: {
    marginTop: 16,
  },
  recommendationsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
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
  modesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  modeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedModeCard: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  modeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  selectedModeName: {
    color: '#8B5CF6',
  },
  modeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 12,
  },
  featuresContainer: {
    alignItems: 'center',
  },
  featureTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#6B7280',
  },
  uploadContainer: {
    marginHorizontal: 20,
  },
  uploadArea: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  uploadTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  measurementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  measurementButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  cameraButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cameraButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  cameraButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  cameraContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cameraPreview: {
    width: '100%',
    height: 500,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 24,
    marginHorizontal: 16,
  },
  recordButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 32,
  },
  recordingButton: {
    backgroundColor: '#10B981',
  },
  liveFeedback: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  feedbackGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  feedbackText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  fitScore: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  fitScoreGradient: {
    padding: 8,
    borderRadius: 8,
  },
  fitScoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  suggestionCard: {
    width: 250,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  selectedSuggestion: {
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  suggestionImage: {
    width: '100%',
    height: '100%',
  },
  suggestionBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confidenceBadge: {
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
  fitScoreBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  suggestionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  suggestionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  suggestionItems: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E5E7EB',
    marginBottom: 8,
  },
  aiRecommendation: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#E5E7EB',
    marginBottom: 12,
    lineHeight: 18,
  },
  tryOnButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  tryOnButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
  featuresList: {
    paddingHorizontal: 20,
  },
  featureItem: {
    backgroundColor: '#FFFFFF',
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
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  featureStatus: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureStatusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#8B5CF6',
  },
});