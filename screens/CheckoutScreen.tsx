import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { getCartItems, createOrder, clearCart } from '../supabase';
import { toast } from 'sonner-native';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [placing, setPlacing] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) {
          toast.error('Please login to checkout');
          // @ts-ignore
          navigation.navigate('Login');
          return;
        }
        const userId = (user as any).id || (user as any).uid;
        const items = await getCartItems(userId);
        setCartItems(items || []);
      } catch (e) {
        console.error('Checkout load error', e);
        toast.error('Failed to load cart');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.product ? item.product.price : 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const canPlace = useMemo(() => {
    return (
      fullName.trim().length > 1 &&
      phone.trim().length >= 8 &&
      address.trim().length > 5 &&
      city.trim().length > 1 &&
      state.trim().length > 1 &&
      zip.trim().length >= 4 &&
      cartItems.length > 0
    );
  }, [fullName, phone, address, city, state, zip, cartItems]);

  const placeOrder = async () => {
    try {
      if (!user) return;
      if (!canPlace) {
        toast.error('Please fill all shipping details');
        return;
      }
      setPlacing(true);
      const userId = (user as any).id || (user as any).uid; // prefer .id; Supabase web SDK provides id

      const shippingDetails = { address } as any; // backend only expects shipping_address
      const order = await createOrder(userId, cartItems, shippingDetails);
      if (!order) {
        toast.error('Failed to place order');
        setPlacing(false);
        return;
      }

      await clearCart(userId);
      toast.success('Order placed! Payment Method: Cash on Delivery');
      // @ts-ignore
      navigation.navigate('OrderSuccess', { orderId: order.id, total: subtotal });
    } catch (e: any) {
      console.error('placeOrder error', e);
      const message = e?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setPlacing(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loading}> 
          <ActivityIndicator size="large" color="#2E7D32" />
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>
          <TextInput style={styles.input} placeholder="Full name" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.half]} placeholder="City" value={city} onChangeText={setCity} />
            <TextInput style={[styles.input, styles.half]} placeholder="State" value={state} onChangeText={setState} />
          </View>
          <TextInput style={styles.input} placeholder="ZIP / Postal Code" keyboardType="number-pad" value={zip} onChangeText={setZip} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.codCard}>
            <Ionicons name="cash-outline" size={22} color="#2E7D32" />
            <Text style={styles.codText}>Cash on Delivery (COD)</Text>
          </View>
          <Text style={styles.note}>Pay in cash to the courier upon delivery. No online payments required.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items</Text>
            <Text style={styles.summaryValue}>{cartItems.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={styles.summaryRowTotal}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.placeOrderButton, { opacity: placing || !canPlace ? 0.7 : 1 }]}
          disabled={placing || !canPlace}
          onPress={placeOrder}
        >
          {placing ? (
            <Text style={styles.placeOrderText}>Placing Order...</Text>
          ) : (
            <Text style={styles.placeOrderText}>Place Order (COD)</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16 },
  section: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginBottom: 12 },
  input: { backgroundColor: '#F7FAF7', borderWidth: 1, borderColor: '#DDEBDD', padding: 12, borderRadius: 8, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  codCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8 },
  codText: { marginLeft: 8, color: '#2E7D32', fontWeight: '600' },
  note: { color: '#666', fontSize: 12, marginTop: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryRowTotal: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  summaryLabel: { color: '#666' },
  summaryValue: { color: '#333' },
  summaryTotal: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  summaryTotalValue: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  footer: { backgroundColor: 'white', padding: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  placeOrderButton: { backgroundColor: '#2E7D32', borderRadius: 10, padding: 16, alignItems: 'center' },
  placeOrderText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});


