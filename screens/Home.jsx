/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    Linking,
    TouchableOpacity,
    ImageBackground,
    RefreshControl,
    DrawerLayoutAndroid,
    SafeAreaView,
    Button,
    Pressable,
    Share,
    Alert
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
    // State management
    const [joke, setJoke] = useState(null);
    const [quote, setQuote] = useState(null);
    const [fact, setFact] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const drawer = useRef(null);

    // Fetch data function
   

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
      
    // Refresh control
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    // Initial data load
    useEffect(() => {
        fetchData();
    }, []);

    // Share functionality
    const onShare = async (content) => {
        try {
            await Share.share({
                message: `${content}\n\nShared via Daily Buzz App`,
            });
        } catch (error) {
            Alert.alert('Error sharing content', error.message);
        }
    };

    // Loading state
    if (loading) {
        return (
            // <LinearGradient colors={['#6200ea', '#3700b3']} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                // <Text style={styles.loadingText}>Loading your daily dose of fun...</Text>
            // </LinearGradient>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.errorContainer}>
                {/* <Icon name="error-outline" size={50} color="#ff3d00" /> */}
                <Text style={styles.errorText}>Oops! Something went wrong</Text>
                <Text style={styles.errorMessage}>{error}</Text>
                <Pressable style={styles.retryButton} onPress={fetchData}>
                    <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
            </View>
        );
    }

    // Navigation drawer content
    const navigationView = () => (
        // <LinearGradient colors={['#6200ea', '#3700b3']} style={styles.drawerContainer}>
            <SafeAreaView style={styles.navigationContainer}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerTitle}>Daily Buzz</Text>
                    <Text style={styles.drawerSubtitle}>Your daily dose of fun</Text>
                </View>
                
                <Pressable 
                    style={styles.drawerItem}
                    onPress={() => {
                        Linking.openURL('https://github.com/jayraj175coder');
                        drawer.current.closeDrawer();
                    }}
                >
                    {/* <Icon name="code" size={24} color="#fff" /> */}
                    <Text>Code</Text>
                    <Text style={styles.drawerItemText}>View Source Code</Text>
                </Pressable>
                
                <Pressable 
                    style={styles.drawerItem}
                    onPress={() => {
                        Linking.openURL('mailto:jayrajsanas175@gmail.com');
                        drawer.current.closeDrawer();
                    }}
                >
                    {/* <Icon name="email" size={24} color="#fff" /> */}
            <Text>Email</Text>
                    <Text style={styles.drawerItemText}>Contact Support</Text>
                </Pressable>
                
                <View style={styles.drawerFooter}>
                    <Button 
                        title="Close" 
                        onPress={() => drawer.current.closeDrawer()} 
                        color="#fff"
                    />
                </View>
            </SafeAreaView>
        // </LinearGradient>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={navigationView}
            statusBarBackgroundColor="#6200ea"
        >
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                        colors={['#6200ea']}
                        tintColor="#6200ea"
                    />
                }
            >
                {/* App Header */}
                {/* <LinearGradient colors={['#6200ea', '#3700b3']} style={styles.header}> */}
                    <View style={styles.headerContent}>
                        <TouchableOpacity 
                            style={styles.menuButton}
                            onPress={() => drawer.current.openDrawer()}
                        >
                            {/* <Icon name="menu" size={28} color="#fff" /> */}
                            <Text>Menu</Text>
                        </TouchableOpacity>
                        <Text style={styles.heading}>Daily Buzz</Text>
                        <TouchableOpacity 
                            // style={styles.refreshButton}
                            onPress={onRefresh}
                        >
                            

                            {/* <Icon name="refresh" size={28} color="#fff" /> */}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subheading}>Your daily dose of fun content</Text>
                {/* </LinearGradient> */}

                {/* Content Cards */}
                <View style={styles.contentContainer}>
                    {joke && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                {/* <Icon name="sentiment-very-satisfied" size={24} color="#6200ea" /> */}
                                <Text style={styles.cardTitle}>Joke of the Day</Text>
                                <TouchableOpacity onPress={() => onShare(`${joke.setup}\n\n${joke.punchline}`)}>
                                    {/* <Icon name="share" size={24} color="#6200ea" /> */}
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cardText}>{joke.setup}</Text>
                            <Text style={styles.punchline}>👉 {joke.punchline}</Text>
                        </View>
                    )}

                    {fact && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                {/* <Icon name="lightbulb-outline" size={24} color="#6200ea" /> */}
                                <Text style={styles.cardTitle}>Fun Fact</Text>
                                <TouchableOpacity onPress={() => onShare(fact.text)}>
                                    {/* <Icon name="share" size={24} color="#6200ea" /> */}
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cardText}>{fact.text}</Text>
                        </View>
                    )}

                    {meme && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                {/* <Icon name="image" size={24} color="#6200ea" /> */}
                                <Text style={styles.cardTitle}>Meme of the Day</Text>
                                <TouchableOpacity onPress={() => onShare(meme.url)}>
                                    {/* <Icon name="share" size={24} color="#6200ea" /> */}
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cardText}>{meme.title}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(meme.postLink)}>
                                <Image 
                                    source={{ uri: meme.url }} 
                                    style={styles.memeImage} 
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* {quote && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Icon name="format-quote" size={24} color="#6200ea" />
                                <Text style={styles.cardTitle}>Inspiring Quote</Text>
                                <TouchableOpacity onPress={() => onShare(`"${quote.text}" - ${quote.author}`)}>
                                    <Icon name="share" size={24} color="#6200ea" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.quoteText}>"{quote.text}"</Text>
                            <Text style={styles.author}>— {quote.author}</Text>
                        </View>
                    )} */}

                    {/* App Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Made with ❤️ for fun</Text>
                        <Text style={styles.footerNote}>Pull down to refresh content</Text>
                    </View>
                </View>
            </ScrollView>
        </DrawerLayoutAndroid>
    );
};

// Enhanced Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        color: '#fff',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff3d00',
        marginTop: 15,
    },
    errorMessage: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 25,
        backgroundColor: '#6200ea',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButton: {
        padding: 5,
    },
    refreshButton: {
        padding: 5,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subheading: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
        textAlign: 'center',
    },
    contentContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#6200ea',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6200ea',
        marginLeft: 10,
        flex: 1,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
    punchline: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E91E63',
        marginTop: 10,
        fontStyle: 'italic',
    },
    quoteText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        fontStyle: 'italic',
    },
    author: {
        textAlign: 'right',
        marginTop: 10,
        color: '#777',
        fontWeight: '600',
    },
    memeImage: {
        height: 300,
        width: '100%',
        borderRadius: 10,
        marginTop: 15,
    },
    footer: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
    footerNote: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 5,
    },
    drawerContainer: {
        flex: 1,
    },
    navigationContainer: {
        flex: 1,
        paddingTop: 20,
    },
    drawerHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        marginBottom: 15,
    },
    drawerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    drawerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    drawerItemText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 15,
    },
    drawerFooter: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
});

export default Home;