import React from 'react';
import { StyleSheet, Text } from 'react-native';

type LabelProps = {
  text: string;
};

const Label: React.FC<LabelProps> = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Label;
