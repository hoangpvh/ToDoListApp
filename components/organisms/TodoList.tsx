import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from "@/redux/Store";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
  setTodos,
} from "@/slice/TodoSlice";

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

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          dispatch(setTodos(JSON.parse(storedTodos)));
        }
      } catch (error) {
        console.error('Failed to load todos', error);
      }
    };

    loadTodos();
  }, [dispatch]);

  const saveTodosToStorage = async (todosToSave: TodoItem[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todosToSave));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  };

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => {
          dispatch(toggleTodoCompletion(item.id));
          saveTodosToStorage(todos.map(todo => ({
            ...todo,
            completed: todo.id === item.id ? !todo.completed : todo.completed
          })));
        }}
        containerStyle={styles.checkbox}
      />
      <Text style={styles.taskText}>{item.task}</Text>
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
    let updatedTodos;

    if (editId) {
      const updatedTodo = { id: editId, task, completed: false };
      dispatch(editTodo(updatedTodo));
      updatedTodos = todos.map(todo => (todo.id === editId ? updatedTodo : todo));
    } else {
      const newTodo = { id: Date.now().toString(), task, completed: false };
      dispatch(addTodo(newTodo));
      updatedTodos = [...todos, newTodo];
    }

    await saveTodosToStorage(updatedTodos);
    setTask("");
    setEditId(null);
  };

  const confirmDelete = (id: string) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa todo này không?");
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteTodo(id));
    const updatedTodos = todos.filter(todo => todo.id !== id);
    await saveTodosToStorage(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <View style={styles.buttonSubmit}>
        <Pressable
          style={[styles.button, { backgroundColor: editId ? "green" : "#FF5722" }]}
          onPress={handleSave}
        >
          <Text style={styles.buttonLabel}>{editId ? "Update Task" : "Add Task"}</Text>
        </Pressable>
      </View>
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
  container: {
    padding: 20,
    height: 600,
    width: 400,
    justifyContent: "center",
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FF5722",
    borderRadius: 5,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonSubmit: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    marginTop: 12,
  },
});

export default TodoList;
