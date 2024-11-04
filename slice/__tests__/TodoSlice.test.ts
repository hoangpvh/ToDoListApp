import { configureStore, Store } from '@reduxjs/toolkit';
import todoReducer, {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompletion,
  clearTodos,
  setTodos,
} from '../TodoSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

// Mock Alert.alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Define RootState type
type RootState = {
  todos: ReturnType<typeof todoReducer>;
};

describe('Todo Slice', () => {
  let store: Store<RootState>; // Explicitly typing the store

  beforeEach(() => {
    store = configureStore({ reducer: { todos: todoReducer } });
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  it('should add a todo', () => {
    const todo = { task: 'Test Todo', completed: false };
    store.dispatch(addTodo(todo));
    const state = store.getState().todos;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0]).toMatchObject(todo);
    expect(state.todos[0]).toHaveProperty('id');
  });

  it('should not add an empty todo and trigger alert', () => {
    store.dispatch(addTodo({ task: '', completed: false }));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Thông báo",
      "Bạn không thể thêm một todo trống!",
      [{ text: "OK" }] // Removed the onPress expectation
    );
    const state = store.getState().todos;
    expect(state.todos).toHaveLength(0);
  });

  it('should delete a todo', () => {
    store.dispatch(addTodo({ task: 'Test Todo 1', completed: false }));
    const stateBefore = store.getState().todos;
    expect(stateBefore.todos).toHaveLength(1);

    const todoId = stateBefore.todos[0].id;
    store.dispatch(deleteTodo(todoId));

    const stateAfter = store.getState().todos;
    expect(stateAfter.todos).toHaveLength(0);
  });

  it('should edit a todo', () => {
    const todo = { task: 'Test Todo', completed: false };
    store.dispatch(addTodo(todo));
    const stateBefore = store.getState().todos;

    const editedTodo = { ...stateBefore.todos[0], task: 'Updated Task' };
    store.dispatch(editTodo(editedTodo));

    const stateAfter = store.getState().todos;
    expect(stateAfter.todos[0].task).toBe('Updated Task');
  });

  it('should not edit a non-existing todo', () => {
    const nonExistingTodo = { id: 'non-existing-id', task: 'Updated Task', completed: false };
    const stateBefore = store.getState().todos;
    
    store.dispatch(editTodo(nonExistingTodo));
  
    // Optionally, you can check console.warn or state remains unchanged
    const stateAfter = store.getState().todos;
    expect(stateAfter.todos).toEqual(stateBefore.todos);
  });  

  it('should toggle todo completion', () => {
    store.dispatch(addTodo({ task: 'Test Todo', completed: false }));
    const todoId = store.getState().todos.todos[0].id;

    store.dispatch(toggleTodoCompletion(todoId));

    const stateAfter = store.getState().todos;
    expect(stateAfter.todos[0].completed).toBe(true);
  });

  it('should not toggle completion for a non-existing todo', () => {
    const nonExistingTodoId = 'non-existing-id';
    const stateBefore = store.getState().todos;
  
    store.dispatch(toggleTodoCompletion(nonExistingTodoId));
  
    // Optionally, you can check console.warn or state remains unchanged
    const stateAfter = store.getState().todos;
    expect(stateAfter.todos).toEqual(stateBefore.todos);
  });
  

  it('should clear all todos', async () => {
    store.dispatch(addTodo({ task: 'Test Todo', completed: false }));
    expect(store.getState().todos.todos).toHaveLength(1);

    await store.dispatch(clearTodos());

    const stateAfter = store.getState().todos;
    expect(stateAfter.todos).toHaveLength(0);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("todos");
  });

  it('should set todos', () => {
    const newTodos = [
      { id: '1', task: 'Task 1', completed: false },
      { id: '2', task: 'Task 2', completed: true },
    ];

    store.dispatch(setTodos(newTodos));
    const state = store.getState().todos;

    expect(state.todos).toEqual(newTodos);
  });
});
