import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ButtonIconProps {
  iconName: string;
  color: string;
  onPress: () => void;
  testID?: string; 
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ iconName, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button} testID="button">
    <Icon name={iconName} size={20} color={color} testID="icon" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    padding: 5,
  },
});

export default ButtonIcon;
