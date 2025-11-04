import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { addToCart } from '../supabase';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  sketchfab_id?: string;
  sketchfabModelUid?: string;
  trees_saved?: number;
  carbon_reduced?: number;
};

type DetailRouteParams = {
  product?: Product;
  productId?: string;
};

export default function ProductDetailScreen({ route }: { route?: { params?: DetailRouteParams } }) {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const { product } = route?.params || { product: { name: 'Sample Product', price: 0, image: 'https://api.a0.dev/assets/image?text=furniture&aspect=4:3' } } as { product: Product };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        toast.error('Please login to add items to cart');
        return;
      }
      if (isAdding) return;
      setIsAdding(true);

      const userId = (user as any).id || (user as any).uid;
      const productId = (product as any)?.id || (product as any)?.product_id || (product as any)?.uuid || (product as any)?.pk;
      if (!productId) {
        console.warn('AddToCart: missing product id on product', product);
        toast.error('Cannot add this item: missing product id');
        return;
      }
      console.log('AddToCart start', { userId, productId, price: product.price, qty: 1 });

      const res = await addToCart(userId, productId, 1);
      console.log('AddToCart response', res);

      if (!res) {
        toast.error('Failed to add to cart (no response)');
        return;
      }

      toast.success('Added to cart');
      // Non-blocking navigate to Cart so user sees update
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate('Cart');
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => (navigation.getParent() as any)?.navigate?.('CartStack')}>
          <Ionicons name="cart-outline" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          
          <View style={styles.environmentalImpact}>
            <Text style={styles.impactTitle}>Environmental Impact</Text>
            <View style={styles.impactStats}>
              <View style={styles.impactItem}>
                <Ionicons name="leaf" size={24} color="#2E7D32" />
                <Text style={styles.impactText}>
                  {product.trees_saved || 0} {product.trees_saved === 1 ? 'tree' : 'trees'} saved
                </Text>
              </View>
              <View style={styles.impactItem}>
                <Ionicons name="cloud-outline" size={24} color="#2E7D32" />
                <Text style={styles.impactText}>{product.carbon_reduced || 0}kg CO₂ reduced</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description || 'This beautifully refurbished piece brings both history and sustainability to your home. Each item is carefully restored by skilled craftsmen using eco-friendly materials and processes.'}
          </Text>
          
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
              <Text style={styles.featureText}>Refurbished with sustainable materials</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
              <Text style={styles.featureText}>Original character preserved</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
              <Text style={styles.featureText}>1-year quality guarantee</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
              <Text style={styles.featureText}>Free delivery</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            {((product?.sketchfab_id || product?.sketchfabModelUid)?.trim?.()) && (
              <TouchableOpacity 
                style={styles.vrButton}
                onPress={() => navigation.navigate('VRView', { product, modelUid: product.sketchfab_id || product.sketchfabModelUid, productId: product.id })}
              >
                <Ionicons name="cube-outline" size={20} color="white" />
                <Text style={styles.vrButtonText}>View in 3D/VR</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.addToCartButton, { opacity: isAdding ? 0.7 : 1 }]}
              onPress={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <Ionicons name="hourglass" size={20} color="white" />
                  <Text style={styles.addToCartText}>Adding...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="cart" size={20} color="white" />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </>
              )}
            </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 16,
  },
  environmentalImpact: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactText: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vrButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  vrButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  addToCartText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
});