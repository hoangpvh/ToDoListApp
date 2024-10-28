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
  },
});

export const { toggleTodoCompletion } = todoSlice.actions;

export default todoSlice.reducer;
