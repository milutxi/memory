import {render, screen} from '@testing-library/react'
import Header from './Header'

test ("The page title renders", () => {
    render (<Header />)

    const pageTitle = screen.getByText(/memory game/i);
    expect(pageTitle).toBeInTheDocument();
    
    const title = screen.getByRole("heading", {level:1});
    expect(title).toBeInTheDocument();
})