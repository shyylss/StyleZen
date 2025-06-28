import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  MessageCircle,
  Star,
  Camera,
  AlertCircle,
} from 'lucide-react-native';

interface OrderStatus {
  id: string;
  status: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface Order {
  id: string;
  title: string;
  manufacturer: string;
  image: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  trackingNumber: string;
  statusHistory: OrderStatus[];
}

const sampleOrder: Order = {
  id: 'ORD-2024-001',
  title: 'Custom Summer Dress',
  manufacturer: 'Sustainable Threads Co.',
  image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
  orderDate: '2024-01-15',
  estimatedDelivery: '2024-01-28',
  currentStatus: 'In Production',
  trackingNumber: 'ST2024001',
  statusHistory: [
    {
      id: '1',
      status: 'Order Confirmed',
      timestamp: '2024-01-15 10:30 AM',
      description: 'Your order has been confirmed and sent to the manufacturer',
      completed: true,
      current: false,
    },
    {
      id: '2',
      status: 'Design Approved',
      timestamp: '2024-01-16 2:15 PM',
      description: 'Design specifications approved by manufacturer',
      completed: true,
      current: false,
    },
    {
      id: '3',
      status: 'Materials Sourced',
      timestamp: '2024-01-17 11:45 AM',
      description: 'All required materials have been sourced and quality checked',
      completed: true,
      current: false,
    },
    {
      id: '4',
      status: 'In Production',
      timestamp: '2024-01-18 9:00 AM',
      description: 'Your garment is currently being crafted by our skilled artisans',
      completed: false,
      current: true,
    },
    {
      id: '5',
      status: 'Quality Check',
      timestamp: 'Estimated: 2024-01-25',
      description: 'Final quality inspection and finishing touches',
      completed: false,
      current: false,
    },
    {
      id: '6',
      status: 'Shipped',
      timestamp: 'Estimated: 2024-01-26',
      description: 'Package shipped and on its way to you',
      completed: false,
      current: false,
    },
    {
      id: '7',
      status: 'Delivered',
      timestamp: 'Estimated: 2024-01-28',
      description: 'Package delivered to your address',
      completed: false,
      current: false,
    },
  ],
};

export default function OrderTracking() {
  const [selectedOrder] = useState<Order>(sampleOrder);

  const getStatusIcon = (status: string, completed: boolean, current: boolean) => {
    const iconProps = {
      size: 20,
      color: completed ? '#10B981' : current ? '#3B82F6' : '#9CA3AF',
    };

    switch (status) {
      case 'Order Confirmed':
        return <CheckCircle {...iconProps} />;
      case 'Design Approved':
        return <CheckCircle {...iconProps} />;
      case 'Materials Sourced':
        return <Package {...iconProps} />;
      case 'In Production':
        return <Clock {...iconProps} />;
      case 'Quality Check':
        return <Star {...iconProps} />;
      case 'Shipped':
        return <Truck {...iconProps} />;
      case 'Delivered':
        return <MapPin {...iconProps} />;
      default:
        return <Clock {...iconProps} />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Order Header */}
      <LinearGradient
        colors={['#F0F9FF', '#FFFFFF']}
        style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Image source={{ uri: selectedOrder.image }} style={styles.orderImage} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderTitle}>{selectedOrder.title}</Text>
            <Text style={styles.manufacturer}>by {selectedOrder.manufacturer}</Text>
            <Text style={styles.orderId}>Order #{selectedOrder.id}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{selectedOrder.currentStatus}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Delivery Estimate */}
      <View style={styles.deliverySection}>
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Truck size={24} color="#3B82F6" />
            <Text style={styles.deliveryTitle}>Estimated Delivery</Text>
          </View>
          <Text style={styles.deliveryDate}>{selectedOrder.estimatedDelivery}</Text>
          <Text style={styles.deliveryNote}>
            We'll notify you when your order ships
          </Text>
        </View>
      </View>

      {/* Progress Timeline */}
      <View style={styles.timelineSection}>
        <Text style={styles.sectionTitle}>Order Progress</Text>
        
        {selectedOrder.statusHistory.map((status, index) => (
          <View key={status.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[
                styles.statusIconContainer,
                status.completed && styles.completedIcon,
                status.current && styles.currentIcon,
              ]}>
                {getStatusIcon(status.status, status.completed, status.current)}
              </View>
              {index < selectedOrder.statusHistory.length - 1 && (
                <View style={[
                  styles.timelineLine,
                  status.completed && styles.completedLine,
                ]} />
              )}
            </View>
            
            <View style={styles.timelineContent}>
              <Text style={[
                styles.statusTitle,
                status.completed && styles.completedStatus,
                status.current && styles.currentStatus,
              ]}>
                {status.status}
              </Text>
              <Text style={styles.statusTimestamp}>{status.timestamp}</Text>
              <Text style={styles.statusDescription}>{status.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Manufacturer Communication */}
      <View style={styles.communicationSection}>
        <Text style={styles.sectionTitle}>Stay Connected</Text>
        
        <TouchableOpacity style={styles.communicationCard}>
          <MessageCircle size={24} color="#8B5CF6" />
          <View style={styles.communicationContent}>
            <Text style={styles.communicationTitle}>Message Manufacturer</Text>
            <Text style={styles.communicationSubtitle}>
              Ask questions about your order
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.communicationCard}>
          <Camera size={24} color="#10B981" />
          <View style={styles.communicationContent}>
            <Text style={styles.communicationTitle}>Request Progress Photos</Text>
            <Text style={styles.communicationSubtitle}>
              See your garment being made
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Order Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Date:</Text>
            <Text style={styles.detailValue}>{selectedOrder.orderDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tracking Number:</Text>
            <Text style={styles.detailValue}>{selectedOrder.trackingNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Manufacturer:</Text>
            <Text style={styles.detailValue}>{selectedOrder.manufacturer}</Text>
          </View>
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.supportSection}>
        <View style={styles.supportCard}>
          <AlertCircle size={20} color="#F59E0B" />
          <View style={styles.supportContent}>
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportText}>
              Contact our support team if you have any concerns about your order
            </Text>
          </View>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Get Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  orderHeader: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  manufacturer: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderId: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  deliverySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  deliveryDate: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#3B82F6',
    marginBottom: 4,
  },
  deliveryNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  timelineSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  completedIcon: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  currentIcon: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  completedLine: {
    backgroundColor: '#10B981',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  statusTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  completedStatus: {
    color: '#10B981',
  },
  currentStatus: {
    color: '#3B82F6',
  },
  statusTimestamp: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  communicationSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  communicationCard: {
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
  communicationContent: {
    flex: 1,
    marginLeft: 12,
  },
  communicationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  communicationSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  supportSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  supportCard: {
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  supportContent: {
    flex: 1,
    marginLeft: 12,
  },
  supportTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  supportText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#92400E',
    lineHeight: 16,
  },
  supportButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  supportButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});