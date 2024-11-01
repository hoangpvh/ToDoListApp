import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from "@/redux/store";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
  setTodos, // Assuming you have this action to set todos
} from "@/slice/todoSlice";
import Input from "@/components/atoms/Input";
import AddButton from "@/components/atoms/AddButton";

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

  // Load todos from AsyncStorage when component mounts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          dispatch(setTodos(JSON.parse(storedTodos))); // Set todos in Redux store
        }
      } catch (error) {
        console.error('Failed to load todos', error);
      }
    };

    loadTodos();
  }, [dispatch]);

  // Render each todo item
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
        <TouchableOpacity onPress={() => startEdit(item)} style={styles.iconButton}>
          <Icon name="pencil" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.iconButton}>
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const startEdit = (item: TodoItem) => {
    setEditId(item.id);
    setTask(item.task);
  };

  const handleSave = async () => {
    if (editId) {
      dispatch(editTodo({ completed: false, id: editId, task }));
      setEditId(null);
    } else {
      dispatch(addTodo({ completed: false, task }));
    }

    // Persist updated todos to AsyncStorage
    await saveTodosToStorage();
    setTask("");
  };

  const saveTodosToStorage = async () => {
    try {
      const todosToStore = await AsyncStorage.getItem('todos');
      const updatedTodos = todosToStore ? [...JSON.parse(todosToStore), { id: editId || Date.now().toString(), task, completed: false }] : [{ id: Date.now().toString(), task, completed: false }];
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteTodo(id));
            // Also update AsyncStorage
            saveTodosToStorage();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
      <Input placeholder="Enter task" value={task} onChangeText={setTask} />
      <AddButton
        label={editId ? "Update Task" : "Add Task"}
        onPress={handleSave}
        backgroundColor={editId ? "green" : "#007BFF"}
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



// const confirmDelete = (id: string) => {
  //   Alert.alert(
  //     "Confirm Deletion",
  //     "Are you sure you want to delete this todo?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Delete",
  //         onPress: () => dispatch(deleteTodo(id)), 
  //         style: "destructive",
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };