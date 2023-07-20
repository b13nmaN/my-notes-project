import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import FormInput from '../components/FormInput';
import { auth } from '../config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.uid);
        // Redirect or navigate to the home screen
        navigation.navigate('AllNotes');
      } else {
        console.log('User is signed out');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User logged in:', user.uid);
        setError('');
        navigation.navigate('AllNotes');
        // Additional logic or navigation can be added here
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorMessage);
        setError(errorMessage);
      });
  };

  const handleRegister = () =>{
    navigation.navigate('SignUp')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FormInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <PrimaryButton
        title="Login"
        iconName="log-in-outline"
        onPress={handleLogin}
      />
      <Text style={styles.registerbtn} onPress={handleRegister}>Register</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  registerbtn:{
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;
