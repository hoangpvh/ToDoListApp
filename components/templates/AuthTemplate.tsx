import LoginForm from "@/components/organisms/LoginForm";
import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const AuthTemplate: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text></Text>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default AuthTemplate;
