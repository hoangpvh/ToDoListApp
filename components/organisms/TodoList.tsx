import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', task: 'Buy groceries', completed: false },
    { id: '2', task: 'Walk the dog', completed: false },
    { id: '3', task: 'Finish project', completed: false },
  ]);

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTodoCompletion(item.id)}
        containerStyle={styles.checkbox}
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.task}
      </Text>
    </View>
  );

  const toggleTodoCompletion = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TodoList;