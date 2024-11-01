import React from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import store from "@/redux/store";
import TodoList from "@/components/organisms/TodoList";
import ButtonLogout from "@/components/atoms/ButtonLogout";

const MainTemplate: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <TodoList />
        <ButtonLogout />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default MainTemplate;
