import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import ForgotPass from "./ForgotPass"

afterEach(() => {
    cleanup();
})

test('renders confirm page', () => {
    render(<ForgotPass />)

    expect(screen.getByPlaceholderText("USERNAME")).toHaveDisplayValue("");
    expect(screen.getByRole("button")).toHaveDisplayValue("SUBMIT");
    
    
})