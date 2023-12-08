import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <View>
      <Header title="Niyu" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: menuTranslateX }],
          },
        ]}
      >
        {/* Menu items */}
        <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
          <Text>Menu Item 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
          <Text>Menu Item 2</Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuButton: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 50, // Adjust the top value to set the menu below the header
    left: 0,
    width: 400, // Adjust the width of the menu
  },
  menuItem: {
    paddingVertical: 10,
  },
  rotateX: {
    transform: [{ rotate: '90deg' }],
  },
});

export default Home;
