import { render, screen, waitFor } from '@testing-library/react';
import Map from '../pages/Map/Map';

describe('Map component', () => {
  it('should render without crashing', () => {
    render(<Map />);
  });

  it('should load the Google Maps API and display a map', async () => {
    render(<Map />);
    const mapElement = screen.getByRole('application');
    await waitFor(() => expect(mapElement).toBeInTheDocument());
  });

  it('should display the current location marker on the map', async () => {
    render(<Map />);
    const currentLocationMarker = await screen.findByTitle('Current Location');
    expect(currentLocationMarker).toBeInTheDocument();
  });

  it('should search for places and display them on the map', async () => {
    render(<Map />);
    const searchBox = await screen.findByPlaceholderText('Search for places or addresses');
    searchBox.value = 'Halifax Public Gardens';
    searchBox.dispatchEvent(new window.Event('input'));
    await waitFor(() => expect(screen.getByText('Public Gardens')).toBeInTheDocument());
  });

  it('should open a new tab with the correct URL when "Get Directions" is clicked', async () => {
    render(<Map />);
    const searchBox = await screen.findByPlaceholderText('Search for places or addresses');
    searchBox.value = 'Halifax Public Gardens';
    searchBox.dispatchEvent(new window.Event('input'));
    const getDirectionsButton = await screen.findByText('Get Directions');
    getDirectionsButton.click();
    await waitFor(() => expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://www.google.com/maps/dir/')));
  });

  it('should render the Footer component at the bottom of the page', () => {
    render(<Map />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
