import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import FormInput from '../components/FormInput';
import { auth, db } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection,addDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;

    // Add user name and email to Firestore database with user ID as the document ID
    const userData = {
      id: userId, 
      name,
      email,
    };

    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);
    console.log('User data added to Firestore with ID:', userId);

    // Create a sub-collection named "notes" inside the user document using the path
    const notesCollectionRef = collection(db, `users/${userId}/notes`);
    await addDoc(notesCollectionRef, {
      title: 'Sample Note',
      content: 'This is a sample note for the user.',
      date: '2023-07-25',
    });

    console.log('User registered successfully:', userId);
    navigation.navigate('AllNotes');
  } catch (error) {
    console.error('Registration error:', error.message);
    // Handle the error as needed
  }
};
 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FormInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
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
      <PrimaryButton title="Sign Up" iconName="person-add-outline" onPress={handleSignUp} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default SignUpScreen;
