import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const jokes = [
  "Why don’t scientists trust atoms? Because they make up everything!",
  "Why did the math book look sad? Because it had too many problems.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
];

const funFacts = [
  "A crocodile can't stick its tongue out!",
  "Bananas are berries, but strawberries aren’t.",
  "You can't hum while holding your nose closed. Try it!",
];

const memeImages = [
  'https://i.imgflip.com/1bij.jpg',  // classic meme
  'https://i.imgflip.com/30b1gx.jpg',
  'https://i.imgflip.com/4acd7j.png',
];

const Home = () => {
  const [joke, setJoke] = useState('');
  const [fact, setFact] = useState('');
  const [meme, setMeme] = useState('');

  useEffect(() => {
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    setMeme(memeImages[Math.floor(Math.random() * memeImages.length)]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🎉 Daily Entertainment</Text>

      <Text style={styles.sectionTitle}>😂 Joke of the Day</Text>
      <Text style={styles.content}>{joke}</Text>

      <Text style={styles.sectionTitle}>🤓 Fun Fact</Text>
      <Text style={styles.content}>{fact}</Text>

      <Text style={styles.sectionTitle}>📸 Meme of the Day</Text>
      <Image style={styles.memeImage} source={{ uri: meme }} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#E91E63', textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, color: '#333' },
  content: { fontSize: 16, marginTop: 10, color: '#555' },
  memeImage: { height: 250, width: '100%', marginTop: 10, borderRadius: 10 },
});
