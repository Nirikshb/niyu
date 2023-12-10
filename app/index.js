import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList, TouchableHighlight } from 'react-native';

const Header = ({ title, toggleMenu, isMenuOpen }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Animated.Text style={[styles.menuText, isMenuOpen && styles.rotateX]}>☰</Animated.Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const ContentSpace = ({ text, backgroundColor, textColor, textStyle }) => {
  return (
    <View style={[styles.contentSpace, { backgroundColor }]}>
      <Text style={[styles.contentText, { color: textColor }, textStyle]}>{text}</Text>
    </View>
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const [isDarkTheme, setIsDarkTheme] = useState(true);


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;

    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue,
        duration: 800, // Duration for the sliding animation
        useNativeDriver: false,
      }),
      Animated.timing(menuAnimation, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 300, // Duration for the rotation animation
        useNativeDriver: false,
      }).start(),
    ]).start(() => setIsMenuOpen(!isMenuOpen));
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0], // Adjust the value to change the slide distance
  });

  const data = [
    { id: '1',
    text: "\n\n\n\n\n\n\n\nA gold metal card worth 2000/- only. Get your name on it today!!!!",
    backgroundColor: 'black',
    textColor: 'white',
    textStyle: { fontStyle: 'italic' }
  },
    { id: '2', text: 'Join the waitList', backgroundColor: '#ffcc00', textColor: 'black' },
    { id: '3', text: 'No hidden Fees', backgroundColor: '#00ff00', textColor: 'black', textStyle: { fontStyle: 'italic' } },
    { id: '4', text: 'Co-branded is the way', backgroundColor: '#00ffff', textColor: 'black' },
    { id: '5', text: 'Top 3 spends gets 10% off', backgroundColor: '#ff99cc', textColor: 'black' },
    { id: '6', text: '3x rewards on utility bills', backgroundColor: '#ff3399', textColor: 'black' },
    { id: '7', text: '5x rewards on Shopping', backgroundColor: '#ff6778', textColor: 'black' },
  ];

  return (
    <View style={[styles.container, isDarkTheme ? { backgroundColor: 'black' } : { backgroundColor: 'white' }]}>
      <Header title="Niyu" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      <FlatList
       contentcontainerstyle={{ height: '100' }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContentSpace
            text={item.text}
            backgroundColor={item.backgroundColor}
            textColor={item.textColor}
            textStyle={item.textStyle}
          />
        )}
      />
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: menuTranslateX }],
          },
        ]}
      >
         <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Text style={styles.themeButtonText}>{isDarkTheme ? 'Light Theme' : 'Dark Theme'}</Text>
      </TouchableOpacity>

          <TouchableHighlight onPress={toggleMenu} underlayColor="transparent" style={styles.menuItem}>
          <Text>About Us</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={toggleMenu} underlayColor="transparent" style={styles.menuItem}>
          <Text>Careers</Text>
        </TouchableHighlight>
        
      </Animated.View>
      <View style={styles.footer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>About us</Text>
          <Text style={styles.footerText}>Careers</Text>
          <Text style={styles.footerText}>Our goals</Text>
          <Text style={styles.footerText}>Team</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  menuButton: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 70,
    left: 0,
    width: 100,
  },
  menuItem: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },
  
  contentSpace: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  contentText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Georgia', // Change this to your preferred fancy font
    fontStyle: 'italic', // Add more styles as needed (e.g., bold, italic)
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Shadow effect for the text
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: 'black',
    height: 180,
    width: '100%',
    paddingHorizontal: 25,
  },
  footerTextContainer: {
    flexDirection: 'column',
  },
  footerText: {
    color: 'white',
    marginBottom: 10,
  },
  themeButton: {
    alignSelf: 'flex-end',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  themeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Home;
