import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrimaryButton = ({ onPress, iconName, title}) => {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonLabel}>{title}</Text>
      <Ionicons style={styles.iconStyle} name={iconName} size={24} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height: 44,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#2ecc71',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttonLabel: {
    marginRight: 10,
    color: 'white',
    textAlign: 'center',
  },
  iconStyle:{
    position:'absolute',
    right: 20
  }
});

export default PrimaryButton;
