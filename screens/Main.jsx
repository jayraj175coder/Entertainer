import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Image } from 'react-native';

const Main = () => {
  const [quote, setQuote] = useState(null);
  const [joke, setJoke] = useState(null);
  const [meme, setMeme] = useState(null);
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setJoke(null);
    setFact(null);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch {
      setQuote({ content: 'Failed to load quote', author: 'Error' });
    }
    setLoading(false);
  };

  const fetchJoke = async () => {
    setLoading(true);
    setQuote(null);
    setFact(null);
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await res.json();
      setJoke(data.joke);
    } catch {
      setJoke('Failed to load joke');
    }
    setLoading(false);
  };

  const FetchMeme = async () => {
    setLoading(true);
    setQuote(null);
    setJoke(null);
    setFact(null);
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      setMeme({
        title: data.title,
        url: data.url,
        postLink: data.postLink,
        subreddit: data.subreddit,
      });
    } catch {
      setMeme({ title: 'Failed to load meme', url: '', postLink: '', subreddit: '' });
    }
    setLoading(false);
  };


  const fetchFact = async () => {
    setLoading(true);
    setQuote(null);
    setJoke(null);
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await res.json();
      setFact(data.text);
    } catch {
      setFact('Failed to load fact');
    }
    setLoading(false);
  };

  const surpriseMe = () => {
    const options = [fetchJoke, fetchFact, FetchMeme];
    const randomFunc = options[Math.floor(Math.random() * options.length)];
    randomFunc();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appTitle}>🎉 Main</Text>

      <View style={styles.buttonRow}>
        <Button title="Random Memes" onPress={FetchMeme} />
        <Button title="Tell me a Joke" onPress={fetchJoke} />
        <Button title="Random Fact" onPress={fetchFact} />
        <Button title="🎲 Surprise Me!" onPress={surpriseMe} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {/* {quote && (
        <View style={styles.card}>
          <Text style={styles.title}>💬 Inspiring Quote</Text>
          <Text style={styles.text}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </View>
      )} */}



      {joke && (
        <View style={styles.card}>
          <Text style={styles.title}>😂 Joke of the Moment</Text>
          <Text style={styles.text}>{joke}</Text>
        </View>
      )}

      {fact && (
        <View style={styles.card}>
          <Text style={styles.title}>🧠 Fun Fact</Text>
          <Text style={styles.text}>{fact}</Text>
        </View>
      )}
      {meme && meme.url && (
        <View style={styles.card}>
          <Text style={styles.title}>🔥 Meme of the Moment</Text>
          <Text style={styles.text}>{meme.title}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(meme.postLink)}>
            <Image source={{ uri: meme.url }} style={styles.memeImage} />
          </TouchableOpacity>
          <Text style={styles.author}>From r/{meme.subreddit}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EC',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6F00',
  },
  buttonRow: {
    gap: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A148C',
  },
  memeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10,
  },

  text: {
    fontSize: 18,
    color: '#333',
  },
  author: {
    fontSize: 16,
    marginTop: 10,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
