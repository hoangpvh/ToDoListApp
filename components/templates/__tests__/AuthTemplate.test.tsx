import React from "react";
import { render } from "@testing-library/react-native"; 
import AuthTemplate from "@/components/templates/AuthTemplate";

// Mock the LoginForm component
jest.mock("@/components/organisms/LoginForm", () => {
  return () => <div></div>; 
});

describe("AuthTemplate", () => {
  it("should render LoginForm inside SafeAreaView", () => {
    const { getByText } = render(<AuthTemplate />); 

    // Check if the mocked LoginForm is in the document
    expect(getByText("")).toBeTruthy();
  });
});
