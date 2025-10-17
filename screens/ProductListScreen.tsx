import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getProducts } from '../supabase';
import { toast } from 'sonner-native';

// Type-safe wrapper for getProducts from JS module
const getProductsSafe = getProducts as unknown as (category?: string | null) => Promise<any[]>;

// Sample products data (will be replaced with Supabase data)
const sampleProducts = [
  {
    id: '1',
    name: 'Vintage Leather Sofa',
    price: 599.99,
    image: 'https://api.a0.dev/assets/image?text=vintage%20leather%20sofa%20comfortable%20elegant&aspect=4:3',
    category: 'Living Room',
    eco_impact: {
      trees_saved: 2,
      carbon_reduced: 45
    }
  },
  {
    id: '2',
    name: 'Mid-Century Dining Table',
    price: 399.99,
    image: 'https://api.a0.dev/assets/image?text=mid%20century%20wooden%20dining%20table%20restored&aspect=4:3',
    category: 'Dining',
    eco_impact: {
      trees_saved: 1,
      carbon_reduced: 32
    }
  },
  {
    id: '3',
    name: 'Modern Office Chair',
    price: 249.99,
    image: 'https://api.a0.dev/assets/image?text=modern%20office%20chair%20comfortable%20ergonomic&aspect=4:3',
    category: 'Office',
    eco_impact: {
      trees_saved: 1.5,
      carbon_reduced: 28
    }
  },
  {
    id: '4',
    name: 'Vintage Bedroom Dresser',
    price: 349.99,
    image: 'https://api.a0.dev/assets/image?text=vintage%20bedroom%20dresser%20wooden&aspect=4:3',
    category: 'Bedroom',
    eco_impact: {
      trees_saved: 2.2,
      carbon_reduced: 38
    }
  },
];

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  sketchfab_id?: string;
  sketchfabModelUid?: string;
  trees_saved?: number;
  carbon_reduced?: number;
};

type ListRouteParams = {
  category?: string;
};

export default function ProductListScreen({ route }: { route?: { params?: ListRouteParams } }) {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fix for route.params undefined - use default category or get from params
  const category = route?.params?.category || 'All Products';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Load products from Supabase
        const fetchedProducts = await getProductsSafe(category !== 'All Products' ? category : null);
        setProducts((fetchedProducts || []) as Product[]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
        setProducts([]);
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [category]);
  
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        
        <View style={styles.ecoImpactContainer}>
          <View style={styles.ecoImpactItem}>
            <Ionicons name="leaf" size={14} color="#2E7D32" />
            <Text style={styles.ecoImpactText}>
              {item.trees_saved || 0} {item.trees_saved === 1 ? 'tree' : 'trees'}
            </Text>
          </View>
          <View style={styles.ecoImpactItem}>
            <Ionicons name="cloud-outline" size={14} color="#2E7D32" />
            <Text style={styles.ecoImpactText}>{item.carbon_reduced || 0}kg CO₂</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.vrButton}
          onPress={() => navigation.navigate('VRView', { product: item, modelUid: item.sketchfab_id || item.sketchfabModelUid, productId: item.id })}
        >
          <Ionicons name="cube-outline" size={20} color="white" />
          <Text style={styles.vrButtonText}>View in VR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyText}>No products found</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse All Products</Text>
          </TouchableOpacity>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '80%',
  },
  browseButtonText: {
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
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
});