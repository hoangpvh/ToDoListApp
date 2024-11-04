import React from "react";
import { View } from "react-native";
import MainTemplate from "@/components/templates/MainTemplate"; 
import TodoList from "@/components/organisms/TodoList";

const Todolist = () => {
  return (
    <MainTemplate>
      <View>
        <TodoList /> 
      </View>
    </MainTemplate>
  );
};

export default Todolist;
