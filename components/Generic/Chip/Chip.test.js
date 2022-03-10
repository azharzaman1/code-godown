import { render, screen, fireEvent } from "@testing-library/react";
import Chip from "./index";

test("Test Chip", () => {
  render(<Chip>Chip label</Chip>);
  screen.debug();

  expect(screen.queryByText("Chip label")).toBeInTheDocument();
});
