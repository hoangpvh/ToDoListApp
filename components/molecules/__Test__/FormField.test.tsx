import { fireEvent,render } from "@testing-library/react-native";
import React from "react";

import FormField from "../FormField";

describe("FormField Component", () => {
  it("renders the label and input with correct props", () => {
    const label = "Username";
    const value = "test_user";
    const onChangeTextMock = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <FormField label={label} value={value} onChangeText={onChangeTextMock} />,
    );

    expect(getByText(label)).toBeTruthy();

    const input = getByPlaceholderText(label);
    expect(input.props.value).toBe(value);
  });

  it("triggers onChangeText when input value changes", () => {
    const label = "Password";
    const value = "";
    const onChangeTextMock = jest.fn();

    const { getByPlaceholderText } = render(
      <FormField
        label={label}
        value={value}
        onChangeText={onChangeTextMock}
        secureTextEntry
      />,
    );

    const input = getByPlaceholderText(label);

    fireEvent.changeText(input, "new_password");

    expect(onChangeTextMock).toHaveBeenCalledWith("new_password");
  });
});
