import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Login from "./Login"

afterEach(() => {
    cleanup();
})

describe('renders login page', () => {
    render(<Login />)

    expect(screen.getByText("LOGIN")).toBe()
    
})