import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity,
  Linking, Image, Share, Alert, Platform
} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll'; // Required for Android meme download

const Main = () => {
  const [quote, setQuote] = useState(null);
  const [joke, setJoke] = useState(null);
  const [meme, setMeme] = useState(null);
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageLarge, setIsImageLarge] = useState(false); // State to track image size

  const toggleImageSize = () => {
    setIsImageLarge(!isImageLarge); // Toggle image size on click
  };


  // const fetchQuote = async () => {
  //   setLoading(true);
  //   clearContent();
  //   try {
  //     const res = await fetch('https://api.quotable.io/random');
  //     if (!res.ok) throw new Error('Quote fetch failed');
  //     const data = await res.json();
  //     setQuote({ content: data.content, author: data.author });
  //   } catch (error) {
  //     setQuote({ content: 'Failed to load quote', author: 'Error' });
  //     Alert.alert('Error', 'Could not fetch quote. Please try again later.');
  //   }
  //   setLoading(false);
  // };

  const fetchJoke = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      if (!res.ok) throw new Error('Joke fetch failed');
      const data = await res.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke('Failed to load joke');
      Alert.alert('Error', 'Could not fetch joke. Please try again later.');
    }
    setLoading(false);
  };

  const fetchMeme = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://meme-api.com/gimme');
      if (!res.ok) throw new Error('Meme fetch failed');
      const data = await res.json();
      setMeme({
        title: data.title,
        url: data.url,
        postLink: data.postLink,
        subreddit: data.subreddit,
      });
    } catch (error) {
      setMeme({ title: 'Failed to load meme', url: '', postLink: '', subreddit: '' });
      Alert.alert('Error', 'Could not fetch meme. Please try again later.');
    }
    setLoading(false);
  };

  const fetchFact = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      if (!res.ok) throw new Error('Fact fetch failed');
      const data = await res.json();
      setFact(data.text);
    } catch (error) {
      setFact('Failed to load fact');
      Alert.alert('Error', 'Could not fetch fact. Please try again later.');
    }
    setLoading(false);
  };

  const clearContent = () => {
    setQuote(null);
    setJoke(null);
    setMeme(null);
    setFact(null);
  };

  const surpriseMe = () => {
    const options = [fetchJoke, fetchFact, fetchMeme];
    const randomFunc = options[Math.floor(Math.random() * options.length)];
    randomFunc();
  };

  const shareContent = async (message) => {
    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Error', 'Failed to share content.');
    }
  };

  // const downloadMeme = async () => {
  //   if (Platform.OS === 'android' && meme.url) {
  //     try {
  //       await CameraRoll.save(meme.url, { type: 'photo' });
  //       Alert.alert('Success', 'Meme downloaded successfully!');
  //     } catch (error) {
  //       Alert.alert('Error', 'Failed to download meme.');
  //     }
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appTitle}>🎉 Daily Buzz</Text>

      <View style={styles.buttonRow}>
        {/* <TouchableOpacity style={styles.btn} onPress={fetchQuote}>
          <Text style={styles.btnText}>💬 Quote</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btn} onPress={fetchJoke}>
          <Text style={styles.btnText}>😂 Joke</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={fetchFact}>
          <Text style={styles.btnText}>🧠 Fact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={fetchMeme}>
          <Text style={styles.btnText}>🔥 Meme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.surpriseBtn} onPress={surpriseMe}>
          <Text style={styles.btnText}>🎲 Surprise Me!</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#6200ea" style={{ marginTop: 20 }} />}

      {quote && (
        <View style={styles.card}>
          <Text style={styles.title}>💬 Quote</Text>
          <Text style={styles.text}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
          <TouchableOpacity onPress={() => shareContent(`${quote.content} — ${quote.author}`)}>
            <Text style={styles.link}>📤 Share</Text>
          </TouchableOpacity>
        </View>
      )}

      {joke && (
        <View style={styles.card}>
          <Text style={styles.title}>😂 Joke</Text>
          <Text style={styles.text}>{joke}</Text>
          <TouchableOpacity onPress={() => shareContent(joke)}>
            <Text style={styles.link}>📤 Share</Text>
          </TouchableOpacity>
        </View>
      )}

      {fact && (
        <View style={styles.card}>
          <Text style={styles.title}>🧠 Fun Fact</Text>
          <Text style={styles.text}>{fact}</Text>
          <TouchableOpacity onPress={() => shareContent(fact)}>
            <Text style={styles.link}>📤 Share</Text>
          </TouchableOpacity>
        </View>
      )}

      {meme && meme.url && (
        <View style={styles.card}>
          <Text style={styles.title}>🔥 Meme</Text>
          {/* <Text style={styles.text}>{meme.title}</Text> */}
          <TouchableOpacity onPress={
            ()=>toggleImageSize(setIsImageLarge)
          }>
            {/* <Image source={{ uri: meme.url }} style={styles.memeImage} /> */}
            <Image 
              source={{ uri: meme.url }} 
              style={[styles.memeImage, isImageLarge && styles.largeMemeImage]} // Adjust style based on isImageLarge
            />
          </TouchableOpacity>
          {/* <Text style={styles.author}>From r/{meme.subreddit}</Text> */}

          <TouchableOpacity onPress={() => shareContent(`${meme.title} \n${meme.url}`)}>
            <Text style={styles.link}>📤 Share</Text>
          </TouchableOpacity>

          {/* Download button only for Android */}
          {/* {Platform.OS === 'android' && (
            <TouchableOpacity onPress={downloadMeme}>
              <Text style={styles.link}>📥 Download Meme</Text>
            </TouchableOpacity>
          )} */}
        </View>
      )}
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8F0' },
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#FFCC80',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flexGrow: 1,
    alignItems: 'center',
  },
  surpriseBtn: {
    backgroundColor: '#FFD54F',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  btnText: { fontWeight: 'bold', fontSize: 16, color: '#5D4037' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#4A148C' },
  text: { fontSize: 18, color: '#333' },
  author: { fontSize: 16, marginTop: 10, color: '#777', fontStyle: 'italic', textAlign: 'right' },
  link: {
    marginTop: 10,
    color: '#1E88E5',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  memeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10,
  },
  note: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  largeMemeImage:{
    height:400,
  }
});
