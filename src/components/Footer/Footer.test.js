import {render, screen} from '@testing-library/react'
import Footer from './Footer.js'

test("Footer is rendered", () => {
    render(<Footer />);

    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(listItems.length).toBe(2);
}) 