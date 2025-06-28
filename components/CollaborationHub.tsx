import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  MessageCircle,
  Heart,
  Share,
  Star,
  TrendingUp,
  Eye,
  Plus,
  Send,
  Filter,
} from 'lucide-react-native';

interface StylePost {
  id: string;
  designer: string;
  avatar: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  timestamp: string;
  isLiked: boolean;
  isFollowing: boolean;
}

interface Designer {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  followers: number;
  designs: number;
  rating: number;
  isFollowing: boolean;
}

const stylePosts: StylePost[] = [
  {
    id: '1',
    designer: 'Emma Chen',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Sustainable Summer Collection',
    description: 'Eco-friendly fabrics meet modern silhouettes. Perfect for conscious fashionistas who want to look good and feel good about their choices.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 1234,
    comments: 89,
    views: 5678,
    tags: ['Sustainable', 'Summer', 'Minimalist'],
    timestamp: '2 hours ago',
    isLiked: false,
    isFollowing: true,
  },
  {
    id: '2',
    designer: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Urban Streetwear Fusion',
    description: 'Blending classic streetwear with contemporary cuts. This collection speaks to the modern urban lifestyle.',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 856,
    comments: 67,
    views: 3421,
    tags: ['Streetwear', 'Urban', 'Contemporary'],
    timestamp: '5 hours ago',
    isLiked: true,
    isFollowing: false,
  },
  {
    id: '3',
    designer: 'Sofia Kim',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    title: 'Evening Elegance Redefined',
    description: 'Timeless elegance with a modern twist. These pieces transition seamlessly from day to night.',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 2156,
    comments: 134,
    views: 8901,
    tags: ['Evening', 'Elegant', 'Luxury'],
    timestamp: '1 day ago',
    isLiked: false,
    isFollowing: true,
  },
];

const featuredDesigners: Designer[] = [
  {
    id: '1',
    name: 'Emma Chen',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
    specialty: 'Sustainable Fashion',
    followers: 12500,
    designs: 89,
    rating: 4.9,
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    specialty: 'Streetwear Design',
    followers: 8900,
    designs: 156,
    rating: 4.8,
    isFollowing: false,
  },
  {
    id: '3',
    name: 'Sofia Kim',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    specialty: 'Evening Wear',
    followers: 15600,
    designs: 67,
    rating: 4.9,
    isFollowing: true,
  },
];

export default function CollaborationHub() {
  const [posts, setPosts] = useState<StylePost[]>(stylePosts);
  const [designers, setDesigners] = useState<Designer[]>(featuredDesigners);
  const [activeTab, setActiveTab] = useState<'feed' | 'designers'>('feed');
  const [comment, setComment] = useState('');

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleFollow = (designerId: string) => {
    setDesigners(prev =>
      prev.map(designer =>
        designer.id === designerId
          ? {
              ...designer,
              isFollowing: !designer.isFollowing,
              followers: designer.isFollowing
                ? designer.followers - 1
                : designer.followers + 1,
            }
          : designer
      )
    );
  };

  const renderStylePost = (post: StylePost) => (
    <View key={post.id} style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.designerAvatar} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.designerName}>{post.designer}</Text>
          <Text style={styles.postTimestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>
            {post.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>

      {/* Post Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      {/* Post Stats */}
      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Eye size={16} color="#6B7280" />
          <Text style={styles.statText}>{post.views.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Heart size={16} color="#6B7280" />
          <Text style={styles.statText}>{post.likes.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <MessageCircle size={16} color="#6B7280" />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={[styles.actionButton, post.isLiked && styles.likedButton]}
          onPress={() => toggleLike(post.id)}>
          <Heart
            size={20}
            color={post.isLiked ? '#EF4444' : '#6B7280'}
            fill={post.isLiked ? '#EF4444' : 'none'}
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#6B7280" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Input */}
      <View style={styles.commentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Send size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDesigner = (designer: Designer) => (
    <TouchableOpacity key={designer.id} style={styles.designerCard}>
      <Image source={{ uri: designer.avatar }} style={styles.designerCardAvatar} />
      <View style={styles.designerCardInfo}>
        <Text style={styles.designerCardName}>{designer.name}</Text>
        <Text style={styles.designerSpecialty}>{designer.specialty}</Text>
        <View style={styles.designerStats}>
          <View style={styles.designerStat}>
            <Text style={styles.designerStatNumber}>
              {designer.followers.toLocaleString()}
            </Text>
            <Text style={styles.designerStatLabel}>Followers</Text>
          </View>
          <View style={styles.designerStat}>
            <Text style={styles.designerStatNumber}>{designer.designs}</Text>
            <Text style={styles.designerStatLabel}>Designs</Text>
          </View>
          <View style={styles.designerStat}>
            <Star size={12} color="#F59E0B" />
            <Text style={styles.designerStatNumber}>{designer.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.designerFollowButton,
          designer.isFollowing && styles.designerFollowingButton,
        ]}
        onPress={() => toggleFollow(designer.id)}>
        <Text
          style={[
            styles.designerFollowText,
            designer.isFollowing && styles.designerFollowingText,
          ]}>
          {designer.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Style Community</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}>
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Style Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'designers' && styles.activeTab]}
          onPress={() => setActiveTab('designers')}>
          <Text style={[styles.tabText, activeTab === 'designers' && styles.activeTabText]}>
            Designers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'feed' ? (
          <View style={styles.feedContainer}>
            {posts.map(renderStylePost)}
          </View>
        ) : (
          <View style={styles.designersContainer}>
            <View style={styles.trendingSection}>
              <LinearGradient
                colors={['#F0F9FF', '#FFFFFF']}
                style={styles.trendingBanner}>
                <TrendingUp size={24} color="#3B82F6" />
                <View style={styles.trendingContent}>
                  <Text style={styles.trendingTitle}>Trending Now</Text>
                  <Text style={styles.trendingSubtitle}>
                    Sustainable fashion is up 45% this week
                  </Text>
                </View>
              </LinearGradient>
            </View>
            {designers.map(renderDesigner)}
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  feedContainer: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  designerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  designerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  postTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  followButton: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#8B5CF6',
  },
  postTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  postDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  postStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  likedButton: {
    // No additional styles needed, color handled in Heart component
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  likedText: {
    color: '#EF4444',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
  },
  designersContainer: {
    padding: 20,
  },
  trendingSection: {
    marginBottom: 24,
  },
  trendingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  trendingContent: {
    marginLeft: 12,
    flex: 1,
  },
  trendingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  trendingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  designerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  designerCardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  designerCardInfo: {
    flex: 1,
  },
  designerCardName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  designerSpecialty: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  designerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  designerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  designerStatNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1F2937',
    marginLeft: 2,
  },
  designerStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 2,
  },
  designerFollowButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  designerFollowingButton: {
    backgroundColor: '#F3F4F6',
  },
  designerFollowText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  designerFollowingText: {
    color: '#6B7280',
  },
});