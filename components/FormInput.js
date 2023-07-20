import React from 'react';
import { View, TextInput, StyleSheet  ,Text} from 'react-native';

const FormInput = ({ label, ...rest }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default FormInput;
