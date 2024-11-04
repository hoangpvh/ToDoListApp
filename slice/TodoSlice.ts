import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    addTodo(state, action: PayloadAction<Omit<TodoItem, "id">>) {
      const task = action.payload.task;
      if (!task.trim()) {
        Alert.alert("Thông báo", "Bạn không thể thêm một todo trống!", [
          { text: "OK" },
        ]);
        return;
      }
      const newTodo = { id: Date.now().toString(), ...action.payload };
      state.todos.push(newTodo);
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo(state, action: PayloadAction<TodoItem>) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    toggleTodoCompletion(state, action: PayloadAction<string>) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearTodos: (state) => {
      state.todos = [];
      AsyncStorage.removeItem("todos");
    },
    setTodos(state, action: PayloadAction<TodoItem[]>) {
      state.todos = action.payload;
    },
  },
});

export const {
  toggleTodoCompletion,
  addTodo,
  editTodo,
  deleteTodo,
  clearTodos,
  setTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
