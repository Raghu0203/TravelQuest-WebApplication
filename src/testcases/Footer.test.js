import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('renders the footer element', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  test('renders the TravelExploreIcon', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('svg[data-testid="travel-explore-icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('renders the TRAVELQUEST title', () => {
    const { getByText } = render(<Footer />);
    const title = getByText('TRAVELQUEST');
    expect(title).toBeInTheDocument();
  });

  test('renders the All Rights Reserved message', () => {
    const { getByText } = render(<Footer />);
    const message = getByText('All Rights Reserved © 2023');
    expect(message).toBeInTheDocument();
  });

  test('renders the Twitter icon', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('svg[data-testid="twitter-icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('renders the Facebook icon', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('svg[data-testid="facebook-icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('renders the Instagram icon', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('svg[data-testid="instagram-icon"]');
    expect(icon).toBeInTheDocument();
  });
});
