import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import store from "@/redux/store";

import TodoList from "../organisms/TodoList";

const MainTemplate: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <Provider store={store}>
        <TodoList />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
});

export default MainTemplate;
