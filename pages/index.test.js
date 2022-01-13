import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("Home page render test", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByTestId("hero-main-heading");

    expect(heading).toBeInTheDocument();
  });
});
