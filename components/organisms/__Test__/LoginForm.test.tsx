import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import LoginForm from "@/components/organisms/LoginForm";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { Alert } from "react-native";

// Mocking the router
jest.mock("expo-router/build/global-state/router-store", () => ({
  useExpoRouter: jest.fn(),
}));

// Mocking the Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("LoginForm Component", () => {
  const routerMock = { push: jest.fn() };

  beforeEach(() => {
    (useExpoRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("renders email and password fields", () => {
    const { getByPlaceholderText } = render(<LoginForm />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("shows an error alert on invalid login", () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.changeText(getByPlaceholderText("Email"), "wrong_email");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong_pass");
    fireEvent.press(getByText("Login"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Wrong Email or Password",
    );
  });

  it("navigates to todolist on successful login", () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass");
    fireEvent.press(getByText("Login"));

    // Verify the success alert and navigation
    expect(Alert.alert).toHaveBeenCalledWith("Success", "Logged in with test");
    expect(routerMock.push).toHaveBeenCalledWith("todolist");
  });
});
