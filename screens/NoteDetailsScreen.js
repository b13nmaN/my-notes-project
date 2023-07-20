import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';

const NoteDetailsScreen = ({ route }) => {
  const { note } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteBody}>{note.body}</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   safeArea:{
    flex:1
  },
  container: {
    flex: 1,
    padding: 24,
  },
  noteTitle:{
    fontSize: 40,
    fontWeight:'bold'
  },
  noteBody:{
    fontSize: 12
  }

})

export default NoteDetailsScreen;
