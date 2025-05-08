import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const faqData = [
  {
    question: 'Why is daily entertainment important?',
    answer: 'Daily entertainment keeps your mind fresh, boosts creativity, and adds joy to your routine.',
  },
  {
    question: 'How does the Entertainer app help me?',
    answer: 'The app gives you jokes, quotes, and fun facts at the tap of a button — making sure you laugh, learn, and get inspired every day.',
  },
  {
    question: 'Do I need an internet connection?',
    answer: 'Yes, the app fetches fresh content from the internet each time you press a button.',
  },
  {
    question: 'Is the app free?',
    answer: 'Yes, Entertainer is completely free to use with no hidden charges.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💡 Frequently Asked Questions</Text>

      {faqData.map((item, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleFAQ(index)}>
            <Text style={styles.question}>
              {activeIndex === index ? '🔽' : '▶️'} {item.question}
            </Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2196F3' },
  question: { fontSize: 18, fontWeight: 'bold', marginTop: 15, color: '#333' },
  answer: { fontSize: 16, marginTop: 5, color: '#555', paddingLeft: 10 },
});
