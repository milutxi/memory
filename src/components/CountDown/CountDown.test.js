import { render, screen } from "@testing-library/react";

import CountDown from "./CountDown";

describe("CountDown Component", () => {
  test("renders with correct initial time", () => {
    render(<CountDown duration={60000} />);

    const minutes = screen.getByTestId("minutes");
    const seconds = screen.getByTestId("seconds");
    const millisec = screen.getByTestId("millisec");

    expect(minutes).toHaveTextContent("1");
    expect(seconds).toHaveTextContent("0");
    expect(millisec).toHaveTextContent("0");
  });

  test("need to have explain text", () => {
    render(<CountDown />);

    const minTime=screen.getByText(/Min/i);
    expect(minTime).toBeInTheDocument();
  })

  test("need to have seconds", () => {
    render(<CountDown />);

    const secTime=screen.getByText(/Seconds/i);
    expect(secTime).toBeInTheDocument();
  })

  test("need to have milliseconds", () => {
    render(<CountDown />);

    const milTime=screen.getByText(/Mill/i);
    expect(milTime).toBeInTheDocument();
  })

});
