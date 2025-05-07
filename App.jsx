import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Home from './screens/Home';
import FAQ from './screens/FAQ';
import About from './screens/About';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'FAQ':
        return <FAQ />;
      case 'About':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
      <View style={styles.bottomTabs}>
        {['Home', 'FAQ', 'About'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  tabButton: { padding: 10 },
  tabText: { fontSize: 16, color: '#777' },
  activeTab: { color: '#ff3333', fontWeight: 'bold' },
});
