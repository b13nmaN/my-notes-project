import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';

const OnBoardingScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('AllNotes');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>MyNotes</Text>
        <Text style={styles.welcomeText}>Welcome to My Notes!
        Continue and start creating notes now!</Text>
        <Text style={styles.infoText}>
          
        </Text>
        <PrimaryButton
          onPress={handleContinue}
          iconName="arrow-forward-outline"
          title={"Let's Get started"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 15,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    // position: 'absolute',
    // left: 20
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default OnBoardingScreen;
