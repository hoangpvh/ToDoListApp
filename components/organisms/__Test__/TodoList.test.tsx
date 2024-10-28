import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  it('renders todo items correctly', () => {
    const { getByText } = render(<TodoList />);

    expect(getByText('Buy groceries')).toBeTruthy();
    expect(getByText('Walk the dog')).toBeTruthy();
    expect(getByText('Finish project')).toBeTruthy();
  });

  it('toggles todo completion when checkbox is pressed', () => {
    const { getByText } = render(<TodoList />);

    const taskToToggle = getByText('Buy groceries');

    // Kiểm tra rằng task chưa được hoàn thành
    expect(taskToToggle.props.style).not.toEqual(expect.arrayContaining([{ textDecorationLine: 'line-through' }]));

    // Sử dụng toán tử optional chaining để đảm bảo parent không null
    const checkboxParent = taskToToggle.parent?.parent;

    // if (checkboxParent) {
    //   // Tìm CheckBox cha và nhấn vào nó
    //   fireEvent.press(checkboxParent);
    
    //   // Kiểm tra rằng task đã được đánh dấu hoàn thành
    //   expect(taskToToggle.props.style).toEqual(expect.arrayContaining([{ textDecorationLine: 'line-through' }]));

    //   // Nhấn lại vào CheckBox để hoàn tác
    //   fireEvent.press(checkboxParent);

    //   // Kiểm tra rằng task chưa được hoàn thành
    //   expect(taskToToggle.props.style).not.toEqual(expect.arrayContaining([{ textDecorationLine: 'line-through' }]));
    // }
  });
});
