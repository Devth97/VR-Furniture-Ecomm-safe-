import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

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

type VRRouteParams = {
  product?: Product;
  modelUid?: string;
  productId?: string;
  token?: string; // not used for public models, but accepted gracefully
};

export default function VRViewScreen({ route }: { route?: { params?: VRRouteParams } }) {
  const navigation = useNavigation();
  const { product, modelUid, productId, token } = route?.params || {};
  const [isLoading, setIsLoading] = useState(true);

  const resolvedModelUid = useMemo(() => {
    return (
      modelUid || product?.sketchfab_id || product?.sketchfabModelUid || '40324c1abf0e4c62a3989243f1124870'
    );
  }, [modelUid, product]);

  const resolvedTitle = product?.name || '3D Preview';

  const buildEmbedUrl = useMemo(() => {
    const base = `https://sketchfab.com/models/${resolvedModelUid}/embed`;
    const params = new URLSearchParams({
      autostart: '1',
      ui_controls: '1',
      ui_infos: '0',
      ui_watermark: '0',
      ui_stop: '0',
      preload: '1',
    });
    // Public models don't need a token; if provided, append but it's optional
    if (token) {
      params.set('api_access_token', token);
    }
    return `${base}?${params.toString()}`;
  }, [resolvedModelUid, token]);

  // Using Sketchfab embed for web and mobile compatibility
  const sketchfabHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { margin: 0; overflow: hidden; background: #F5F5F5; }
          iframe {
            width: 100vw;
            height: ${Platform.OS === 'web' ? '70vh' : '100vh'};
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe
          src="${buildEmbedUrl}"
          title="${resolvedTitle}"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
        ></iframe>
      </body>
    </html>
  `;

  const handleBuyNow = () => {
    if (product?.id) {
      // Go back to product detail explicitly using replace
      // @ts-ignore - allow cross-stack navigation by name
      navigation.replace('ProductDetail', { product });
    } else if (productId) {
      // If only productId is available, navigate with id
      // @ts-ignore
      navigation.replace('ProductDetail', { productId });
    } else {
      // As a fallback, go to the Cart tab
      // @ts-ignore
      navigation.navigate('CartStack');
    }
  };

  const handleClose = () => {
    // Use replace to avoid stacking ProductDetail screens
    if (product?.id) {
      // @ts-ignore
      navigation.replace('ProductDetail', { product });
    } else {
      // @ts-ignore
      navigation.navigate('Home');
    }
  };

  const hasModel = Boolean(resolvedModelUid);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>3D/VR Preview</Text>
        <View style={{ width: 24 }} />
      </View>

      {hasModel ? (
        Platform.OS === 'web' ? (
          <View style={styles.webContainer}>
            <iframe
              src={buildEmbedUrl}
              title={resolvedTitle}
              style={{
                width: '100%',
                height: '70vh',
                border: 'none',
                backgroundColor: '#F5F5F5'
              }}
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </View>
        ) : (
          <WebView
            source={{ html: sketchfabHtml }}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            style={styles.webview}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            allowsFullscreenVideo
          />
        )
      ) : (
        <View style={[styles.webContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="cube-outline" size={48} color="#9E9E9E" />
          <Text style={{ marginTop: 12, color: '#666' }}>3D model not available for this product.</Text>
        </View>
      )}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading VR experience...</Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    // Do not block interactions with the 3D canvas while loading text is visible
    pointerEvents: 'none',
  },
  loadingText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '600',
  },
});