import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  backgroundColor = "#007BFF",
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor },
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

export default Button;
