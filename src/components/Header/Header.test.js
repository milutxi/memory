import {render, screen} from '@testing-library/react'
import Header from './Header'

describe("Check the Header Component renders as it should", () => {
    test ("The page title renders as memory game", () => {
        render (<Header />)

        const pageTitle = screen.getByText(/memory game/i);
        expect(pageTitle).toBeInTheDocument();
        
    })

    test("The page title needs to be in level one", () => {
        render(<Header />)
        const title = screen.getByRole("heading", {level:1});
        expect(title).toBeInTheDocument(); 
    })

    test ("The header needs to have family word in the subtitle", () => {
        render (<Header />)
    
        const subtitle = screen.getByText(/family/i);
        expect(subtitle).toBeInTheDocument();
    })

    test("The header has to have a subtitle", ()=> {
        render(<Header />)

        const anotherTitle = screen.getByRole("heading", {level:4});
        expect(anotherTitle).toBeInTheDocument();
    })

});