import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import store from "@/redux/Store";
import TodoList from "@/components/organisms/TodoList";
import ButtonLogout from "@/components/atoms/ButtonLogout";

const MainTemplate: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} testID="main-template-container">
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
