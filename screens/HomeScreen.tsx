import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { getProducts, getUserImpact, addToCart } from '../supabase';
import { toast } from 'sonner-native';

const categories = [
  { id: '1', name: 'Living Room', icon: 'home-outline' },
  { id: '2', name: 'Dining', icon: 'restaurant-outline' },
  { id: '3', name: 'Bedroom', icon: 'bed-outline' },
  { id: '4', name: 'Office', icon: 'desktop-outline' },
];

// Sample featured products (will be replaced with Supabase data)
const sampleFeaturedProducts = [
  {
    id: '1',
    name: 'Vintage Leather Sofa',
    price: 599.99,
    image: 'https://api.a0.dev/assets/image?text=vintage%20leather%20sofa%20comfortable%20elegant&aspect=4:3',
    category: 'Living Room',
  },
  {
    id: '2',
    name: 'Mid-Century Dining Table',
    price: 399.99,
    image: 'https://api.a0.dev/assets/image?text=mid%20century%20wooden%20dining%20table%20restored&aspect=4:3',
    category: 'Dining',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [impact, setImpact] = useState({ trees_saved: 0, carbon_reduced: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load products from Supabase
        const products = await getProducts();
        setFeaturedProducts(products.slice(0, 4)); // Get first 4 products for featured section
        
        // Load user impact data if user is logged in
        if (user) {
          const userId = (user as any).id || (user as any).uid;
          const userImpact = await getUserImpact(userId);
          setImpact(userImpact || { trees_saved: 0, carbon_reduced: 0 });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  const navigateToCategory = (category) => {
    navigation.navigate('ProductList', { category });
  };

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = async (product: any) => {
    try {
      if (!user) {
        toast.error('Please login to add items to cart');
        return;
      }
      const userId = (user as any).id || (user as any).uid;
      // Support different product shapes for newly added items
      const productId = product?.id || product?.product_id || product?.uuid || product?.pk;
      if (!productId) {
        console.warn('AddToCart: missing product id on product', product);
        toast.error('Cannot add this item: missing product id');
        return;
      }
      const res = await addToCart(userId, productId, 1);
      if (!res) {
        toast.error('Failed to add to cart');
        return;
      }
      toast.success('Added to cart');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>RefurbFinder</Text>
          <TouchableOpacity onPress={() => (navigation.getParent() as any)?.navigate?.('CartStack')}>
            <Ionicons name="cart-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>RefurbFinder</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => (navigation.getParent() as any)?.navigate?.('ProfileStack')}
          >
            <Ionicons name="person-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => (navigation.getParent() as any)?.navigate?.('CartStack')}
          >
            <Ionicons name="cart-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Sustainable Furniture</Text>
          <Text style={styles.heroSubtitle}>Beautifully restored pieces for your home</Text>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigateToCategory('All Products')}
          >
            <View style={styles.categoryIconContainer}>
              <Ionicons name="grid-outline" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.categoryName}>All</Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigateToCategory(category.name)}
            >
              <View style={styles.categoryIconContainer}>
                <Ionicons name={category.icon} size={24} color="#2E7D32" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {user && (
          <View style={styles.impactSection}>
            <Text style={styles.impactTitle}>Your Environmental Impact</Text>
            <View style={styles.impactStats}>
              <View style={styles.impactItem}>
                <Ionicons name="leaf" size={24} color="#2E7D32" />
                <Text style={styles.impactValue}>{impact.trees_saved}</Text>
                <Text style={styles.impactLabel}>Trees Saved</Text>
              </View>
              <View style={styles.impactItem}>
                <Ionicons name="cloud-outline" size={24} color="#2E7D32" />
                <Text style={styles.impactValue}>{impact.carbon_reduced}kg</Text>
                <Text style={styles.impactLabel}>CO₂ Reduced</Text>
              </View>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Featured Products</Text>
        {featuredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigateToProductDetail(product)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              
              <View style={styles.ecoImpactContainer}>
                <View style={styles.ecoImpactItem}>
                  <Ionicons name="leaf" size={14} color="#2E7D32" />
                  <Text style={styles.ecoImpactText}>
                    {product.trees_saved || 0} {product.trees_saved === 1 ? 'tree' : 'trees'}
                  </Text>
                </View>
                <View style={styles.ecoImpactItem}>
                  <Ionicons name="cloud-outline" size={14} color="#2E7D32" />
                  <Text style={styles.ecoImpactText}>{product.carbon_reduced || 0}kg CO₂</Text>
                </View>
              </View>
              
              <View style={styles.productActionsRow}>
                <TouchableOpacity 
                  style={styles.vrButton}
                  onPress={() => navigation.navigate('VRView', { product })}
                >
                  <Ionicons name="cube-outline" size={20} color="white" />
                  <Text style={styles.vrButtonText}>View in VR</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.addCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Ionicons name="cart" size={20} color="white" />
                  <Text style={styles.addCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  impactSection: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 4,
  },
  impactLabel: {
    fontSize: 14,
    color: '#333',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    marginTop: 4,
  },
  ecoImpactContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },
  ecoImpactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  ecoImpactText: {
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 4,
  },
  vrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  vrButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  productActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  addCartText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});