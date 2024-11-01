import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
} from "@/slice/todoSlice";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => dispatch(toggleTodoCompletion(item.id))}
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.task}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => startEdit(item)}
          style={styles.iconButton}
        >
          <Icon name="pencil" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteTodo(item.id))}
          style={styles.iconButton}
        >
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const startEdit = (item: TodoItem) => {
    setEditId(item.id);
    setTask(item.task);
  };

  const handleSave = () => {
    if (editId) {
      dispatch(editTodo({ completed: false, id: editId, task }));
      setEditId(null);
    } else {
      dispatch(addTodo({ completed: false, task }));
    }
    setTask("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
      <Input placeholder="Enter task" value={task} onChangeText={setTask} />
      <Button
        label={editId ? "Update Task" : "Add Task"}
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkbox: {
    marginRight: 10,
  },
  completedText: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    height: "55%",
    justifyContent: "space-between",
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
  taskText: {
    flex: 8,
    fontSize: 16,
  },
  todoItem: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default TodoList;
