import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Users, ShoppingBag, Eye, Heart, Star, Calendar, Filter, Download, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: any;
  color: string;
}

interface TrendData {
  period: string;
  value: number;
}

interface PopularItem {
  id: string;
  name: string;
  category: string;
  orders: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

const metrics: MetricCard[] = [
  {
    id: '1',
    title: 'Total Designs',
    value: '2,847',
    change: 12.5,
    changeType: 'increase',
    icon: BarChart3,
    color: '#8B5CF6',
  },
  {
    id: '2',
    title: 'Active Users',
    value: '18.2K',
    change: 8.3,
    changeType: 'increase',
    icon: Users,
    color: '#10B981',
  },
  {
    id: '3',
    title: 'Orders Placed',
    value: '1,456',
    change: 15.7,
    changeType: 'increase',
    icon: ShoppingBag,
    color: '#3B82F6',
  },
  {
    id: '4',
    title: 'Revenue',
    value: '$89.4K',
    change: -2.1,
    changeType: 'decrease',
    icon: TrendingUp,
    color: '#F59E0B',
  },
];

const trendData: TrendData[] = [
  { period: 'Jan', value: 65 },
  { period: 'Feb', value: 78 },
  { period: 'Mar', value: 82 },
  { period: 'Apr', value: 95 },
  { period: 'May', value: 88 },
  { period: 'Jun', value: 102 },
];

const popularItems: PopularItem[] = [
  {
    id: '1',
    name: 'Summer Dress Collection',
    category: "Women's Dresses",
    orders: 234,
    revenue: 12450,
    trend: 'up',
  },
  {
    id: '2',
    name: 'Casual Blazer Set',
    category: "Women's Outerwear",
    orders: 189,
    revenue: 9876,
    trend: 'up',
  },
  {
    id: '3',
    name: 'Streetwear Hoodie',
    category: "Men's Casual",
    orders: 156,
    revenue: 7834,
    trend: 'stable',
  },
  {
    id: '4',
    name: 'Kids Play Set',
    category: "Kids' Casual",
    orders: 98,
    revenue: 4567,
    trend: 'down',
  },
];

const categoryData = [
  { name: "Women's", percentage: 45, color: '#8B5CF6' },
  { name: "Men's", percentage: 32, color: '#3B82F6' },
  { name: "Kids'", percentage: 18, color: '#10B981' },
  { name: 'Baby', percentage: 5, color: '#F59E0B' },
];

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('designs');

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={12} color="#10B981" />;
      case 'down':
        return <TrendingDown size={12} color="#EF4444" />;
      default:
        return <View style={styles.stableTrend} />;
    }
  };

  const renderMetricCard = (metric: MetricCard) => {
    const IconComponent = metric.icon;
    return (
      <TouchableOpacity key={metric.id} style={styles.metricCard}>
        <LinearGradient
          colors={[`${metric.color}15`, '#FFFFFF']}
          style={styles.metricGradient}>
          <View style={styles.metricHeader}>
            <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
              <IconComponent size={20} color={metric.color} />
            </View>
            <View style={[
              styles.changeIndicator,
              metric.changeType === 'increase' ? styles.positiveChange : styles.negativeChange,
            ]}>
              {metric.changeType === 'increase' ? (
                <TrendingUp size={12} color="#10B981" />
              ) : (
                <TrendingDown size={12} color="#EF4444" />
              )}
              <Text style={[
                styles.changeText,
                metric.changeType === 'increase' ? styles.positiveText : styles.negativeText,
              ]}>
                {Math.abs(metric.change)}%
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{metric.value}</Text>
          <Text style={styles.metricTitle}>{metric.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderTrendChart = () => {
    const maxValue = Math.max(...trendData.map(d => d.value));
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Design Trends</Text>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.selectedPeriod,
                ]}
                onPress={() => setSelectedPeriod(period.id)}>
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.id && styles.selectedPeriodText,
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.chart}>
          <View style={styles.chartBars}>
            {trendData.map((data, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (data.value / maxValue) * 120,
                      backgroundColor: '#8B5CF6',
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{data.period}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderCategoryChart = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.sectionTitle}>Category Distribution</Text>
      <View style={styles.categoryChart}>
        <View style={styles.pieChart}>
          {categoryData.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Metrics Overview */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.metricsGrid}>
            {metrics.map(renderMetricCard)}
          </View>
        </View>

        {/* Trend Chart */}
        <View style={styles.section}>
          {renderTrendChart()}
        </View>

        {/* Category Distribution */}
        <View style={styles.section}>
          {renderCategoryChart()}
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Designs</Text>
          <View style={styles.popularItemsContainer}>
            {popularItems.map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.popularItem}>
                <View style={styles.itemRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <View style={styles.itemStats}>
                    <Text style={styles.itemOrders}>{item.orders} orders</Text>
                    <Text style={styles.itemRevenue}>${item.revenue.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.itemTrend}>
                  {getTrendIcon(item.trend)}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          <View style={styles.insightsContainer}>
            <LinearGradient
              colors={['#F0F9FF', '#FFFFFF']}
              style={styles.insightCard}>
              <TrendingUp size={24} color="#3B82F6" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Growing Trend</Text>
                <Text style={styles.insightText}>
                  Sustainable fashion designs are up 45% this month
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#F0FDF4', '#FFFFFF']}
              style={styles.insightCard}>
              <Star size={24} color="#10B981" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Top Performer</Text>
                <Text style={styles.insightText}>
                  Summer dress collections have the highest conversion rate
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#FEF3C7', '#FFFFFF']}
              style={styles.insightCard}>
              <Users size={24} color="#F59E0B" />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>User Engagement</Text>
                <Text style={styles.insightText}>
                  Average session time increased by 23% this week
                </Text>
              </View>
            </LinearGradient>
          </View>
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  metricsSection: {
    marginBottom: 24,
    paddingTop: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  metricCard: {
    width: (width - 52) / 2,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  metricGradient: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  positiveChange: {
    backgroundColor: '#ECFDF5',
  },
  negativeChange: {
    backgroundColor: '#FEF2F2',
  },
  changeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 2,
  },
  positiveText: {
    color: '#10B981',
  },
  negativeText: {
    color: '#EF4444',
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  metricTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectedPeriod: {
    backgroundColor: '#FFFFFF',
  },
  periodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedPeriodText: {
    color: '#1F2937',
  },
  chart: {
    height: 150,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryChart: {
    marginTop: 16,
  },
  pieChart: {
    // Simple list representation instead of actual pie chart
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  categoryPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1F2937',
  },
  popularItemsContainer: {
    paddingHorizontal: 20,
  },
  popularItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemRank: {
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
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  itemCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemStats: {
    flexDirection: 'row',
  },
  itemOrders: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginRight: 16,
  },
  itemRevenue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#10B981',
  },
  itemTrend: {
    padding: 8,
  },
  stableTrend: {
    width: 12,
    height: 2,
    backgroundColor: '#9CA3AF',
    borderRadius: 1,
  },
  insightsContainer: {
    paddingHorizontal: 20,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightContent: {
    marginLeft: 16,
    flex: 1,
  },
  insightTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  insightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});