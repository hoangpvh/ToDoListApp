// redux/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    { id: '1', task: 'Buy groceries', completed: false },
    { id: '2', task: 'Walk the dog', completed: false },
    { id: '3', task: 'Finish project', completed: false },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodoCompletion(state, action: PayloadAction<string>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    addTodo(state, action: PayloadAction<Omit<TodoItem, 'id'>>) {
      const newTodo = { id: Date.now().toString(), ...action.payload };
      state.todos.push(newTodo);
    },
    editTodo(state, action: PayloadAction<TodoItem>) {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { toggleTodoCompletion, addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
