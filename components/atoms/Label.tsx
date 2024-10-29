import React from "react";
import { StyleSheet, Text } from "react-native";

type LabelProps = {
  text: string;
};

const Label: React.FC<LabelProps> = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Label;
