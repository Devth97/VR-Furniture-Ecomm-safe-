import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { supabaseClient } from '../supabase';
import { toast } from 'sonner-native';

export default function AdminListingsManagementScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    loadAllListings();
  }, []);

  const loadAllListings = async () => {
    try {
      setIsLoading(true);
      
      // Get all user-submitted listings
      const { data, error } = await supabaseClient
        .from('user_listings')
        .select(`
          id,
          title,
          location_text,
          phone,
          image_urls,
          status,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
        toast.error('Failed to load listings');
        return;
      }

      const listingsWithUser = (data || []).map(listing => ({
        ...listing,
        user_name: 'User',
        user_email: listing.user_id
      }));

      setListings(listingsWithUser);
    } catch (error) {
      console.error('Error loading listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setIsLoading(false);
    }
  };

  const updateListingStatus = async (listingId: string, newStatus: string) => {
    try {
      console.log('Updating listing status', { listingId, newStatus });
      // Read existing history to maintain audit trail without RPC
      const { data: existing, error: fetchErr } = await supabaseClient
        .from('user_listings')
        .select('history')
        .eq('id', listingId)
        .single();
      if (fetchErr) throw fetchErr;

      const currentHistory = Array.isArray(existing?.history) ? existing.history : [];
      const appended = [
        ...currentHistory,
        { status: newStatus, at: new Date().toISOString(), by: user?.email || 'admin' }
      ];

      const { error } = await supabaseClient
        .from('user_listings')
        .update({ status: newStatus, history: appended })
        .eq('id', listingId)
        .select()
        .single();
      if (error) throw error;

      // Optimistically update UI
      setListings(prev => prev.map((l: any) => l.id === listingId ? { ...l, status: newStatus } : l));
      toast.success('Listing status updated');
      // Reload from server to ensure persistence
      loadAllListings();
    } catch (error) {
      console.error('Error updating listing status:', error);
      const message = (error as any)?.message || (error as any)?.error_description || 'Failed to update listing status';
      toast.error(message);
    }
  };

  const approveListing = (listingId: string) => {
    if (Platform.OS === 'web') {
      // Bypass confirm on web to ensure handler fires
      updateListingStatus(listingId, 'approved');
      return;
    }
    Alert.alert(
      'Approve Listing',
      'Are you sure you want to approve this furniture listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Approve', onPress: () => updateListingStatus(listingId, 'approved') }
      ]
    );
  };

  const rejectListing = (listingId: string) => {
    if (Platform.OS === 'web') {
      // Bypass confirm on web to ensure handler fires
      updateListingStatus(listingId, 'rejected');
      return;
    }
    Alert.alert(
      'Reject Listing',
      'Are you sure you want to reject this furniture listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reject', style: 'destructive', onPress: () => updateListingStatus(listingId, 'rejected') }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const filteredListings = selectedStatus === 'all' 
    ? listings 
    : listings.filter(listing => listing.status === selectedStatus);

  const getStatusCounts = () => {
    const counts = {
      all: listings.length,
      pending: listings.filter(l => l.status === 'pending').length,
      approved: listings.filter(l => l.status === 'approved').length,
      rejected: listings.filter(l => l.status === 'rejected').length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Listings Management</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading listings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Listings Management</Text>
        <TouchableOpacity onPress={loadAllListings}>
          <Ionicons name="refresh" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Status Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'pending', label: 'Pending', count: statusCounts.pending },
              { key: 'approved', label: 'Approved', count: statusCounts.approved },
              { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
            ].map((status) => (
              <TouchableOpacity
                key={status.key}
                style={[
                  styles.filterButton,
                  selectedStatus === status.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedStatus(status.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedStatus === status.key && styles.filterButtonTextActive
                ]}>
                  {status.label} ({status.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Listings List */}
        <View style={styles.listingsContainer}>
          {filteredListings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>No listings found</Text>
            </View>
          ) : (
            filteredListings.map((listing) => (
              <View key={listing.id} style={styles.listingCard}>
                <View style={styles.listingHeader}>
                  <View style={styles.listingInfo}>
                    <Text style={styles.listingTitle}>{listing.title}</Text>
                    <Text style={styles.listingUser}>by {listing.user_name}</Text>
                    <Text style={styles.listingEmail}>{listing.user_email}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(listing.status) }]}>
                    <Text style={styles.statusText}>{listing.status.toUpperCase()}</Text>
                  </View>
                </View>

                {/* Images */}
                {listing.image_urls && listing.image_urls.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
                    {listing.image_urls.map((imageUrl: string, index: number) => (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={styles.listingImage}
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                )}

                <View style={styles.listingDetails}>
                  <Text style={styles.listingDescription} numberOfLines={3}>
                    {listing.location_text || 'No description provided'}
                  </Text>
                  
                  <View style={styles.listingMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="pricetag" size={16} color="#666" />
                      <Text style={styles.metaText}>N/A</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="construct" size={16} color="#666" />
                      <Text style={styles.metaText}>N/A</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="location" size={16} color="#666" />
                      <Text style={styles.metaText}>{listing.location_text}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="call" size={16} color="#666" />
                      <Text style={styles.metaText}>{listing.phone}</Text>
                    </View>
                  </View>

                  <Text style={styles.listingDate}>
                    Submitted: {new Date(listing.created_at).toLocaleDateString()}
                  </Text>
                </View>

                {/* Actions */}
                {listing.status === 'pending' && (
                  <View style={styles.listingActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.approveButton]}
                      onPress={() => approveListing(listing.id)}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                      <Text style={styles.actionButtonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => rejectListing(listing.id)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                      <Text style={styles.actionButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {listing.status === 'approved' && (
                  <View style={styles.listingActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => rejectListing(listing.id)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                      <Text style={styles.actionButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {listing.status === 'rejected' && (
                  <View style={styles.listingActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.approveButton]}
                      onPress={() => approveListing(listing.id)}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                      <Text style={styles.actionButtonText}>Approve</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
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
  content: {
    flex: 1,
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  filterButtonActive: {
    backgroundColor: '#2E7D32',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listingsContainer: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  listingCard: {
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
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  listingUser: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  listingEmail: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  imagesContainer: {
    marginBottom: 12,
  },
  listingImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  listingDetails: {
    marginBottom: 12,
  },
  listingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  listingMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  listingDate: {
    fontSize: 12,
    color: '#999',
  },
  listingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

