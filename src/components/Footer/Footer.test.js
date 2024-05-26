import {render, screen} from '@testing-library/react'
import Footer from './Footer.js'

describe("Footer component renders right", () => {
    test("Footer is rendered with list", () => {
        render(<Footer />);

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
    }) 

    test("Footer is rendered with 2 items in the list", () => {
        render(<Footer />);
        
        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBe(2);
    }) 

    test("Each list item contains the correct text", () => {
        render(<Footer />);
    
        const listItems = screen.getAllByRole("listitem");
        
        // Check the text of the first list item
        expect(listItems[0]).toHaveTextContent("By Sheila");
    
        // Check the text of the second list item
        expect(listItems[1]).toHaveTextContent("Created in 2024");
    });

});