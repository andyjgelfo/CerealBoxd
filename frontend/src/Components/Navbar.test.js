import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Navbar from "./Navbar"

afterEach(() => {
    cleanup();
})

test('renders Navbar', () => {
    render(<Navbar />)

    expect(screen.getByRole("link", {name:"logo"})).toHaveAttribute('href');
    expect(screen.getByRole("link", {name:"ABOUT"})).toHaveAttribute('href');
    expect(screen.getByRole("link", {name:"CEREALS"})).toHaveAttribute('href');
    expect(screen.getByRole("link", {name:"LOGIN"})).toHaveAttribute('href');
    expect(screen.getByRole("link", {name:"REGISTER"})).toHaveAttribute('href');
    
})