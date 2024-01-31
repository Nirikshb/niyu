// CreditCardImage.js

import React, { useRef } from "react";
import { Image, Animated, StyleSheet, PanResponder, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';

const CreditCardImage = ({ imageSource }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateCard = () => {
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
    onPanResponderGrant: rotateCard,
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

CreditCardImage.propTypes = {
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number, // for static resources
  ]).isRequired,
};

export default CreditCardImage;

// styles.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  creditCardImage: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
