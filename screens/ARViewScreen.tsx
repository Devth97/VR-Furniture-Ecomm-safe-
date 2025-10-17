import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function ARViewScreen({ route }) {
  const navigation = useNavigation();
  const { product } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  // Get furniture model URL based on product type
  const getFurnitureModelUrl = () => {
    // These are sample furniture GLB models - replace with actual furniture models
    const modelMap = {
      sofa: "https://modelviewer.dev/shared-assets/models/Sofa.glb",
      chair: "https://modelviewer.dev/shared-assets/models/Chair.glb", 
      table: "https://modelviewer.dev/shared-assets/models/Table.glb",
      default: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
    };
    
    // Determine model type from product name
    const type = product.name.toLowerCase();
    if (type.includes('sofa')) return modelMap.sofa;
    if (type.includes('chair')) return modelMap.chair;
    if (type.includes('table')) return modelMap.table;
    return modelMap.default;
  };

  // Using Model Viewer for web and iOS compatibility
  const modelViewerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <style>
          body { margin: 0; }
          model-viewer {
            width: 100vw;
            height: 100vh;
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <model-viewer
          src="${getFurnitureModelUrl()}"
          alt="${product.name}"
          auto-rotate
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          shadow-intensity="1"
          exposure="1"
          style="width: 100%; height: 100%">
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AR Preview: {product.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.webContainer}>
          <Text style={styles.webMessage}>
            For the best AR experience, please open this app on your mobile device.
          </Text>
          <Image 
            source={{ uri: product.image }} 
            style={styles.placeholderImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <WebView
          source={{ html: modelViewerHtml }}
          onLoadEnd={() => setIsLoading(false)}
          style={styles.webview}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
        />
      )}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading AR experience...</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="resize" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="sync" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton}>
          <Ionicons name="camera" size={32} color="#2E7D32" />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  webMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholderImage: {
    width: '100%',
    height: 300,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '600',
  },
});