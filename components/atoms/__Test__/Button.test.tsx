import Button from "@/components/atoms/Button";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

// Assuming styles are imported or defined in the same file
// import styles from "@/path/to/styles"; // Import your styles if needed

test("Button renders with correct label and triggers onPress", () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <Button label="Press Me" onPress={onPressMock} />,
  );

  // Check if button renders with the correct label
  const buttonElement = getByText("Press Me");

  expect(buttonElement).toBeTruthy();

  // Simulate button press
  fireEvent.press(buttonElement); // Only use `press` event

  // Here you need to check if the button shows the pressed style
  // You might need to verify it after `onPress` is called or through some state change.
  expect(onPressMock).toHaveBeenCalled();
});
