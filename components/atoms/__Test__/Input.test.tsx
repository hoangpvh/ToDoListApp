import Input from "@/components/atoms/Input";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("Input Component", () => {
  test("renders with correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChangeText={() => {}} />,
    );
    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  test("calls onChangeText with new text when typing", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={onChangeTextMock}
      />,
    );
    fireEvent.changeText(getByPlaceholderText("Enter text"), "New text");
    expect(onChangeTextMock).toHaveBeenCalledWith("New text");
  });

  test("secureTextEntry hides input text when true", () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Password"
        value="secret"
        onChangeText={() => {}}
        secureTextEntry={true}
      />,
    );
    const input = getByPlaceholderText("Password");
    expect(input.props.secureTextEntry).toBe(true);
  });
});
