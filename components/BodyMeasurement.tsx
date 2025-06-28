import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Camera,
  Upload,
  Ruler,
  User,
  CheckCircle,
  AlertCircle,
  Zap,
} from 'lucide-react-native';

interface Measurement {
  id: string;
  label: string;
  value: string;
  unit: string;
  required: boolean;
}

const defaultMeasurements: Measurement[] = [
  { id: 'chest', label: 'Chest/Bust', value: '', unit: 'inches', required: true },
  { id: 'waist', label: 'Waist', value: '', unit: 'inches', required: true },
  { id: 'hips', label: 'Hips', value: '', unit: 'inches', required: true },
  { id: 'shoulders', label: 'Shoulder Width', value: '', unit: 'inches', required: true },
  { id: 'sleeve', label: 'Sleeve Length', value: '', unit: 'inches', required: false },
  { id: 'inseam', label: 'Inseam', value: '', unit: 'inches', required: false },
  { id: 'neck', label: 'Neck', value: '', unit: 'inches', required: false },
];

export default function BodyMeasurement() {
  const [measurements, setMeasurements] = useState<Measurement[]>(defaultMeasurements);
  const [measurementMethod, setMeasurementMethod] = useState<'manual' | 'ai' | 'photo'>('ai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateMeasurement = (id: string, value: string) => {
    setMeasurements(prev =>
      prev.map(m => m.id === id ? { ...m, value } : m)
    );
  };

  const handleAIMeasurement = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setMeasurements(prev =>
        prev.map(m => ({
          ...m,
          value: m.id === 'chest' ? '36' :
                 m.id === 'waist' ? '28' :
                 m.id === 'hips' ? '38' :
                 m.id === 'shoulders' ? '16' :
                 m.id === 'sleeve' ? '24' :
                 m.id === 'inseam' ? '30' :
                 m.id === 'neck' ? '14' : m.value
        }))
      );
      setIsAnalyzing(false);
    }, 3000);
  };

  const isComplete = measurements.filter(m => m.required).every(m => m.value.trim() !== '');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#F0F9FF', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Ruler size={24} color="#3B82F6" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Body Measurements</Text>
            <Text style={styles.headerSubtitle}>
              Get precise measurements for perfect fitting
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Measurement Methods */}
      <View style={styles.methodsContainer}>
        <Text style={styles.sectionTitle}>Choose Measurement Method</Text>
        
        <TouchableOpacity
          style={[
            styles.methodCard,
            measurementMethod === 'ai' && styles.selectedMethod,
          ]}
          onPress={() => setMeasurementMethod('ai')}>
          <Zap size={24} color={measurementMethod === 'ai' ? '#8B5CF6' : '#6B7280'} />
          <View style={styles.methodContent}>
            <Text style={[
              styles.methodTitle,
              measurementMethod === 'ai' && styles.selectedMethodText,
            ]}>
              AI Body Scan
            </Text>
            <Text style={styles.methodDescription}>
              Take a photo and let AI calculate your measurements
            </Text>
          </View>
          {measurementMethod === 'ai' && (
            <CheckCircle size={20} color="#8B5CF6" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodCard,
            measurementMethod === 'photo' && styles.selectedMethod,
          ]}
          onPress={() => setMeasurementMethod('photo')}>
          <Camera size={24} color={measurementMethod === 'photo' ? '#8B5CF6' : '#6B7280'} />
          <View style={styles.methodContent}>
            <Text style={[
              styles.methodTitle,
              measurementMethod === 'photo' && styles.selectedMethodText,
            ]}>
              Photo Upload
            </Text>
            <Text style={styles.methodDescription}>
              Upload existing photos for analysis
            </Text>
          </View>
          {measurementMethod === 'photo' && (
            <CheckCircle size={20} color="#8B5CF6" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodCard,
            measurementMethod === 'manual' && styles.selectedMethod,
          ]}
          onPress={() => setMeasurementMethod('manual')}>
          <User size={24} color={measurementMethod === 'manual' ? '#8B5CF6' : '#6B7280'} />
          <View style={styles.methodContent}>
            <Text style={[
              styles.methodTitle,
              measurementMethod === 'manual' && styles.selectedMethodText,
            ]}>
              Manual Entry
            </Text>
            <Text style={styles.methodDescription}>
              Enter measurements manually
            </Text>
          </View>
          {measurementMethod === 'manual' && (
            <CheckCircle size={20} color="#8B5CF6" />
          )}
        </TouchableOpacity>
      </View>

      {/* AI/Photo Capture Section */}
      {(measurementMethod === 'ai' || measurementMethod === 'photo') && (
        <View style={styles.captureSection}>
          <View style={styles.captureArea}>
            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <LinearGradient
                  colors={['#3B82F6', '#8B5CF6']}
                  style={styles.analyzingGradient}>
                  <Zap size={32} color="#FFFFFF" />
                  <Text style={styles.analyzingText}>Analyzing your measurements...</Text>
                  <Text style={styles.analyzingSubtext}>This may take a few seconds</Text>
                </LinearGradient>
              </View>
            ) : (
              <>
                <Camera size={48} color="#8B5CF6" />
                <Text style={styles.captureTitle}>
                  {measurementMethod === 'ai' ? 'Take a Full Body Photo' : 'Upload Photo'}
                </Text>
                <Text style={styles.captureSubtitle}>
                  Stand straight with arms slightly away from body
                </Text>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleAIMeasurement}>
                  <LinearGradient
                    colors={['#8B5CF6', '#EC4899']}
                    style={styles.captureButtonGradient}>
                    {measurementMethod === 'ai' ? (
                      <Camera size={20} color="#FFFFFF" />
                    ) : (
                      <Upload size={20} color="#FFFFFF" />
                    )}
                    <Text style={styles.captureButtonText}>
                      {measurementMethod === 'ai' ? 'Start AI Scan' : 'Upload Photo'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}

      {/* Measurements Form */}
      <View style={styles.measurementsSection}>
        <Text style={styles.sectionTitle}>Your Measurements</Text>
        
        {measurements.map((measurement) => (
          <View key={measurement.id} style={styles.measurementRow}>
            <View style={styles.measurementLabel}>
              <Text style={styles.measurementName}>
                {measurement.label}
                {measurement.required && <Text style={styles.required}> *</Text>}
              </Text>
            </View>
            <View style={styles.measurementInput}>
              <TextInput
                style={styles.input}
                value={measurement.value}
                onChangeText={(value) => updateMeasurement(measurement.id, value)}
                placeholder="0"
                keyboardType="numeric"
                editable={!isAnalyzing}
              />
              <Text style={styles.unit}>{measurement.unit}</Text>
            </View>
          </View>
        ))}

        <View style={styles.accuracyTip}>
          <AlertCircle size={16} color="#F59E0B" />
          <Text style={styles.tipText}>
            For best results, measure over form-fitting clothing or undergarments
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Save as Draft</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.primaryButton, !isComplete && styles.disabledButton]}
          disabled={!isComplete}>
          <LinearGradient
            colors={isComplete ? ['#8B5CF6', '#EC4899'] : ['#D1D5DB', '#9CA3AF']}
            style={styles.primaryButtonGradient}>
            <Text style={[
              styles.primaryButtonText,
              !isComplete && styles.disabledButtonText,
            ]}>
              Create Avatar
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
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
  methodsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  methodCard: {
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
  selectedMethod: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  methodContent: {
    flex: 1,
    marginLeft: 12,
  },
  methodTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedMethodText: {
    color: '#8B5CF6',
  },
  methodDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  captureSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  captureArea: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  analyzingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  analyzingGradient: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  analyzingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  analyzingSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
  },
  captureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  captureSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  captureButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  captureButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  captureButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  measurementsSection: {
    padding: 20,
  },
  measurementRow: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  measurementLabel: {
    flex: 1,
  },
  measurementName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  required: {
    color: '#EF4444',
  },
  measurementInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 80,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  accuracyTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#92400E',
    marginLeft: 8,
    flex: 1,
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
    alignItems: 'center',
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
  },
  primaryButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
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
  disabledButtonText: {
    color: '#9CA3AF',
  },
});