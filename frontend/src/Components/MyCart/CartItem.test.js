import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CartItems from './CartItems'; // Correct relative path
import axiosInstance from '../../API/axiosInstance';
import { CARTS_URL, PRODUCT_URL } from '../../API/constants';
import { decodeToken } from 'react-jwt';

jest.mock('../../API/axiosInstance');
jest.mock('react-jwt', () => ({
  decodeToken: jest.fn(),
}));

describe('CartItems Component', () => {
  const mockCartData = {
    cartItems: [
      {
        _id: '1',
        productId: 'prod1',
        name: 'Product 1',
        selectedPackage: 'Package 1',
        quantity: 1,
        price: { $numberDecimal: '100.00' },
      },
      {
        _id: '2',
        productId: 'prod2',
        name: 'Product 2',
        selectedPackage: 'Package 2',
        quantity: 2,
        price: { $numberDecimal: '200.00' },
      },
    ],
  };

  const mockProductData = [
    { _id: 'prod1', image: 'image1.png' },
    { _id: 'prod2', image: 'image2.png' },
  ];

  beforeEach(() => {
    axiosInstance.get.mockImplementation((url) => {
      switch (url) {
        case `${CARTS_URL}/`:
          return Promise.resolve({ status: 200, data: mockCartData });
        case `${PRODUCT_URL}/prod1`:
          return Promise.resolve({ status: 200, data: mockProductData[0] });
        case `${PRODUCT_URL}/prod2`:
          return Promise.resolve({ status: 200, data: mockProductData[1] });
        default:
          return Promise.reject(new Error('not found'));
      }
    });
    axiosInstance.delete.mockResolvedValue({ status: 200 });
    axiosInstance.put.mockResolvedValue({ status: 200 });
    decodeToken.mockReturnValue({ _id: 'user1' });
    localStorage.setItem('jwt', 'fake-jwt-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart items', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CartItems />
        </BrowserRouter>
      );
    });
    await waitFor(() => expect(screen.getByText('Product 1 [Package 1]')).toBeInTheDocument());
    expect(screen.getByText('Product 2 [Package 2]')).toBeInTheDocument();
  });

  test('handles quantity change', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CartItems />
        </BrowserRouter>
      );
    });
    await waitFor(() => screen.getByText('Product 1 [Package 1]'));

    const addButton = screen.getAllByAltText('add')[0];
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(axiosInstance.put).toHaveBeenCalledWith(
        `${CARTS_URL}/update/1`,
        { newQuantity: 2 },
        expect.any(Object)
      );
    });
  });

  test('handles item deletion', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CartItems />
        </BrowserRouter>
      );
    });
    await waitFor(() => screen.getByText('Product 1 [Package 1]'));

    const deleteButton = screen.getAllByAltText('delete')[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        `${CARTS_URL}/remove/1`,
        expect.any(Object)
      );
    });
  });

  test('handles checkout confirmation', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CartItems />
        </BrowserRouter>
      );
    });
    await waitFor(() => screen.getByText('Product 1 [Package 1]'));

    const checkoutButton = screen.getByText('Checkout');
    await act(async () => {
      fireEvent.click(checkoutButton);
    });

    await waitFor(() => expect(screen.getByText('Confirm Checkout')).toBeInTheDocument());

    const confirmButton = screen.getByText('Confirm');
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Confirm Checkout')).not.toBeInTheDocument();
    });
  });
});
