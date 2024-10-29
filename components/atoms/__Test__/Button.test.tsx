import { fireEvent,render } from "@testing-library/react-native";
import React from "react";

import Button from "../Button";

test("Button renders with correct label and triggers onPress", () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <Button label="Press Me" onPress={onPressMock} />,
  );

  expect(getByText("Press Me")).toBeTruthy();

  fireEvent.press(getByText("Press Me"));

  expect(onPressMock).toHaveBeenCalled();
});
