import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Header = ({ title, toggleMenu }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const menuHeight = menuAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 100], // Adjust the final height of the menu as needed
  });

  return (
    <View>
      <Header title="Niyu" toggleMenu={toggleMenu} />
      <Animated.View style={[styles.menu, { height: menuHeight }]}>
        {/* Add menu items or links here */}
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
  },
  menuItem: {
    paddingVertical: 10,
  },

});

export default Home;
