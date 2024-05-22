import {fireEvent, render, screen} from '@testing-library/react'
import GameOver from './GameOver'

describe ("I want to see the component is rendered and works properly", () => {

    test("Game Over component is render and has titles", () => {
        render(<GameOver />);
        
        const componentTitle = screen.getByText(/game over/i);
        const bigTitle = screen.getByRole("heading", {level:1});
        const smallTitle = screen.getByRole("heading", {level:5});
        
        expect(componentTitle).toBeInTheDocument();
        expect(bigTitle).toBeInTheDocument();
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
})