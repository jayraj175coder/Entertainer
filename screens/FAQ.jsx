// FAQ.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FAQ = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💡 FAQ</Text>
      <Text style={styles.question}>Why is daily learning important?</Text>
      <Text style={styles.answer}>Daily learning helps to expand knowledge and improve mental sharpness. A little learning every day can have a big impact over time.</Text>
      
      <Text style={styles.question}>How can this app help me?</Text>
      <Text style={styles.answer}>By providing you with a fact or a quote every day, it encourages curiosity and keeps you motivated.</Text>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#2196F3' },
  question: { fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#333' },
  answer: { fontSize: 16, marginTop: 5, color: '#555' },
});
