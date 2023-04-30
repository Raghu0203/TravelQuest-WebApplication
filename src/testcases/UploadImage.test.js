import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImage from '../pages/Challenges/UploadImage';

describe('UploadImage', () => {
  test('renders without crashing', () => {
    render(<UploadImage />);
  });

  test('opens file upload dialog on click of Upload button', () => {
    render(<UploadImage />);
    const uploadBtn = screen.getByText('Upload');
    const fileInput = screen.getByLabelText('Upload');
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).not.toBeVisible();
    userEvent.click(uploadBtn);
    expect(fileInput).toBeVisible();
  });

  test('Verify button is disabled by default', () => {
    render(<UploadImage />);
    const verifyBtn = screen.getByText('Verify');
    expect(verifyBtn).toBeDisabled();
  });

  test('selecting a file sets the "selectedFile" state and displays a preview of the file', () => {
    render(<UploadImage />);
    const file = new File(['file contents'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload');
    userEvent.upload(fileInput, file);
    const previewImage = screen.getByAltText('preview');
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute('src', expect.stringContaining('blob'));
  });

  test('clicking Verify button calls handleUpload function and displays a success message', async () => {
    global.URL.createObjectURL = jest.fn(() => 'testurl');
    const originalPutObject = global.AWS.S3.prototype.putObject;
    global.AWS.S3.prototype.putObject = jest.fn().mockImplementation((params, cb) => {
      cb();
      return { on: () => {} };
    });
    const originalUpdateChallengesCompleted = global.updateChallengesCompleted;
    global.updateChallengesCompleted = jest.fn().mockResolvedValue({});
    const { container } = render(<UploadImage />);
    const file = new File(['file contents'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload');
    userEvent.upload(fileInput, file);
    const verifyBtn = screen.getByText('Verify');
    userEvent.click(verifyBtn);
    await screen.findByText('Image uploaded successfully!');
    expect(container.querySelector('img[src="testurl"]')).toBeInTheDocument();
    expect(global.AWS.S3.prototype.putObject).toHaveBeenCalledTimes(1);
    expect(global.updateChallengesCompleted).toHaveBeenCalledTimes(1);
    global.AWS.S3.prototype.putObject = originalPutObject;
    global.updateChallengesCompleted = originalUpdateChallengesCompleted;
  });

  test('renders Footer component', () => {
    render(<UploadImage />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
