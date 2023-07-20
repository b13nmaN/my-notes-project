import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



function Addbutton2({body}){
  return(
    <View>{}</View>
  )
}


const AddButton = ({ onPress }) => {
  return (
    <Pressable
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2ecc71',
      }}
      onPress={onPress}
    >
      <Ionicons name="ios-add" size={24} color="white" />
    </Pressable>
  );
};

export default AddButton;
