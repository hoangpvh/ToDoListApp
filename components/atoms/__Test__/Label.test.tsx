import { render } from "@testing-library/react-native";
import React from "react";

import Label from "../Label";

describe("Label Component", () => {
  it("renders with the correct text", () => {
    const labelText = "Sample Label";
    const { getByText } = render(<Label text={labelText} />);

    expect(getByText(labelText)).toBeTruthy();
  });
});
