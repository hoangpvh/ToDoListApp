import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonIcon from '@/components/atoms/ButtonIcon'; 
import Icon from 'react-native-vector-icons/Ionicons';

describe('ButtonIcon', () => {
  it('should render the icon with correct name and color', () => {
    const { getByTestId } = render(
      <ButtonIcon iconName="pencil" color="blue" onPress={() => {}} />
    );
    const button = getByTestId('button');
    expect(button).toBeTruthy();
    const icon = button.findByType(Icon);
    expect(icon.props.name).toBe('pencil');
    expect(icon.props.color).toBe('blue');
  });

  it('should trigger the onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ButtonIcon iconName="pencil" color="blue" onPress={mockOnPress} />
    );
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
