import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import store from "@/redux/Store";
import ButtonLogout from "@/components/atoms/ButtonLogout"; 

const MainTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {children} 
        <ButtonLogout /> 
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
    padding: 16,
  },
  content: {
    flex: 1, 
    justifyContent: "flex-start", 
    width: "100%", 
    maxWidth: 600, 
  },
});

export default MainTemplate;
