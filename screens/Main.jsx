import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity,
  Linking, Image, Share, Alert, Platform, RefreshControl
} from 'react-native';

const Main = () => {
  const [quote, setQuote] = useState(null);
  const [joke, setJoke] = useState(null);
  const [meme, setMeme] = useState(null);
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageLarge, setIsImageLarge] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add to history
  const addToHistory = (type, content) => {
    const newItem = {
      id: Date.now(),
      type,
      content,
      date: new Date().toLocaleString()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  // Fetch random quote
  const fetchQuote = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) throw new Error('Quote fetch failed');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
      addToHistory('quote', `${data.content} — ${data.author}`);
    } catch (error) {
      setQuote({ content: 'Failed to load quote', author: 'Error' });
      Alert.alert('Error', 'Could not fetch quote. Please try again later.');
    }
    setLoading(false);
  };

  // Fetch random joke
  const fetchJoke = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      if (!res.ok) throw new Error('Joke fetch failed');
      const data = await res.json();
      setJoke(data.joke || `${data.setup}\n${data.delivery}`);
      addToHistory('joke', data.joke || `${data.setup}\n${data.delivery}`);
    } catch (error) {
      setJoke('Failed to load joke');
      Alert.alert('Error', 'Could not fetch joke. Please try again later.');
    }
    setLoading(false);
  };

  // Fetch random meme
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
      addToHistory('meme', data.url);
    } catch (error) {
      setMeme({ title: 'Failed to load meme', url: '', postLink: '', subreddit: '' });
      Alert.alert('Error', 'Could not fetch meme. Please try again later.');
    }
    setLoading(false);
  };

  // Fetch random fact
  const fetchFact = async () => {
    setLoading(true);
    clearContent();
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      if (!res.ok) throw new Error('Fact fetch failed');
      const data = await res.json();
      setFact(data.text);
      addToHistory('fact', data.text);
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

  const toggleImageSize = () => {
    setIsImageLarge(!isImageLarge);
  };

  const onRefresh = () => {
    setRefreshing(true);
    surpriseMe();
    setRefreshing(false);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: darkMode ? '#121212' : '#FFF8F0' 
    },
    appTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: darkMode ? '#FFD54F' : '#FF6F00',
    },
    buttonRow: {
      gap: 10,
      marginBottom: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    btn: {
      backgroundColor: darkMode ? '#333' : '#FFCC80',
      padding: 10,
      borderRadius: 10,
      margin: 5,
      flexGrow: 1,
      alignItems: 'center',
    },
    surpriseBtn: {
      backgroundColor: darkMode ? '#444' : '#FFD54F',
      padding: 12,
      borderRadius: 12,
      marginVertical: 10,
      alignItems: 'center',
      width: '100%',
    },
    btnText: { 
      fontWeight: 'bold', 
      fontSize: 16, 
      color: darkMode ? '#FFF' : '#5D4037' 
    },
    card: {
      backgroundColor: darkMode ? '#1E1E1E' : '#fff',
      borderRadius: 15,
      padding: 20,
      marginVertical: 10,
      elevation: 4,
    },
    title: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      marginBottom: 10, 
      color: darkMode ? '#BB86FC' : '#4A148C' 
    },
    text: { 
      fontSize: fontSize, 
      color: darkMode ? '#E0E0E0' : '#333' 
    },
    author: { 
      fontSize: 16, 
      marginTop: 10, 
      color: darkMode ? '#9E9E9E' : '#777', 
      fontStyle: 'italic', 
      textAlign: 'right' 
    },
    link: {
      marginTop: 10,
      color: darkMode ? '#03DAC6' : '#1E88E5',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    memeImage: {
      width: '100%',
      height: isImageLarge ? 400 : 250,
      resizeMode: 'contain',
      borderRadius: 10,
      marginTop: 10,
    },
    settingsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    settingsBtn: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: darkMode ? '#333' : '#E0E0E0',
    },
    historyItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#333' : '#E0E0E0',
    },
    historyTitle: {
      fontWeight: 'bold',
      color: darkMode ? '#FFF' : '#000',
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FF6F00']}
          tintColor={darkMode ? '#FFD54F' : '#FF6F00'}
        />
      }
    >
      <Text style={styles.appTitle}>🎉 Daily Buzz</Text>

      <View style={styles.settingsRow}>
        <TouchableOpacity style={styles.settingsBtn} onPress={toggleDarkMode}>
          <Text style={styles.btnText}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsBtn} onPress={increaseFontSize}>
          <Text style={styles.btnText}>🔍 Increase Font</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingsBtn} onPress={decreaseFontSize}>
          <Text style={styles.btnText}>🔎 Decrease Font</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.settingsBtn} onPress={() => setShowHistory(!showHistory)}>
          <Text style={styles.btnText}>📜 {showHistory ? 'Hide' : 'Show'} History</Text>
        </TouchableOpacity> */}
      </View>

      {showHistory ? (
        <View style={styles.card}>
          <Text style={styles.title}>📜 Your History</Text>
          {history.length === 0 ? (
            <Text style={styles.text}>No history yet. Fetch some content!</Text>
          ) : (
            history.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.historyItem}
                onPress={() => {
                  if (item.type === 'quote') {
                    const [content, author] = item.content.split(' — ');
                    setQuote({ content, author });
                  } else if (item.type === 'joke') {
                    setJoke(item.content);
                  } else if (item.type === 'fact') {
                    setFact(item.content);
                  } else if (item.type === 'meme') {
                    setMeme({ url: item.content, title: 'Previously viewed meme' });
                  }
                  setShowHistory(false);
                }}
              >
                <Text style={styles.historyTitle}>
                  {item.type.toUpperCase()} - {item.date}
                </Text>
                <Text 
                  style={styles.text} 
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >
                  {item.type === 'meme' ? 'Meme Image' : item.content}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      ) : (
        <>
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

          {loading && <ActivityIndicator size="large" color={darkMode ? "#FFD54F" : "#6200ea"} style={{ marginTop: 20 }} />}
{/* 
          {quote && (
            <View style={styles.card}>
              <Text style={styles.title}>💬 Quote</Text>
              <Text style={styles.text}>"{quote.content}"</Text>
              <Text style={styles.author}>— {quote.author}</Text>
              <TouchableOpacity onPress={() => shareContent(`${quote.content} — ${quote.author}`)}>
                <Text style={styles.link}>📤 Share</Text>
              </TouchableOpacity>
            </View>
          )} */}

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
              <TouchableOpacity onPress={toggleImageSize}>
                <Image 
                  source={{ uri: meme.url }} 
                  style={styles.memeImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => shareContent(`${meme.title} \n${meme.url}`)}>
                <Text style={styles.link}>📤 Share</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => Linking.openURL(meme.postLink)}>
                <Text style={styles.link}>🌐 View on Reddit</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Main;