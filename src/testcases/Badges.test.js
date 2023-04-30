import React from 'react';
import { render, screen } from '@testing-library/react';
import Badges from '../pages/Badges/Badges';
import AWS from 'aws-sdk';
import { useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

jest.mock('aws-sdk');
jest.mock('react-cookie');

describe('Badges', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<BrowserRouter><Badges /></BrowserRouter>);
  });

  it('fetches the user\'s completed challenges from DynamoDB', () => {
    const getItemMock = jest.fn((params, callback) => {
      const data = { Item: { challengesCompleted: { N: '10' } } };
      callback(null, data);
    });
    AWS.DynamoDB.mockImplementation(() => ({
      getItem: getItemMock,
    }));
    useCookies.mockReturnValueOnce([{ email: 'test@test.com' }]);

    render(<BrowserRouter><Badges /></BrowserRouter>);

    expect(getItemMock).toHaveBeenCalled();
    expect(getItemMock.mock.calls[0][0]).toEqual({
      TableName: 'TravelQuest_UserTable',
      Key: {
        email: { S: 'test@test.com' },
      },
    });
  });

  it('fetches the user\'s full name from cookies', () => {
    useCookies.mockReturnValueOnce([{ name: 'John Doe' }]);

    render(<BrowserRouter><Badges /></BrowserRouter>);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('fetches the user\'s email address from cookies', () => {
    useCookies.mockReturnValueOnce([{ email: 'test@test.com' }]);

    render(<BrowserRouter><Badges /></BrowserRouter>);

    expect(screen.getByText(/test@test\.com/i)).toBeInTheDocument();
  });

  describe('badgeImages function', () => {
    it('returns the correct array of images for 0 completed challenges', () => {
      useCookies.mockReturnValueOnce([{ email: 'test@test.com' }]);
      const wrapper = render(<BrowserRouter><Badges /></BrowserRouter>);
      const instance = wrapper.getInstance();

      expect(instance.badgeImages()).toEqual([
        'https://via.placeholder.com/250x250.png?text=Complete+more+challenges',
      ]);
    });

    it('returns the correct array of images for 25 completed challenges', () => {
      useCookies.mockReturnValueOnce([{ email: 'test@test.com' }]);
      const wrapper = render(<BrowserRouter><Badges /></BrowserRouter>);
      const instance = wrapper.getInstance();
      instance.setChallengesCompleted(25);

      expect(instance.badgeImages()).toEqual(['https://example.com/two.jpg']);
    });

    it('returns the correct array of images for 50 completed challenges', () => {
      useCookies.mockReturnValueOnce([{ email: 'test@test.com' }]);
      const wrapper = render(<BrowserRouter><Badges /></BrowserRouter>);
      const instance = wrapper.getInstance();
      instance.setChallengesCompleted(50);

      expect(instance.badgeImages()).toEqual([
        'https://example.com/two.jpg',
        'https://example.com/three.jpg',
      ]);
    });
    it('returns the correct array of images for 100 completed challenges', () => {
        const result = badgeImages(100);
        expect(result).toEqual([two, three, one]);
      });
    
      it('returns the correct array of images for 50 completed challenges', () => {
        const result = badgeImages(50);
        expect(result).toEqual([two, three]);
      });
    
      it('returns the correct array of images for 25 completed challenges', () => {
        const result = badgeImages(25);
        expect(result).toEqual([two]);
      });
    
      it('returns the correct array of images for less than 25 completed challenges', () => {
        const result = badgeImages(10);
        expect(result).toEqual([
          'https://via.placeholder.com/250x250.png?text=Complete+more+challenges',
        ]);
      });
    });
});    