import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";

describe("dashboard render test", () => {
  it("renders a heading", () => {
    render(<Dashboard />);

    const heading = screen.getByTestId("hero-main-heading");

    expect(heading).toBeInTheDocument();
  });
});
