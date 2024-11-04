import ButtonAdd from "@/components/atoms/ButtonAdd";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

test("Button renders with correct label and triggers onPress", () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <ButtonAdd label="Press Me" onPress={onPressMock} />,
  );
  const buttonElement = getByText("Press Me");
  expect(buttonElement).toBeTruthy();
  fireEvent.press(buttonElement);
  expect(onPressMock).toHaveBeenCalled();
});
