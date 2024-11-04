import React from "react";
import { Image, StyleSheet, View } from "react-native";

const PlaceholderImage = require("@/assets/images/background-image.png");

const Logo = () => (
  <View style={styles.container} testID="container">
    <Image style={styles.image} source={PlaceholderImage} testID="image" />
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 75,
    elevation: 8,
    height: 150,
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: 150,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
});
