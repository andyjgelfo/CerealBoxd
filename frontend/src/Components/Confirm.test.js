import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Confirm from "./Confirm"

afterEach(() => {
    cleanup();
})

test('renders confirm page', () => {
    render(<Confirm />)

    expect(screen.getByPlaceholderText("CODE")).toHaveDisplayValue("");
    expect(screen.getByRole("button")).toHaveDisplayValue("SUBMIT");
})