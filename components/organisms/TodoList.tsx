import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, Pressable, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from '@/redux/Store';
import { addTodo, deleteTodo, editTodo, toggleTodoCompletion, setTodos } from '@/slice/TodoSlice';
import TodoItem from '@/components/molecules/TodoItem';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [task, setTask] = useState('');
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

  const handleToggleCompletion = (id: string) => {
    dispatch(toggleTodoCompletion(id));
    saveTodosToStorage(todos.map(todo => ({
      ...todo,
      completed: todo.id === id ? !todo.completed : todo.completed,
    })));
  };

  const handleEdit = (item: TodoItem) => {
    setEditId(item.id);
    setTask(item.task);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteTodo(id));
    const updatedTodos = todos.filter(todo => todo.id !== id);
    await saveTodosToStorage(updatedTodos);
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
    setTask('');
    setEditId(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleCompletion={handleToggleCompletion}
            onEdit={handleEdit} // This can be simplified
            onDelete={handleDelete}
          />
        )}
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
          style={[styles.button, { backgroundColor: editId ? 'green' : '#FF5722' }]}
          onPress={handleSave}
        >
          <Text style={styles.buttonLabel}>{editId ? 'Update Task' : 'Add Task'}</Text>
        </Pressable>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 600,
    width: 400,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonSubmit: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    marginTop: 12,
  },
  button: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 5,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TodoList;
