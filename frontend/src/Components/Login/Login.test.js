import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../../API/axiosInstance';
import Login from './Login';

jest.mock('../../API/axiosInstance');

describe('Login Component', () => {
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: '', assign: jest.fn() };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = '';
  });

  test('renders Login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getAllByText('LOG IN')[0]).toBeInTheDocument();
    expect(screen.getAllByText('LOG IN')[1]).toBeInTheDocument();
    expect(screen.getByLabelText('EMAIL ADDRESS *')).toBeInTheDocument();
    expect(screen.getByLabelText('PASSWORD *')).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    axiosInstance.post.mockResolvedValue({
      status: 200,
      data: {
        token: 'fake-jwt-token',
        message: 'Login successful',
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('EMAIL ADDRESS *'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('PASSWORD *'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('LOG IN', { selector: 'button' }));

    await waitFor(() => {
      expect(screen.getByText('Login successful')).toBeInTheDocument();
      expect(localStorage.getItem('jwt')).toBe('fake-jwt-token');
    });
  });

  test('handles login error', async () => {
    axiosInstance.post.mockRejectedValue({
      response: {
        status: 401,
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('EMAIL ADDRESS *'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('PASSWORD *'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('LOG IN', { selector: 'button' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('redirects to register page', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('CREATE ACCOUNT'));
    expect(window.location.href).toBe('/register');
  });

//   test('redirects to forgot password page', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     fireEvent.click(screen.getByText('Forgot password?'));
//     expect(window.location.href).toBe('/forgot-password');
//   });
});
