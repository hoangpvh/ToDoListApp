import Label from "@/components/atoms/Label";
import { render } from "@testing-library/react-native";
import React from "react";

describe("Label Component", () => {
  it("renders with the correct text", () => {
    const labelText = "Sample Label";
    const { getByText } = render(<Label text={labelText} />);

    expect(getByText(labelText)).toBeTruthy();
  });
});
