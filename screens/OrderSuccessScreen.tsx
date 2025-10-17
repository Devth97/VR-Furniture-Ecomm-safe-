import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OrderSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { orderId, total } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={64} color="#2E7D32" />
        </View>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>Thank you for choosing sustainable furniture.</Text>
        {!!orderId && <Text style={styles.orderId}>Order ID: {orderId}</Text>}
        {!!total && <Text style={styles.total}>Total: ${Number(total).toFixed(2)}</Text>}

        <TouchableOpacity style={styles.primaryButton} onPress={() => (navigation.getParent() as any)?.navigate?.('HomeStack') || navigation.navigate('Home')}>
          <Text style={styles.primaryText}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => (navigation.getParent() as any)?.navigate?.('ProfileStack') || navigation.navigate('Profile')}>
          <Text style={styles.secondaryText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 24, width: '100%', maxWidth: 560, alignItems: 'center' },
  iconCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 12, textAlign: 'center' },
  orderId: { fontSize: 12, color: '#999', marginBottom: 4 },
  total: { fontSize: 16, color: '#333', marginBottom: 16 },
  primaryButton: { backgroundColor: '#2E7D32', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  primaryText: { color: 'white', fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#EFF5EF', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  secondaryText: { color: '#2E7D32', fontWeight: '600' },
});


