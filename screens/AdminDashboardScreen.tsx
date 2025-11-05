import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { supabaseClient } from '../supabase';
import { toast } from 'sonner-native';

export default function AdminDashboardScreen() {
  const navigation = useNavigation();
  const { user, isAdmin } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalListings: 0,
    pendingListings: 0,
    totalRevenue: 0,
    recentOrders: [],
    recentListings: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load orders statistics
      const { data: ordersData, error: ordersError } = await supabaseClient
        .from('orders')
        .select('id, status, total_amount, created_at');

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      }

      // Load listings statistics (from user_listings)
      const { data: listingsData, error: listingsError } = await supabaseClient
        .from('user_listings')
        .select('id, status, created_at');

      if (listingsError) {
        console.error('Error fetching listings:', listingsError);
      }

      // Calculate statistics
      const totalOrders = ordersData?.length || 0;
      const pendingOrders = ordersData?.filter(order => order.status === 'pending').length || 0;
      const totalListings = listingsData?.length || 0;
      const pendingListings = listingsData?.filter(listing => listing.status === 'pending').length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      // Get recent orders
      const recentOrders = ordersData?.slice(0, 5).map(order => ({
        id: order.id,
        amount: order.total_amount,
        status: order.status,
        date: order.created_at
      })) || [];

      // Get recent listings
      const recentListings = listingsData?.slice(0, 5).map(listing => ({
        id: listing.id,
        status: listing.status,
        date: listing.created_at
      })) || [];

      setStats({
        totalOrders,
        pendingOrders,
        totalListings,
        pendingListings,
        totalRevenue,
        recentOrders,
        recentListings
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'confirmed': return '#42A5F5';
      case 'shipped': return '#66BB6A';
      case 'delivered': return '#4CAF50';
      case 'cancelled': return '#EF5350';
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (navigation as any).navigate('ProfileStack')}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="lock-closed" size={64} color="#F44336" />
          <Text style={styles.errorText}>Access Denied</Text>
          <Text style={styles.errorSubtext}>You don't have admin privileges</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (navigation as any).navigate('ProfileStack')}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (navigation as any).navigate('ProfileStack')}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity onPress={loadDashboardData}>
          <Ionicons name="refresh" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, Admin!</Text>
          <Text style={styles.welcomeSubtitle}>Manage your furniture marketplace</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="receipt" size={32} color="#2E7D32" />
              <Text style={styles.statNumber}>{stats.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={32} color="#FFA726" />
              <Text style={styles.statNumber}>{stats.pendingOrders}</Text>
              <Text style={styles.statLabel}>Pending Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cube" size={32} color="#42A5F5" />
              <Text style={styles.statNumber}>{stats.totalListings}</Text>
              <Text style={styles.statLabel}>Total Listings</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="hourglass" size={32} color="#FFA726" />
              <Text style={styles.statNumber}>{stats.pendingListings}</Text>
              <Text style={styles.statLabel}>Pending Listings</Text>
            </View>
          </View>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.revenueTitle}>Total Revenue</Text>
          </View>
          <Text style={styles.revenueAmount}>${stats.totalRevenue.toFixed(2)}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('AdminOrderManagement')}
            >
              <Ionicons name="receipt-outline" size={32} color="#2E7D32" />
              <Text style={styles.actionTitle}>Manage Orders</Text>
              <Text style={styles.actionSubtitle}>View and update orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('AdminListingsManagement')}
            >
              <Ionicons name="cube-outline" size={32} color="#42A5F5" />
              <Text style={styles.actionTitle}>Manage Listings</Text>
              <Text style={styles.actionSubtitle}>Review furniture submissions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('ProductList', { category: 'All Products' })}
            >
              <Ionicons name="storefront-outline" size={32} color="#9C27B0" />
              <Text style={styles.actionTitle}>View Products</Text>
              <Text style={styles.actionSubtitle}>Browse product catalog</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('ProfileStack')}
            >
              <Ionicons name="people-outline" size={32} color="#FF9800" />
              <Text style={styles.actionTitle}>User Management</Text>
              <Text style={styles.actionSubtitle}>View user profiles</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {/* Recent Orders */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Recent Orders</Text>
            {stats.recentOrders.length === 0 ? (
              <Text style={styles.noActivityText}>No recent orders</Text>
            ) : (
              stats.recentOrders.map((order) => (
                <View key={order.id} style={styles.activityItem}>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityText}>Order #{order.id.substring(0, 8)}...</Text>
                    <Text style={styles.activitySubtext}>${order.amount.toFixed(2)} • {new Date(order.date).toLocaleDateString()}</Text>
                  </View>
                  <View style={[styles.activityStatus, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.activityStatusText}>{order.status.toUpperCase()}</Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Recent Listings */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Recent Listings</Text>
            {stats.recentListings.length === 0 ? (
              <Text style={styles.noActivityText}>No recent listings</Text>
            ) : (
              stats.recentListings.map((listing) => (
                <View key={listing.id} style={styles.activityItem}>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityText}>Listing #{listing.id.substring(0, 8)}...</Text>
                    <Text style={styles.activitySubtext}>{new Date(listing.date).toLocaleDateString()}</Text>
                  </View>
                  <View style={[styles.activityStatus, { backgroundColor: getStatusColor(listing.status) }]}>
                    <Text style={styles.activityStatusText}>{listing.status.toUpperCase()}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: '#2E7D32',
    padding: 24,
    margin: 16,
    borderRadius: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  revenueCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  revenueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionsContainer: {
    padding: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  activityContainer: {
    padding: 16,
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activitySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activitySubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  noActivityText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

