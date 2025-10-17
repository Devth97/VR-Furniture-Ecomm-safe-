import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { AuthContext } from '../App';
import { createListing, deleteListing, getListingsForUser, updateListing, uploadListingImages } from '../supabase';

type Listing = {
  id: string;
  user_id: string;
  title: string;
  location_text?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  image_urls: string[];
  status: 'submitted' | 'under_review' | 'approved' | 'purchased' | 'rejected';
  history?: { status: string; at: string; note?: string }[];
  created_at?: string;
};

export default function SellFurnitureScreen() {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (!user) {
      navigation.goBack();
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        const res = await getListingsForUser(user.id || user.uid);
        setListings(res || []);
      } catch (e) {
        console.error('Failed to load listings', e);
        toast.error('Failed to load your listings');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.error('Location permission denied');
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      toast.success('Location captured');
    } catch (e) {
      console.error('location error', e);
      toast.error('Failed to get location');
    }
  };

  const pickImages = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web fallback using invisible file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        (input as any).multiple = true;
        input.onchange = async () => {
          const files = Array.from((input.files || []) as any);
          if (files.length === 0) return;
          const assets: any[] = await Promise.all(files.map(async (file: any) => {
            const uri = URL.createObjectURL(file);
            return { uri, file, width: 0, height: 0, type: 'image' };
          }));
          setImages(prev => [...prev, ...assets]);
        };
        input.click();
        return;
      }
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        toast.error('Photos permission denied');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });
      if (!result.canceled) {
        const selected = (result as any).assets || [];
        setImages(prev => [...prev, ...selected]);
      }
    } catch (e) {
      console.error('image pick error', e);
      toast.error('Failed to select images');
    }
  };

  const captureImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        toast.error('Camera permission denied');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
      if (!result.canceled) {
        const asset = (result as any).assets?.[0];
        if (asset) setImages(prev => [...prev, asset]);
      }
    } catch (e) {
      console.error('camera error', e);
      toast.error('Failed to capture image');
    }
  };

  const validatePhone = (value: string) => {
    // Simple E.164-like check: digits, allow +, 7-15 chars
    const cleaned = value.replace(/\s|-/g, '');
    return /^\+?\d{7,15}$/.test(cleaned);
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!validatePhone(phone)) {
      toast.error('Enter a valid phone number');
      return;
    }
    if (images.length === 0) {
      toast.error('Please add at least one photo');
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images to Supabase Storage
      const uploadedUrls = await uploadListingImages(user.id || user.uid, images);

      // Save record with RLS fields
      const listing = await createListing({
        title: title.trim(),
        phone: phone.trim(),
        location_text: locationText.trim() || null,
        latitude: coords?.latitude || null,
        longitude: coords?.longitude || null,
        image_urls: uploadedUrls,
      });
      if (!listing) throw new Error('Failed to create listing');

      toast.success('Listing submitted! We will review and contact you.');
      setTitle('');
      setPhone('');
      setLocationText('');
      setCoords(null);
      setImages([]);

      const res = await getListingsForUser(user.id || user.uid);
      setListings(res || []);
    } catch (e: any) {
      console.error('submit listing error', e);
      toast.error(e?.message || 'Failed to submit listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await deleteListing(id);
          setListings(prev => prev.filter(l => l.id !== id));
          toast.success('Listing deleted');
        } catch (e) {
          console.error('delete error', e);
          toast.error('Failed to delete');
        }
      } },
    ]);
  };

  const canSubmit = title.trim().length > 0 && validatePhone(phone) && images.length > 0 && !isSubmitting;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.infoText}>Please login to sell furniture.</Text>
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
        <Text style={styles.headerTitle}>Sell Your Furniture</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <View style={styles.photoRow}>
          {images.map((img, idx) => (
            <View key={idx} style={styles.photoItem}>
              <Image source={{ uri: img.uri }} style={styles.photo} />
              <TouchableOpacity style={styles.removePhoto} onPress={() => setImages(prev => prev.filter((_, i) => i !== idx))}>
                <Ionicons name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addPhoto} onPress={pickImages}>
            <Ionicons name="images-outline" size={24} color="#2E7D32" />
            <Text style={styles.addPhotoText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto} onPress={captureImage}>
            <Ionicons name="camera-outline" size={24} color="#2E7D32" />
            <Text style={styles.addPhotoText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Title</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Short title/description"
            style={styles.input}
          />
        </View>

        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={locationText}
            onChangeText={setLocationText}
            placeholder="City, Area (optional)"
            style={styles.input}
          />
          <TouchableOpacity style={styles.inlineButton} onPress={requestLocation}>
            <Ionicons name="navigate-outline" size={18} color="#2E7D32" />
            <Text style={styles.inlineButtonText}>{coords ? 'Location set' : 'Use current location'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Phone Number</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="e.g., +11234567890"
            style={styles.input}
          />
          {!!phone && !validatePhone(phone) && (
            <Text style={styles.validationText}>Enter a valid phone number</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { opacity: canSubmit ? 1 : 0.6 }]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Listing</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Listings</Text>
        {isLoading ? (
          <View style={styles.center}><ActivityIndicator color="#2E7D32" /></View>
        ) : listings.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="cube-outline" size={48} color="#9E9E9E" />
            <Text style={styles.infoText}>No listings yet</Text>
          </View>
        ) : (
          listings.map((l) => (
            <View key={l.id} style={styles.listingCard}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                {(l.image_urls || []).map((u, i) => (
                  <Image key={i} source={{ uri: u }} style={styles.listingThumb} />
                ))}
              </ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listingTitle}>{l.title}</Text>
                  <Text style={styles.statusBadge(l.status)}>{l.status.replace('_', ' ')}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('ProductDetail') /* placeholder for edit modal/screen */}>
                    <Ionicons name="create-outline" size={20} color="#2E7D32" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleDelete(l.id)}>
                    <Ionicons name="trash-outline" size={20} color="#FF5252" />
                  </TouchableOpacity>
                </View>
              </View>
              {!!l.history?.length && (
                <View style={{ marginTop: 8 }}>
                  {l.history.map((h, i) => (
                    <Text key={i} style={styles.historyText}>• {h.status} at {new Date(h.at).toLocaleString()}</Text>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  photoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  photoItem: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removePhoto: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 2,
  },
  addPhoto: {
    width: 90,
    height: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  addPhotoText: {
    color: '#2E7D32',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  inlineButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineButtonText: {
    color: '#2E7D32',
    marginLeft: 6,
    fontWeight: '600',
  },
  validationText: {
    color: '#FF5252',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#666',
    marginTop: 8,
  },
  emptyBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  listingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  listingThumb: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#EEE',
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: (status: string) => ({
    fontSize: 12,
    color: '#2E7D32',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
    textTransform: 'capitalize',
  }),
  historyText: {
    fontSize: 12,
    color: '#666',
  },
  iconBtn: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
});






