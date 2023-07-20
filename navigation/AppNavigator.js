import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllNotesScreen from '../screens/AllNotesScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LoginIn"
        component={LoginScreen}
        options={{ title: 'Login'}}

      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up'}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllNotes"
        component={AllNotesScreen}
        options={{ title: 'All Notes', headerLeft:null, gestureEnabled: false }}
      />
      <Stack.Screen
        name="NoteDetailsScreen"
        component={NoteDetailsScreen}
        options={({ route }) => ({ title: route.params.note.title })}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
