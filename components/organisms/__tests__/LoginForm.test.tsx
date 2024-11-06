import React from "react";
import { fireEvent, render, waitFor, act } from "@testing-library/react-native";
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

  it("checks login status on mount and navigates to todolist if user is logged in", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ email: "test", password: "pass" }));
    render(<LoginForm />);
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledWith("todolist");
    });
  });

  it("redirects to 'todolist' if user is found in AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ email: "test" })
    );

    render(<LoginForm />);

    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledWith("todolist");
    });
  });

  it("does not redirect and hides loading indicator if no user is found in AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { queryByTestId } = render(<LoginForm />);

    await waitFor(() => {
      expect(routerMock.push).not.toHaveBeenCalled();
      expect(queryByTestId("loading-indicator")).toBeNull();
    });
  });

  it("shows an error alert on invalid login", async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<LoginForm />);
    await act(async () => {
      await waitFor(() => {
        expect(queryByTestId("loading-indicator")).toBeNull();
      });
    });
    fireEvent.changeText(getByPlaceholderText("Email"), "wrong_email");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong_pass");
    fireEvent.press(getByText("Login"));
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Wrong Email or Password");
  });

  it("alerts success, saves user data, and navigates to todolist on successful login", async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<LoginForm />);
    const setItemMock = AsyncStorage.setItem as jest.Mock;
    const routerMock = require("expo-router/build/global-state/router-store").useExpoRouter();

    // Mock AsyncStorage's setItem method to resolve without errors
    setItemMock.mockResolvedValue(undefined);

    // Wait for the loading state to complete
    await act(async () => {
      await waitFor(() => expect(queryByTestId("loading-indicator")).toBeNull());
    });

    // Simulate form input and submission
    fireEvent.changeText(getByPlaceholderText("Email"), "test");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass");
    fireEvent.press(getByText("Login"));

    // Check alert and storage actions
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Logged in with test");
    });
    expect(setItemMock).toHaveBeenCalledWith("user", JSON.stringify({ email: "test", password: "pass" }));
    expect(routerMock.push).toHaveBeenCalledWith("todolist");
  });
});