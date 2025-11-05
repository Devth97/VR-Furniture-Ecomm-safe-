import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { supabaseClient } from '../supabase';
import { toast } from 'sonner-native';

export default function AdminOrderManagementScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    try {
      setIsLoading(true);
      
      // Get all orders with order items count (omit joined user_profiles to avoid RLS join issues)
      const { data, error } = await supabaseClient
        .from('orders')
        .select(`
          id,
          status,
          total_amount,
          shipping_address,
          created_at,
          customer_name,
          user_id,
          order_items(
            quantity,
            price,
            product:products(id, name, image)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        return;
      }

      const ordersWithCount = (data || []).map(order => ({
        ...order,
        items_count: Array.isArray(order.order_items) ? order.order_items.length : 0,
        // User info omitted to prevent RLS join from hiding orders
        user_name: 'Customer',
        user_email: ''
      }));

      setOrders(ordersWithCount);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabaseClient
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
        toast.error('Failed to update order status');
        return;
      }

      toast.success('Order status updated');
      loadAllOrders(); // Reload orders
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'confirmed': return '#42A5F5';
      case 'shipped': return '#66BB6A';
      case 'delivered': return '#4CAF50';
      case 'cancelled': return '#EF5350';
      default: return '#9E9E9E';
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusCounts = () => {
    const counts = {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (navigation as any).navigate('ProfileStack')}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Management</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading orders...</Text>
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
        <Text style={styles.headerTitle}>Order Management</Text>
        <TouchableOpacity onPress={loadAllOrders}>
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
              { key: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed },
              { key: 'shipped', label: 'Shipped', count: statusCounts.shipped },
              { key: 'delivered', label: 'Delivered', count: statusCounts.delivered },
              { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
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

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>Order #{order.id.substring(0, 8)}...</Text>
                    <Text style={styles.customerName}>{order.customer_name || 'Customer'}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.orderDetails}>
                  <Text style={styles.orderDate}>
                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.orderAmount}>${order.total_amount.toFixed(2)}</Text>
                  <Text style={styles.orderItems}>{order.items_count} items</Text>
                  {/* Product preview (first item) */}
                  {Array.isArray(order.order_items) && order.order_items.length > 0 && (
                    <View style={styles.productPreviewRow}>
                      {/* simple square thumbnail using Image if URL exists */}
                      {/* We use a native Image to display product thumbnail if provided */}
                      {/* @ts-ignore React Native Image import is implicit in RN runtime */}
                      <img
                        src={order.order_items[0]?.product?.image || ''}
                        alt={order.order_items[0]?.product?.name || 'Product'}
                        style={styles.productImage as any}
                        onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.productName} numberOfLines={1}>
                          {order.order_items[0]?.product?.name || 'Product'}
                        </Text>
                        {order.order_items.length > 1 && (
                          <Text style={styles.moreItemsText}>+ {order.order_items.length - 1} more item(s)</Text>
                        )}
                      </View>
                    </View>
                  )}
                  {order.shipping_address && (
                    <Text style={styles.shippingAddress} numberOfLines={2}>
                      📍 {order.shipping_address}
                    </Text>
                  )}
                </View>

                <View style={styles.orderActions}>
                  {order.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.confirmButton]}
                        onPress={() => updateOrderStatus(order.id, 'confirmed')}
                      >
                        <Text style={styles.actionButtonText}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={() => updateOrderStatus(order.id, 'cancelled')}
                      >
                        <Text style={styles.actionButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.shipButton]}
                      onPress={() => updateOrderStatus(order.id, 'shipped')}
                    >
                      <Text style={styles.actionButtonText}>Mark as Shipped</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'shipped' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deliverButton]}
                      onPress={() => updateOrderStatus(order.id, 'delivered')}
                    >
                      <Text style={styles.actionButtonText}>Mark as Delivered</Text>
                    </TouchableOpacity>
                  )}
                </View>
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
  ordersContainer: {
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
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  customerEmail: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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
  orderDetails: {
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  shippingAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  productPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  productImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#EEE',
    objectFit: 'cover',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  moreItemsText: {
    fontSize: 12,
    color: '#777',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  shipButton: {
    backgroundColor: '#2196F3',
  },
  deliverButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

