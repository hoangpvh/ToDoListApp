import React from 'react';
import { render } from '@testing-library/react-native';
import MainTemplate from '../MainTemplate';
import TodoList from '@/components/organisms/TodoList'
import { Text } from 'react-native';

jest.mock('@/components/organisms/TodoList', () => {
  return jest.fn(() => <></>); // Mock TodoList component
});

describe('MainTemplate Component', () => {
  it('renders TodoList', () => {
    const { getByTestId } = render(<MainTemplate />);
    
    expect(TodoList).toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <MainTemplate>
        <Text>Welcome to the Todo App!</Text>
      </MainTemplate>
    );

    expect(getByText('Welcome to the Todo App!')).toBeTruthy();
  });
});
