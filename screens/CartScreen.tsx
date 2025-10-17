import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { AuthContext } from '../App';
import { getCartItems, updateCartItemQuantity, removeFromCart, createOrder } from '../supabase';

// Sample cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Vintage Leather Sofa',
    price: 599.99,
    image: 'https://api.a0.dev/assets/image?text=vintage%20leather%20sofa%20comfortable%20elegant&aspect=4:3',
    quantity: 1,
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
    quantity: 1,
    eco_impact: {
      trees_saved: 1,
      carbon_reduced: 32
    }
  }
];

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadCartItems = async () => {
      if (!user) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }
      
      try {
        const userId = (user as any).id || (user as any).uid;
        const items = await getCartItems(userId);
        setCartItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cart items:', error);
        toast.error('Failed to load cart items');
        setIsLoading(false);
      }
    };
    
    loadCartItems();
  }, [user, isFocused]);

  const handleUpdateQuantity = async (id: string, change: number) => {
    if (!user) return;
    
    try {
      const item = cartItems.find((item: any) => item.id === id);
      if (!item) return;
      
      const newQuantity = Math.max(1, item.quantity + change);
      
      await updateCartItemQuantity(id, newQuantity);
      
      setCartItems(cartItems.map((item: any) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (id: string) => {
    if (!user) return;
    try {
      if (Platform.OS === 'web') {
        await removeFromCart((user as any).id || (user as any).uid, id);
        setCartItems(cartItems.filter((item: any) => item.id !== id));
        toast.success('Item removed from cart');
        return;
      }
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: async () => {
            try {
              await removeFromCart((user as any).id || (user as any).uid, id);
              setCartItems(cartItems.filter((item: any) => item.id !== id));
              toast.success('Item removed from cart');
            } catch (e) {
              console.error('Error removing item:', e);
              toast.error('Failed to remove item');
            }
          } }
        ]
      );
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.product ? item.product.price : 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const calculateEnvironmentalImpact = () => {
    return {
      trees_saved: cartItems.reduce((sum, item) => {
        const treesSaved = item.product ? item.product.trees_saved || 0 : 0;
        return sum + (treesSaved * item.quantity);
      }, 0),
      carbon_reduced: cartItems.reduce((sum, item) => {
        const carbonReduced = item.product ? item.product.carbon_reduced || 0 : 0;
        return sum + (carbonReduced * item.quantity);
      }, 0)
    };
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    try {
      const order = {
        user_id: user.uid,
        status: 'pending',
        total_amount: calculateTotal(),
        shipping_address: { address: '123 Main St', city: 'Example City', zip: '12345' }
      };
      
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      await createOrder(order, orderItems);
      
      toast.success("Order placed successfully!");
      setCartItems([]);
      
      // Navigate to a success screen or back to home
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order');
    }
  };

  const renderCartItem = ({ item }: { item: any }) => {
    const product = item.product || {} as any;
    
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: product.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{product.name}</Text>
          {!!product.description && (
            <Text style={styles.itemDescription} numberOfLines={2}>
              {product.description}
            </Text>
          )}
          <Text style={styles.itemPrice}>${product.price}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => handleUpdateQuantity(item.id, -1)}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={18} color="#2E7D32" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity 
              onPress={() => handleUpdateQuantity(item.id, 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={18} color="#2E7D32" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => handleRemoveItem(item.id)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={22} color="#FF5252" />
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const impact = calculateEnvironmentalImpact();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />
          
          <View style={styles.environmentalImpact}>
            <Text style={styles.impactTitle}>Your Environmental Impact</Text>
            <View style={styles.impactStats}>
              <View style={styles.impactItem}>
                <Ionicons name="leaf" size={24} color="#2E7D32" />
                <Text style={styles.impactValue}>{impact.trees_saved.toFixed(1)}</Text>
                <Text style={styles.impactLabel}>Trees Saved</Text>
              </View>
              <View style={styles.impactItem}>
                <Ionicons name="cloud-outline" size={24} color="#2E7D32" />
                <Text style={styles.impactValue}>{impact.carbon_reduced.toFixed(1)}kg</Text>
                <Text style={styles.impactLabel}>CO₂ Reduced</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>${calculateTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTextBold}>Total</Text>
              <Text style={styles.summaryValueBold}>${calculateTotal().toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => (navigation.getParent() as any)?.navigate?.('HomeStack') || navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
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
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  environmentalImpact: {
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
  summary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  summaryTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValueBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  checkoutButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '80%',
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});