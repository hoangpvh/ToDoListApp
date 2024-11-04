import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LoginForm from "@/components/organisms/LoginForm";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("expo-router/build/global-state/router-store", () => ({
  useExpoRouter: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.spyOn(Alert, "alert").mockImplementation(() => { });

describe("LoginForm Component", () => {
  const routerMock = { push: jest.fn() };

  beforeEach(() => {
    (useExpoRouter as jest.Mock).mockReturnValue(routerMock);
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders email and password fields", () => {
    const { getByPlaceholderText } = render(<LoginForm />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("checks login status on mount and navigates to todolist if user is logged in", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ email: "test", password: "pass" }));
    render(<LoginForm />);
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledWith("todolist");
    });
  });

  it("logs an error if retrieving data from AsyncStorage fails", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error("AsyncStorage error"));
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    render(<LoginForm />);
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith('Error retrieving data', expect.any(Error));
    });
    consoleErrorMock.mockRestore();
  });

  it("shows an error alert on invalid login", () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "wrong_email");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong_pass");
    fireEvent.press(getByText("Login"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Wrong Email or Password"
    );
  });

  it("alerts success, saves user data, and navigates to todolist on successful login", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const setItemMock = AsyncStorage.setItem as jest.Mock;
    setItemMock.mockResolvedValue(undefined); // Correctly mock as a resolved promise without a return value
    fireEvent.changeText(getByPlaceholderText("Email"), "test");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass");
    fireEvent.press(getByText("Login"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Logged in with test");
    });
    expect(setItemMock).toHaveBeenCalledWith('user', JSON.stringify({ email: "test", password: "pass" }));
    expect(routerMock.push).toHaveBeenCalledWith("todolist");
  });

  it("does not navigate if the email or password is incorrect", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "wrong_email");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong_pass");
    fireEvent.press(getByText("Login"));
    expect(routerMock.push).not.toHaveBeenCalled();
  });

});
