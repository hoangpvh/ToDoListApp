import React from 'react';
import { CheckBox } from 'react-native-elements';

interface CheckboxTodoProps {
  checked: boolean;
  onPress: () => void;
}

const CheckboxTodo: React.FC<CheckboxTodoProps> = ({ checked, onPress }) => (
  <CheckBox
    checked={checked}
    onPress={onPress}
    containerStyle={{ marginRight: 10 }}
    testID="checkbox-todo"
  />
);

export default CheckboxTodo;
