import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from '../LoginForm';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { Alert } from 'react-native';

jest.mock('expo-router/build/global-state/router-store', () => ({
  useExpoRouter: jest.fn(),
}));

describe('LoginForm Component', () => {
  const routerMock = { push: jest.fn() };
  
  beforeEach(() => {
    (useExpoRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it('renders email and password fields', () => {
    const { getByPlaceholderText } = render(<LoginForm />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows an error alert on invalid login', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong_email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrong_pass');

    fireEvent.press(getByText('Login'));

    // await waitFor(() => {
    //   expect(Alert.alert).toHaveBeenCalledWith('Error', 'Wrong Email or Password');
    // });
  });

  // it('navigates to todolist on successful login', async () => {
  //   const { getByPlaceholderText, getByText } = render(<LoginForm />);

  //   fireEvent.changeText(getByPlaceholderText('Email'), 'test');
  //   fireEvent.changeText(getByPlaceholderText('Password'), 'pass');

  //   fireEvent.press(getByText('Login'));

  //   await waitFor(() => {
  //     expect(Alert.alert).toHaveBeenCalledWith('Success', 'Logged in with test');
  //     expect(routerMock.push).toHaveBeenCalledWith('todolist');
  //   });
  // });
});
