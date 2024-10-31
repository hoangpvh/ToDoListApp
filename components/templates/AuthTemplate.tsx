import LoginForm from "@/components/organisms/LoginForm";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const AuthTemplate: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <LoginForm />
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
