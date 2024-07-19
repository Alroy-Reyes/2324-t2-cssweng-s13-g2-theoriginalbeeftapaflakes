import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../../API/axiosInstance';
import Register from './Register';

jest.mock('../../API/axiosInstance');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Register component', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByText('CREATE YOUR ACCOUNT')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Username *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password *')).toBeInTheDocument();
  });

  test('handles successful registration', async () => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout

    axiosInstance.post.mockResolvedValue({
      status: 201,
      data: {
        message: 'Registration successful',
      },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('CREATE ACCOUNT'));

    await waitFor(() => {
      expect(screen.getByText('Registration successful')).toBeInTheDocument();
    });

    jest.runAllTimers(); // Run all timers to trigger the setTimeout immediately

    // Check if the navigation to the login page was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    jest.useRealTimers(); // Restore real timers
  });

  test('handles email validation error', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('CREATE ACCOUNT'));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  test('handles server error responses', async () => {
    axiosInstance.post.mockRejectedValue({
      response: {
        status: 400,
        data: {
          message: 'Email already exists',
          errorOption: 'email',
        },
      },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText('Username *'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('CREATE ACCOUNT'));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });
});
