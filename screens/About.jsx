// About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ℹ️ About the App</Text>
      <Text style={styles.text}>This app provides a new quote and a fact every day to keep you inspired and curious. Our goal is to help people learn something new every day and stay motivated!</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2196F3' },
  text: { fontSize: 16, color: '#555' },
});
