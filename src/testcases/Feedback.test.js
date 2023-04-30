import { render, screen, fireEvent } from "@testing-library/react";
import Feedback from "../components/Feedback/Feedback";

describe("Feedback component", () => {
  test("renders without crashing", () => {
    render(<Feedback />);
  });

  test("renders the 'Write a Review' header", () => {
    render(<Feedback />);
    const headerElement = screen.getByText("Write a Review");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the rating component", () => {
    render(<Feedback />);
    const ratingElement = screen.getByLabelText("Rate the challenge");
    expect(ratingElement).toBeInTheDocument();
  });

  test("renders the 'Write a Review' input", () => {
    render(<Feedback />);
    const inputElement = screen.getByLabelText("Write a Review");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders the 'Send' button", () => {
    render(<Feedback />);
    const buttonElement = screen.getByLabelText("review");
    expect(buttonElement).toBeInTheDocument();
  });

  test("adds a review to the reviews list when the 'Send' button is clicked", () => {
    const { getByLabelText, getByText } = render(<Feedback />);
    const ratingElement = getByLabelText("Rate the challenge");
    const inputElement = getByLabelText("Write a Review");
    const buttonElement = getByLabelText("review");
    fireEvent.change(ratingElement, { target: { value: 4 } });
    fireEvent.change(inputElement, { target: { value: "Great challenge!" } });
    fireEvent.click(buttonElement);
    const reviewElement = getByText("Great challenge!");
    expect(reviewElement).toBeInTheDocument();
  });

  test("renders the reviews list when there are reviews in local storage", () => {
    const mockReviews = [{ value: 4, review: "Great challenge!" }];
    localStorage.setItem("reviewsList", JSON.stringify(mockReviews));
    const { getByText } = render(<Feedback />);
    const reviewElement = getByText("Great challenge!");
    expect(reviewElement).toBeInTheDocument();
    localStorage.removeItem("reviewsList");
  });

  test("does not render the reviews list when there are no reviews in local storage", () => {
    localStorage.removeItem("reviewsList");
    const { queryByText } = render(<Feedback />);
    const reviewElement = queryByText("Reviews");
    expect(reviewElement).not.toBeInTheDocument();
  });

  test("displays the correct rating for each review in the reviews list", () => {
    const mockReviews = [{ value: 4, review: "Great challenge!" }];
    localStorage.setItem("reviewsList", JSON.stringify(mockReviews));
    const { getByLabelText } = render(<Feedback />);
    const ratingElement = getByLabelText("rating-0");
    expect(ratingElement).toHaveValue(4);
    localStorage.removeItem("reviewsList");
  });

  test("displays the correct review text for each review in the reviews list", () => {
    const mockReviews = [{ value: 4, review: "Great challenge!" }];
    localStorage.setItem("reviewsList", JSON.stringify(mockReviews));
    const { getByText } = render(<Feedback />);
    const reviewElement = getByText("Great challenge!");
    expect(reviewElement).toBeInTheDocument();
    localStorage.removeItem("reviewsList");
  });
});
