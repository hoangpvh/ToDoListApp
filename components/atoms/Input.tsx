import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
});

export default Input;
