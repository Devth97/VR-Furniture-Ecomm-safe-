import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../App';

type LoginScreenProps = {};

export default function LoginScreen({}: LoginScreenProps) {
  const authContext = useContext(AuthContext);
  const { login, signup, resetPassword, googleLogin } = authContext;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Check for expired reset link error on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      if (hash.includes('error=access_denied') && hash.includes('otp_expired')) {
        setError('Password reset link has expired. Please request a new one.');
        // Clear the error from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const validateForm = () => {
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (isSignUp && !name) {
      setError('Name is required for signup');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const result = await login(email, password);
      setIsLoading(false);
      
      if (!result.success) {
        setError(result.error || "Login failed. Please try again.");
      }
    }
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const result = await signup(email, password, name);
      setIsLoading(false);
      
      if (!result.success) {
        setError(result.error || "Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await googleLogin();
    setIsLoading(false);
    
    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }

    resetPassword(email)
      .then(result => {
        if (result.success) {
          Alert.alert(
            "Password Reset Email Sent", 
            "Check your email for instructions to reset your password."
          );
        } else {
          setError(result.error || "Failed to send password reset email");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Image 
              source={{ uri: "https://api.a0.dev/assets/image?text=RefurbFinder&aspect=1:1&seed=123" }} 
              style={styles.logo}
            />
            <Text style={styles.title}>RefurbFinder</Text>
            <Text style={styles.subtitle}>Sustainable furniture at your fingertips</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={18} color="#d32f2f" />
                <Text style={styles.errorText}>{error}</Text>
                {error.includes('expired') && (
                  <TouchableOpacity 
                    style={styles.requestNewLinkButton}
                    onPress={() => {
                      if (email) {
                        resetPassword(email);
                      } else {
                        setError('Please enter your email first, then request a new reset link.');
                      }
                    }}
                  >
                    <Text style={styles.requestNewLinkText}>Request New Reset Link</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
            
            {isSignUp && (
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            {!isSignUp && (
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.authButton} 
              onPress={isSignUp ? handleSignup : handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.authButtonText}>
                  {isSignUp ? 'Sign Up' : 'Log In'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity 
                style={[styles.socialButton, styles.googleButton]} 
                onPress={handleGoogleLogin}
                disabled={isLoading}
              >
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.switchModeContainer}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
          >
            <Text style={styles.switchModeText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.switchModeHighlight}>
                {isSignUp ? 'Log In' : 'Sign Up'}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.environmentalImpactContainer}>
            <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
            <Text style={styles.environmentalImpactText}>
              Join our community and help reduce furniture waste
            </Text>
          </View>
          
          {/* Demo quick login button */}
          {!isSignUp && (
            <TouchableOpacity 
              style={styles.demoLoginButton}
              onPress={() => login('demo@refurbfinder.com', 'password123')}
            >
              <Text style={styles.demoLoginText}>Quick Demo Login</Text>
            </TouchableOpacity>
          )}
          
          {/* Temporary debug button */}
          <TouchableOpacity 
            style={[styles.demoLoginButton, { marginTop: 10 }]}
            onPress={() => authContext.forceLogout()}
          >
            <Text style={styles.demoLoginText}>Force Logout (Debug)</Text>
          </TouchableOpacity>
          
          {/* Manual logout button */}
          <TouchableOpacity 
            style={[styles.demoLoginButton, { marginTop: 10 }]}
            onPress={async () => {
              try {
                const result = await authContext.logout();
                console.log('Manual logout result:', result);
              } catch (error) {
                console.error('Manual logout error:', error);
              }
            }}
          >
            <Text style={styles.demoLoginText}>Manual Logout (Debug)</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginLeft: 5,
  },
  requestNewLinkButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#2E7D32',
    borderRadius: 4,
    alignItems: 'center',
  },
  requestNewLinkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#F9F9F9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  authButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  switchModeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 14,
    color: '#666',
  },
  switchModeHighlight: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  environmentalImpactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  environmentalImpactText: {
    marginLeft: 5,
    color: '#2E7D32',
    fontSize: 12,
  },
  demoLoginButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  demoLoginText: {
    color: '#2E7D32',
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});