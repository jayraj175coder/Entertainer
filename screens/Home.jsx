import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Linking, TouchableOpacity } from 'react-native';

const Home = () => {
  const [joke, setJoke] = useState(null);
  const [quote, setQuote] = useState(null);
  const [fact, setFact] = useState(null);
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jokeRes = await fetch('https://official-joke-api.appspot.com/random_joke');
        const memeRes = await fetch('https://meme-api.com/gimme');
                //   fetch(''),
 const quoteRes = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');

  
        if (!jokeRes.ok || !memeRes.ok) {
          throw new Error('One or more API requests failed');
        }
  
        const jokeData = await jokeRes.json();
        const memeData = await memeRes.json();
        const quoteData= await quoteRes.json();
  
        setJoke(jokeData);
        setMeme(memeData);
        setFact(quoteData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6200ea" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🎉 Welcome to Daily Buzz</Text>

      {joke && (
        <View style={styles.card}>
          <Text style={styles.title}>😂 Joke of the Day</Text>
          <Text style={styles.text}>{joke.setup}</Text>
          <Text style={styles.punchline}>👉 {joke.punchline}</Text>
        </View>
      )}
        {fact && (
        <View style={styles.card}>
          <Text style={styles.title}>📘 Fun Fact</Text>
          <Text style={styles.text}>{fact.text}</Text>
        </View>
      )}

     
       {meme && (
        <View style={styles.card}>
          <Text style={styles.title}>🔥 Meme of the Day</Text>
          <Text style={styles.text}>{meme.title}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(meme.postLink)}>
            <Image source={{ uri: meme.url }} style={styles.memeImage} />
          </TouchableOpacity>
          <Text style={styles.author}>From r/{meme.subreddit}</Text>
        </View>
      )}
       {quote && (
        <View style={styles.card}>
          <Text style={styles.title}>💬 Inspiring Quote</Text>
          <Text style={styles.text}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </View>
      )}

    

     
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ea',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#333' },
  text: { fontSize: 16, marginTop: 10, color: '#555' },
  punchline: { fontSize: 18, fontWeight: 'bold', color: '#E91E63', marginTop: 5 },
  author: { textAlign: 'right', marginTop: 8, fontStyle: 'italic', color: '#777' },
  memeImage: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10
  }
});