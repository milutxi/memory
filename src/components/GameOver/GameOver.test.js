import {fireEvent, render, screen} from '@testing-library/react'
import GameOver from './GameOver'

describe ("I want to see the component is rendered and works properly", () => {

    test("Game Over component is render and has titles", () => {
        render(<GameOver />);
        
        const componentTitle = screen.getByText(/game over/i);
        expect(componentTitle).toBeInTheDocument();
    })

    test("Game over component has a title level 1", () => {
        render(<GameOver />);
        
        const bigTitle = screen.getByRole("heading", {level:1});
        expect(bigTitle).toBeInTheDocument();
    })

    test("The component has a title level 5", () => {
        render(<GameOver />);
        
        const smallTitle = screen.getByRole("heading", {level:5});
        expect(smallTitle).toBeInTheDocument();       
    })
    
    test("Restart button is working", () => {
        const onRestart = jest.fn();
        render(<GameOver onRestart={onRestart} />);

        const button = screen.getByRole("button", {name: /restart game/i});
        expect (button).toBeInTheDocument();

        fireEvent.click(button);
        expect(onRestart).toHaveBeenCalledTimes(1);
    })

    test("renders 'Time Finished' text", () => {
        render(<GameOver />);

        const timeFinishedText = screen.getByText(/time finished/i);
        expect(timeFinishedText).toBeInTheDocument();
    });

})