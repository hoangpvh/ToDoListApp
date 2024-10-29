import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

const Logo = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={PlaceholderImage} />
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf:'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
