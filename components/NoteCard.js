import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const NoteCard = ({ title, body, onPress, name}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Pressable onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{name}</Text>

      {body.length > 60 && !expanded ? (
        <>
          <Text style={styles.body}>{`${body.substring(0, 60)}...`}</Text>
          <Text style={styles.showMore} onPress={handleToggleExpand}>
            Show more
          </Text>
        </>
      ) : (
        <Text style={styles.body}>{body}</Text>
      )}

    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
  },
  showMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default NoteCard;
