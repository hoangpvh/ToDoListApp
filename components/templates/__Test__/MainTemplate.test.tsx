import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import TodoList from "@/components/organisms/TodoList";

import MainTemplate from "../MainTemplate";

jest.mock("@/components/organisms/TodoList", () => {
  return jest.fn(() => <></>); // Mock TodoList component
});

describe("MainTemplate Component", () => {
  it("renders TodoList", () => {
    // const { getByTestId } = render(<MainTemplate />);

    expect(TodoList).toHaveBeenCalled();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <MainTemplate>
        <Text>Welcome to the Todo App!</Text>
      </MainTemplate>,
    );

    expect(getByText("Welcome to the Todo App!")).toBeTruthy();
  });
});
