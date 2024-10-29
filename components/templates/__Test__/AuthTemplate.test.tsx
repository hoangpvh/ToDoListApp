import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import LoginForm from "@/components/organisms/LoginForm";

import AuthTemplate from "../AuthTemplate";

jest.mock("@/components/organisms/LoginForm", () => {
  return jest.fn(() => <></>); // Mock LoginForm component
});

describe("AuthTemplate Component", () => {
  it("renders LoginForm", () => {
    const { getByTestId } = render(<AuthTemplate />);

    expect(LoginForm).toHaveBeenCalled();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <AuthTemplate>
        <Text>Welcome to the App!</Text>
      </AuthTemplate>,
    );

    expect(getByText("Welcome to the App!")).toBeTruthy();
  });
});
