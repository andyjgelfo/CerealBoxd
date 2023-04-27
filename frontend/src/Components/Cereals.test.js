import { render, screen, cleanup, fireEvent} from "@testing-library/react";

// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Cereals from "./Cereals"

afterEach(() => {
    cleanup();
})

test('renders Cereals page', () => {
    render(<Cereals />)
    
    expect(screen.getByRole('textbox')).toHaveDisplayValue("");
    expect(screen.getByRole("button")).toBeDefined();
})

