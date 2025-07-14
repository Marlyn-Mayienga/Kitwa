import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyListComponent = ({ message = "No items to display" }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-list" size={40} color="#ccc" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default EmptyListComponent;
