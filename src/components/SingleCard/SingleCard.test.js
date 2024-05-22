import {render, screen, fireEvent} from '@testing-library/react'
import SingleCard from './SingleCard'

describe("SingleCard component renders and show front and back sida", () => {
    const mockCard = {src:'/img/picture.png'};
    const handleChoice = jest.fn();

    test("renders card front and back images", () => {
        render(<SingleCard card={mockCard} />)

        const frontImage = screen.getByAltText("card front");
        const backImage = screen.getByAltText("card back");
        const anotherfrontImage = screen.getByTestId("front-image");
        const anotherbackImage = screen.getByTestId("back-image");

        expect(frontImage).toBeInTheDocument();
        expect(backImage).toBeInTheDocument();
        expect(anotherfrontImage).toBeInTheDocument();
        expect(anotherbackImage).toBeInTheDocument();
    })

    test("calls handleChoice on card click when not disabled", ()=> {
        render(<SingleCard card={mockCard} handleChoice={handleChoice} disabled={true} />)

        const backImage = screen.getByAltText("card back");

        fireEvent.click(backImage);
        expect(handleChoice).not.toHaveBeenCalled();
    })

    test("Applies flipped class when flipped is true", () => {
        render (<SingleCard card={mockCard} flipped={true} />)

        const cardInner = screen.getByTestId("card-inner");
        expect(cardInner).toHaveClass('flipped');
    })
})