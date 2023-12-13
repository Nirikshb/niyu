// CreditCardImage.js

import React, { useRef } from "react";
import { Image, Animated, StyleSheet, PanResponder } from "react-native";

const CreditCardImage = ({ imageSource }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(0);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      startRotation();
    },
  });

  return (
    <Animated.Image
      source={imageSource}
      style={[
        styles.creditCardImage,
        {
          transform: [
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  creditCardImage: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

export default CreditCardImage;
