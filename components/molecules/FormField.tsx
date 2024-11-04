import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default FormField;
