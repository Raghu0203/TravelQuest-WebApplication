import { render } from '@testing-library/react';
import Notification from '../components/Notifications/Notification';

describe('Notification component', () => {
  test('renders without crashing', () => {
    render(<Notification />);
  });

  test('renders a ToastContainer component', () => {
    const { getByRole } = render(<Notification />);
    const toastContainer = getByRole('alert');
    expect(toastContainer).toBeInTheDocument();
  });

  test('ToastContainer has the correct props set', () => {
    const { container } = render(<Notification />);
    const toastContainer = container.querySelector('.Toastify__toast-container');
    expect(toastContainer).toHaveAttribute('position', 'top-center');
    expect(toastContainer).toHaveAttribute('autoClose', '5000');
    expect(toastContainer).toHaveAttribute('hideProgressBar', 'true');
    expect(toastContainer).toHaveAttribute('closeOnClick', 'true');
    expect(toastContainer).toHaveAttribute('pauseOnHover', 'true');
    expect(toastContainer).toHaveAttribute('draggable', 'true');
    expect(toastContainer).toHaveAttribute('icon', 'false');
    expect(toastContainer).toHaveClass('custom-toast-container');
  });

  test('displays a new message every 10 seconds', () => {
    jest.useFakeTimers();
    const { container } = render(<Notification />);
    const initialMessage = container.querySelector('.Toastify__toast-body').textContent;
    jest.advanceTimersByTime(10000);
    const newMessage = container.querySelector('.Toastify__toast-body').textContent;
    expect(initialMessage).not.toBe(newMessage);
  });

  test('displays one of the predefined messages', () => {
    jest.useFakeTimers();
    const { container } = render(<Notification />);
    const messages = [
      'Try out the new challenges!',
      'Don\'t forget to check out the map!',
      'Provide feedback on the new challenges! We\'d love to hear from you!',
      'HaliHacks is coming up soon!',
      'Share your achievements with your friends on social media!',
    ];
    jest.advanceTimersByTime(10000);
    const newMessage = container.querySelector('.Toastify__toast-body').textContent;
    expect(messages).toContain(newMessage);
  });

  test('toast.success method is called with the correct arguments', () => {
    jest.useFakeTimers();
    const successMock = jest.spyOn(global, 'toast.success');
    const { container } = render(<Notification />);
    jest.advanceTimersByTime(10000);
    const newMessage = container.querySelector('.Toastify__toast-body').textContent;
    expect(successMock).toHaveBeenCalledWith(newMessage, expect.objectContaining({
      bodyClassName: 'notification-body notification-toast',
      position: 'top-center',
      autoClose: 5000,
    }));
  });
});
