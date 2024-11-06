import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckboxTodo from '@/components/atoms/CheckboxTodo';

describe('CheckboxTodo', () => {
  it('should render with correct initial checked state', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CheckboxTodo checked={true} onPress={onPressMock} />
    );
    const checkbox = getByTestId('checkbox-todo');
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it('should call onPress when checkbox is pressed', () => {
    const onPressMock = jest.fn();  
    const { getByRole } = render(<CheckboxTodo checked={false} onPress={onPressMock} />);
    const checkbox = getByRole('checkbox');
    fireEvent.press(checkbox);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should toggle checked state on press', () => {
    let checkedState = false;
    const toggleChecked = () => {
      checkedState = !checkedState;
    };
    const { getByRole } = render(
      <CheckboxTodo checked={checkedState} onPress={toggleChecked} />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.press(checkbox);
    expect(checkedState).toBe(true);  
  });
});
