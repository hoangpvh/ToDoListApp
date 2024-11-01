import Button from "@/components/atoms/AddButton";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

test("Button renders with correct label and triggers onPress", () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <Button label="Press Me" onPress={onPressMock} />,
  );
  const buttonElement = getByText("Press Me");
  expect(buttonElement).toBeTruthy();
  fireEvent.press(buttonElement);
  expect(onPressMock).toHaveBeenCalled();
});
