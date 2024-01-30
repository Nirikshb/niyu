import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  TouchableHighlight,
  PanResponder,
} from "react-native";
import { Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ title, toggleMenu, isMenuOpen }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <FontAwesome5 name="credit-card" size={25} color="white" style={{ transform: [{ rotateX: isMenuOpen ? '180deg' : '0deg' }] }} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const ContentSpace = ({
  text,
  backgroundColor,
  textColor,
  textStyle,
  isFirstContent,
}) => {
  const creditCardImage = require("./assets/black_brass_1.jpg"); // Correct path to your image file

  return (
    <View style={[styles.contentSpace, { backgroundColor }]}>
      {isFirstContent && ( // Render the image only for the first content
        <Image source={creditCardImage} style={styles.creditCardImage} />
      )}
      <Text style={[styles.contentText, { color: textColor }, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
  
    Animated.timing(menuAnimation, {
      toValue,
      duration: 800,
      useNativeDriver: true, 
      }).start(() => setIsMenuOpen(!isMenuOpen));
  };
  
  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });

  const data = [
    {
      id: "1",
      text: "The only credit card you'll ever need! Really",
      backgroundColor: "#deecfb",
      textColor: "black",
    },
    {
      id: "2",
      text: "Join the Waitlist, it is getting long!!",
      backgroundColor: "#bedaf7",
      textColor: "black",
    },
    {
      id: "3",
      text: "No hidden Fees",
      backgroundColor: "#7ab3ef",
      textColor: "white",
      textStyle: { fontStyle: "italic" },
    },
    {
      id: "4",
      text: "Co-branded is the way",
      backgroundColor: "#368ce7",
      textColor: "white",
    },
    {
      id: "5",
      text: "Top 3 spends gets 10% off",
      backgroundColor: "#1666ba",
      textColor: "white",
    },
    {
      id: "6",
      text: "3x rewards on utility bills",
      backgroundColor: "#055096",
      textColor: "white",
    },
    {
      id: "7",
      text: "5x rewards on Shopping",
      backgroundColor: "#003866",
      textColor: "white",
    },
  ];

  const handleMenuItem1 = () => {
    // Action for Menu Item 1
    console.log("Menu Item 1 was pressed");
  };
  
  const handleMenuItem2 = () => {
    // Action for Menu Item 2
    console.log("Menu Item 2 was pressed");
  };
  

  return (
    <View style={styles.container}>
    <Header title="Niyo" toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ContentSpace
          text={item.text}
          backgroundColor={item.backgroundColor}
          textColor={item.textColor}
          textStyle={item.textStyle}
          isFirstContent={index === 0}
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
  <TouchableOpacity
    onPress={handleMenuItem1} // New function for Menu Item 1
    style={styles.menuItem}
    activeOpacity={0.7}
  >
    <Text>Menu Item 1</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={handleMenuItem2} // New function for Menu Item 2
    style={styles.menuItem}
    activeOpacity={0.7}
  >
    <Text>Menu Item 2</Text>
  </TouchableOpacity>
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
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    height: "10%",
    backgroundColor: "lightblue",
    alignItems: "center",
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
    fontWeight: "bold",
  },
  menu: {
    backgroundColor: "white",
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    top: "10%", // Adjust as needed
    left: 0,
    width: "100%", // Adjust as needed
  },
  menuItem: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },

  contentSpace: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  contentText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  creditCardImage: {
    width: 200, // Set width as per your requirement
    height: 120, // Set height as per your requirement
    resizeMode: "contain", // Adjust the image's content mode as needed
    marginBottom: 10, // Adjust margin as needed
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "black",
    height: "15%", // Adjust as needed
    width: "100%",
    paddingHorizontal: "5%", // Adjust as needed
  },
  footerTextContainer: {
    flexDirection: "column",
  },
  footerText: {
    color: "white",
    marginBottom: 10,
  },
});

export default Home;
