import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { AuthContext } from '../App';
import { getUserProfile, getUserImpact, getUserOrders } from '../supabase';

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.a0.dev/assets/image?text=JD&aspect=1:1',
  environmentalImpact: {
    trees_saved: 5,
    carbon_reduced: 120,
    waste_diverted: 45
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const authContext = useContext(AuthContext);
  const { user, logout, isAdmin } = authContext;
  const [profile, setProfile] = useState<any>(null);
  const [impact, setImpact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  
  // Debug AuthContext
  console.log('ProfileScreen - AuthContext:', {
    hasUser: !!user,
    userEmail: user?.email,
    hasLogoutFunction: typeof logout === 'function',
    authContextKeys: Object.keys(authContext || {})
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const userId = (user as any).id || (user as any).uid;
          // Load user profile from Supabase
          const userProfile = await getUserProfile(userId);
          setProfile(userProfile);
          
          // Load environmental impact data
          const userImpact = await getUserImpact(userId);
          setImpact(userImpact);

          // Load orders
          const userOrders = await getUserOrders(userId);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error loading user data:', error);
          toast.error('Failed to load profile data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);

  const handleLogout = () => {
    console.log('Logout button pressed');
    console.log('AuthContext logout function:', typeof logout);
    
    if (!logout) {
      console.error('Logout function is not available');
      toast.error("Logout function not available");
      return;
    }
    
    // Create a separate function for the logout action
    const performLogout = async () => {
      try {
        console.log('Starting logout process from Alert...');
        const result = await logout();
        console.log('Logout result from Alert:', result);
        
        if (result && result.success) {
          toast.success("Logged out successfully");
        } else {
          toast.error(result?.error || "Failed to logout");
        }
      } catch (error) {
        console.error('Logout error from Alert:', error);
        toast.error("An error occurred during logout");
      }
    };
    
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          onPress: performLogout
        }
      ]
    );
  };

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
        <View style={styles.notLoggedInContainer}>
          <Ionicons name="person-outline" size={80} color="#CCCCCC" />
          <Text style={styles.notLoggedInText}>You are not logged in</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login / Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image 
            source={{ 
              uri: user?.photoURL || 
                   profile?.avatar_url || 
                   `https://api.a0.dev/assets/image?text=${user?.displayName?.charAt(0) || 'U'}&aspect=1:1` 
            }} 
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.displayName || profile?.full_name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || profile?.email || ''}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Your Environmental Impact</Text>
          <View style={styles.impactStats}>
            <View style={styles.impactItem}>
              <Ionicons name="leaf" size={32} color="#2E7D32" />
              <Text style={styles.impactValue}>{impact?.trees_saved || profile?.total_trees_saved || 0}</Text>
              <Text style={styles.impactLabel}>Trees Saved</Text>
            </View>
            <View style={styles.impactItem}>
              <Ionicons name="cloud-outline" size={32} color="#2E7D32" />
              <Text style={styles.impactValue}>{impact?.carbon_reduced || profile?.total_carbon_reduced || 0}kg</Text>
              <Text style={styles.impactLabel}>CO₂ Reduced</Text>
            </View>
            <View style={styles.impactItem}>
              <Ionicons name="trash-outline" size={32} color="#2E7D32" />
              <Text style={styles.impactValue}>{impact?.waste_diverted || profile?.total_waste_diverted || 0}kg</Text>
              <Text style={styles.impactLabel}>Waste Diverted</Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Sell to Us</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('SellFurniture')}>
            <Ionicons name="cube-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Sell Your Furniture</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Your Orders</Text>
          {orders.length === 0 ? (
            <View style={{ padding: 16 }}>
              <Text style={{ color: '#666' }}>No orders yet.</Text>
            </View>
          ) : (
            orders.map((o) => (
              <TouchableOpacity key={o.id} style={styles.orderItem} activeOpacity={0.8}
                onPress={() => {/* Placeholder: show toast for now */ toast.info('Order details screen coming soon') }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderId}>Order #{String(o.id).slice(0, 8)}</Text>
                  <Text style={styles.orderMeta}>{new Date(o.created_at).toLocaleString()} • {o.items_count} items</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.orderAmount}>${Number(o.total_amount || 0).toFixed(2)}</Text>
                  <Text style={styles.orderStatus}>{o.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Admin Section - Only show for admin users */}
        {isAdmin && (
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Admin Panel</Text>
            
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => (navigation.getParent() as any)?.navigate?.('HomeStack', { screen: 'AdminDashboard' })}
          >
              <Ionicons name="shield-checkmark-outline" size={24} color="#2E7D32" />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Admin Dashboard</Text>
                <Text style={styles.settingSubtitle}>Overview and quick actions</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => (navigation.getParent() as any)?.navigate?.('HomeStack', { screen: 'AdminOrderManagement' })}
          >
              <Ionicons name="receipt-outline" size={24} color="#2E7D32" />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Manage Orders</Text>
                <Text style={styles.settingSubtitle}>View and update all orders</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => (navigation.getParent() as any)?.navigate?.('HomeStack', { screen: 'AdminListingsManagement' })}
          >
              <Ionicons name="cube-outline" size={24} color="#2E7D32" />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Manage Listings</Text>
                <Text style={styles.settingSubtitle}>Review furniture submissions</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="location-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Shipping Addresses</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="card-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="help-circle-outline" size={24} color="#2E7D32" />
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, styles.logoutItem]}
            onPress={async () => {
              try {
                const result = await logout();
                if (result && result.success) {
                  toast.success("Logged out successfully");
                } else {
                  toast.error(result?.error || "Failed to logout");
                }
              } catch (error) {
                console.error('Logout error:', error);
                toast.error("An error occurred during logout");
              }
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF5252" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notLoggedInText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '80%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  editButtonText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  impactSection: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginLeft: 16,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 8,
  },
  impactLabel: {
    fontSize: 14,
    color: '#333',
  },
  settingsSection: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    color: '#FF5252',
    marginLeft: 16,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderId: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  orderMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  orderAmount: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  orderStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textTransform: 'capitalize',
  },
});