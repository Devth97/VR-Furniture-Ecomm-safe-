import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabaseClient } from '../supabase';

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'checking' | 'ready' | 'done'>('checking');

  const parseAndSetSessionFromUrl = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        // For native, assume deep-linking has already provided a session
        setStatus('ready');
        return;
      }

      const url = window.location.href;
      const hash = window.location.hash || '';
      
      console.log('ResetPasswordScreen: Parsing URL:', url);
      console.log('ResetPasswordScreen: Hash:', hash);

      // Try access_token/refresh_token in URL hash
      const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('ResetPasswordScreen: Found tokens:', { accessToken: !!accessToken, refreshToken: !!refreshToken });

      if (accessToken && refreshToken) {
        console.log('ResetPasswordScreen: Setting session with tokens');
        const { error: setErr } = await supabaseClient.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (setErr) throw setErr;
        console.log('ResetPasswordScreen: Session set successfully');
        setStatus('ready');
        return;
      }

      // If using PKCE flow: use code parameter
      const searchParams = new URL(url).searchParams;
      const code = searchParams.get('code');
      if (code) {
        console.log('ResetPasswordScreen: Found code, exchanging for session');
        const { error: exchangeErr } = await supabaseClient.auth.exchangeCodeForSession(url);
        if (exchangeErr) throw exchangeErr;
        console.log('ResetPasswordScreen: Code exchanged successfully');
        setStatus('ready');
        return;
      }

      // Check if we have a valid session already (user might have clicked reset link while logged in)
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        console.log('ResetPasswordScreen: User already has valid session');
        setStatus('ready');
        return;
      }

      console.log('ResetPasswordScreen: No tokens found, allowing form anyway');
      // If neither found, still allow form but it may fail
      setStatus('ready');
    } catch (e: any) {
      console.error('ResetPasswordScreen: Error parsing URL:', e);
      setError(e?.message || 'Failed to validate reset link. Please request a new one.');
      setStatus('ready');
    }
  }, []);

  useEffect(() => {
    console.log('ResetPasswordScreen: Component mounted');
    parseAndSetSessionFromUrl();
  }, [parseAndSetSessionFromUrl]);

  const isStrongEnough = useMemo(() => {
    return newPassword.length >= 8;
  }, [newPassword]);

  const handleSubmit = async () => {
    setError(null);
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isStrongEnough) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error: updateErr } = await supabaseClient.auth.updateUser({ password: newPassword });
      if (updateErr) {
        throw updateErr;
      }
      setStatus('done');
      // Brief pause then route to Login
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate('Login');
      }, 1200);
    } catch (e: any) {
      setError(e?.message || 'Failed to update password. The link may be expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'checking') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color="#2E7D32" />
          <Text style={{ marginTop: 12, color: '#555' }}>Preparing password reset…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {status !== 'done' ? (
          <>
            <Text style={styles.instructions}>Enter a new password for your account.</Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={18} color="#b71c1c" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>New password</Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
                placeholder="At least 8 characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm new password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
                placeholder="Re-enter password"
              />
            </View>

            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Update Password</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.hint}>Ensure your browser tab came from the reset email link. If this fails, request a new link.</Text>
          </>
        ) : (
          <View style={styles.center}>
            <Ionicons name="checkmark-circle" size={48} color="#2E7D32" />
            <Text style={{ marginTop: 12, color: '#2E7D32', fontWeight: '600' }}>Password updated</Text>
            <Text style={{ marginTop: 4, color: '#555' }}>Redirecting to login…</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  content: { padding: 16 },
  instructions: { color: '#555', marginBottom: 16 },
  inputGroup: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#333', fontWeight: '600' },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: '#2E7D32',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: { marginLeft: 8, color: '#b71c1c' },
  hint: { marginTop: 10, color: '#666', fontSize: 12 },
});