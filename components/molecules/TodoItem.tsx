import ButtonIcon from '@/components/atoms/ButtonIcon';
import CheckboxTodo from '@/components/atoms/CheckboxTodo';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TodoItemProps {
  item: {
    id: string;
    task: string;
    completed: boolean;
  };
  onToggleCompletion: (id: string) => void;
  onEdit: (item: { id: string; task: string; completed: boolean }) => void; 
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggleCompletion, onEdit, onDelete }) => (
  <View style={styles.container}>
    <CheckboxTodo checked={item.completed} onPress={() => onToggleCompletion(item.id)} />
    <Text style={styles.task}>{item.task}</Text>
    <View style={styles.actionsContainer}>
      <ButtonIcon 
        iconName="pencil" 
        onPress={() => onEdit(item)} 
        color="#4CAF50" 
        testID="edit-button"  
      />
      <ButtonIcon 
        iconName="trash" 
        onPress={() => onDelete(item.id)} 
        color="#F44336" 
        testID="delete-button" 
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  task: {
    flex: 8,
    fontSize: 16,
  },
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default TodoItem;
