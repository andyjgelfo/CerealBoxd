import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Login from "./Login"

afterEach(() => {
    cleanup();
})

test('renders login page', () => {
    render(<Login />)

    expect(screen.getByPlaceholderText("USERNAME")).toHaveDisplayValue("");
    expect(screen.getByPlaceholderText("PASSWORD")).toHaveDisplayValue("");
    expect(screen.getByRole("button")).toHaveDisplayValue("SIGN IN");
    expect(screen.getByRole("link", {name:"Don't Have An Account? Register Here!"})).toHaveAttribute('href')
    expect(screen.getByRole("link", {name:"Forgot Your Password?"})).toHaveAttribute('href')
    
})