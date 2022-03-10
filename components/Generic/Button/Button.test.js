import { render, screen } from "@testing-library/react";
import Button from ".";

test("Test button component", () => {
  render(<Button>Primary Button</Button>);
  screen.debug();
  const btn = screen.queryByText("Primary Button");
  expect(btn).toBeInTheDocument();
});
