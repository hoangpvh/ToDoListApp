import FormField from "@/components/molecules/FormField";
import Logo from "@/components/molecules/Logo";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useExpoRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          router.push("todolist");
        }
      } catch (error) {
        console.error('Error retrieving data', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (email !== "test" || password !== "pass") {
      Alert.alert("Error", "Wrong Email or Password");
      return;
    }

    Alert.alert("Success", `Logged in with ${email}`);

    const userData = { email, password };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {}

    router.push("todolist");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <FormField label="Email" value={email} onChangeText={setEmail} />
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Pressable style={({ pressed }) => [
          styles.button
        ]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF5722",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginForm;
