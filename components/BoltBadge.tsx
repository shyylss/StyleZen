import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, ExternalLink } from 'lucide-react-native';

interface BoltBadgeProps {
  variant?: 'floating' | 'inline' | 'footer';
  size?: 'small' | 'medium' | 'large';
}

export default function BoltBadge({ variant = 'floating', size = 'medium' }: BoltBadgeProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    try {
      await Linking.openURL('https://bolt.new');
    } catch (error) {
      console.log('Could not open Bolt.new link');
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: 8,
          iconSize: 14,
          fontSize: 11,
          borderRadius: 12,
        };
      case 'large':
        return {
          padding: 16,
          iconSize: 20,
          fontSize: 16,
          borderRadius: 20,
        };
      default:
        return {
          padding: 12,
          iconSize: 16,
          fontSize: 14,
          borderRadius: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  if (variant === 'footer') {
    return (
      <TouchableOpacity
        style={[styles.footerBadge, { borderRadius: sizeStyles.borderRadius }]}
        onPress={handlePress}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          style={[styles.footerGradient, { padding: sizeStyles.padding, borderRadius: sizeStyles.borderRadius }]}>
          <View style={styles.footerContent}>
            <Zap size={sizeStyles.iconSize} color="#FFD700" />
            <Text style={[styles.footerText, { fontSize: sizeStyles.fontSize }]}>
              Built with Bolt.new
            </Text>
            <ExternalLink size={sizeStyles.iconSize - 2} color="#9CA3AF" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'inline') {
    return (
      <TouchableOpacity
        style={[styles.inlineBadge, { borderRadius: sizeStyles.borderRadius }]}
        onPress={handlePress}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['#F8FAFC', '#FFFFFF']}
          style={[styles.inlineGradient, { padding: sizeStyles.padding, borderRadius: sizeStyles.borderRadius }]}>
          <View style={styles.inlineContent}>
            <View style={styles.boltIcon}>
              <Zap size={sizeStyles.iconSize} color="#FFD700" />
            </View>
            <View style={styles.inlineTextContainer}>
              <Text style={[styles.inlineTitle, { fontSize: sizeStyles.fontSize }]}>
                Built with Bolt.new
              </Text>
              <Text style={[styles.inlineSubtitle, { fontSize: sizeStyles.fontSize - 2 }]}>
                AI-powered development
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Floating variant (default)
  return (
    <TouchableOpacity
      style={[
        styles.floatingBadge,
        { borderRadius: sizeStyles.borderRadius },
        isPressed && styles.floatingPressed,
      ]}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.9}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
        style={[styles.floatingGradient, { padding: sizeStyles.padding, borderRadius: sizeStyles.borderRadius }]}>
        <View style={styles.floatingContent}>
          <View style={styles.boltIconContainer}>
            <Zap size={sizeStyles.iconSize} color="#FFD700" />
          </View>
          <Text style={[styles.floatingText, { fontSize: sizeStyles.fontSize }]}>
            Built with Bolt.new
          </Text>
        </View>
        <View style={styles.shimmer} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Floating Badge Styles
  floatingBadge: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floatingPressed: {
    transform: [{ scale: 0.95 }],
  },
  floatingGradient: {
    borderWidth: 1,
    borderColor: '#FFD700',
    position: 'relative',
    overflow: 'hidden',
  },
  floatingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltIconContainer: {
    marginRight: 8,
  },
  floatingText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },

  // Inline Badge Styles
  inlineBadge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inlineGradient: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inlineTextContainer: {
    flex: 1,
  },
  inlineTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  inlineSubtitle: {
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },

  // Footer Badge Styles
  footerBadge: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  footerGradient: {
    borderWidth: 1,
    borderColor: '#374151',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Medium',
    color: '#F9FAFB',
    marginHorizontal: 8,
  },
});