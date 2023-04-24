import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Register from "./Register"

afterEach(() => {
    cleanup();
})

test('renders Register page', () => {
    render(<Register />)

    expect(screen.getByPlaceholderText("FIRST NAME")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("LAST NAME")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("USERNAME")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("EMAIL")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("PASSWORD")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("RETYPE PASSWORD")).toHaveDisplayValue("");
    expect(screen.getByRole("button")).toHaveDisplayValue("SIGN UP");

    
})