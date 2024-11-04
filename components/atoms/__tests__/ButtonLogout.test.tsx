import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import ButtonLogout from "@/components/atoms/ButtonLogout"; // Adjust the import path if necessary
import { clearTodos } from "@/slice/TodoSlice";

// Mock dependencies
jest.mock("@react-native-async-storage/async-storage", () => ({
  removeItem: jest.fn(),
}));
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("ButtonLogout component", () => {
  const mockRouterPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls router.push('/') when logout is successful", async () => {
    const { getByText } = render(<ButtonLogout />);

    fireEvent.press(getByText("Logout"));

    // Wait for the router.push call
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });
  });

  it("renders the logout button text", () => {
    const { getByText } = render(<ButtonLogout />);
    expect(getByText("Logout")).toBeTruthy();
  });

  it("calls AsyncStorage.removeItem, dispatches clearTodos, and navigates to '/' when pressed", async () => {
    const { getByText } = render(<ButtonLogout />);

    // Simulate pressing the button
    fireEvent.press(getByText("Logout"));

    // Wait for asynchronous actions to complete
    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");
      expect(mockDispatch).toHaveBeenCalledWith(clearTodos());
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });
  });

  it("logs an error if AsyncStorage.removeItem fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(new Error("AsyncStorage error"));

    const { getByText } = render(<ButtonLogout />);

    // Simulate pressing the button
    fireEvent.press(getByText("Logout"));

    // Wait for the error handling
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error during logout:", expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});
