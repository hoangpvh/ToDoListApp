// redux/todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: [
    { completed: false, id: "1", task: "Buy groceries" },
    { completed: false, id: "2", task: "Walk the dog" },
    { completed: false, id: "3", task: "Finish project" },
  ],
};

const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    addTodo(state, action: PayloadAction<Omit<TodoItem, "id">>) {
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
  },
});

export const { toggleTodoCompletion, addTodo, editTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
