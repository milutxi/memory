import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

jest.useFakeTimers();

describe("App Component", () => {
  test("renders the App and it shows the text", () => {
    render(<App />);
    const linkElement = screen.getByText(/get the pairs/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("should show GameOver component when timer expires", async () => {
    render(<App />);

    // First, Game Over should not appear
    expect(screen.queryByText(/Game Over/i)).not.toBeInTheDocument();

    // Simulate the timer for 60 seconds
    jest.advanceTimersByTime(60 * 1000);

    // Wait for Game Over text to appear
    await waitFor(() => {
      expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    });
  });

  test("should reset the game when GameOver's restart button is clicked", async () => {
    render(<App />);

    // Simulate the timer for 60 seconds
    jest.advanceTimersByTime(60 * 1000);

    // Wait for Game Over text to appear
    await waitFor(() => {
      expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    });

    // Click the restart button
    fireEvent.click(screen.getByRole("button", { name: /Restart Game/i }));

    // Wait for Game Over text to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Game Over/i)).not.toBeInTheDocument();
    });
  });

  test("should start a new game when the new game button is clicked", () => {
    render(<App />);

    //click the new game button
    fireEvent.click(screen.getByText(/New Game/i));

    //check the timer is visible
    expect(screen.getByText(/Get the pairs/i)).toBeInTheDocument();
  });

  test("should handle card flips correctly", () => {
    render(<App />);

    //simulate flipping two cards
    const backImages= screen.getAllByTestId('back-image');
    fireEvent.click(backImages[0]);
    fireEvent.click(backImages[1]);

    //check that the two cards are flipped
    const cardInners = screen.getAllByTestId('card-inner');
    expect(cardInners[0]).toHaveClass('flipped');
    expect(cardInners[1]).toHaveClass('flipped');
  });

});
