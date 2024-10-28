import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleTodoCompletion, addTodo, editTodo, deleteTodo } from '@/slice/todoSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

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
        <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))} style={styles.iconButton}>
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
      dispatch(editTodo({ id: editId, task, completed: false }));
      setEditId(null);
    } else {
      dispatch(addTodo({ task, completed: false }));
    }
    setTask('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
      <Input
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button
        label={editId ? 'Update Task' : 'Add Task'}
        onPress={handleSave}
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
    flex: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default TodoList;
