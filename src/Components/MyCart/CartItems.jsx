import React, { useState } from 'react';
import prod from '../../Assets/flakes.png';
import './CartItems.css';
import addIcon from '../../Assets/add.png';
import minusIcon from '../../Assets/minus.png';
import deleteIcon from '../../Assets/delete.png'

const CartItems = () => {
  const [items, setItems] = useState([
    { id: 1, quantity: 1, title: 'Product 1', price: 100 },
    { id: 2, quantity: 2, title: 'Product 2', price: 600 },
    { id: 3, quantity: 3, title: 'Product 3', price: 300 },
    { id: 4, quantity: 2, title: 'Product 4', price: 700 },
    { id: 5, quantity: 7, title: 'Product 5', price: 900 },
    { id: 6, quantity: 5, title: 'Product 5', price: 900 },
  ]);

  const handleAdd = () => {
    // ADD
  };

  const handleDelete = (id) => {
    // DELETE
  };

  const handleQuantityChange = (id, change) => {
    setItems(items.map(item => item.id === id ? {...item, quantity: item.quantity + change} : item));
  };

  const handleCheckout = () => {
    // CHECKOUT
  };

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 50;
  const total = subtotal + shippingCost;

  return (
    <div className="grid-container">
      <div className="elements-container">
        <div className="grid-item">
          <div className="cart-container">
            <div className="flex-container">
              <div className="items-container">
                {items.map((item) => (
                  <div key={item.id} className="item">
                    <img src={prod} alt={item.title} />
                    <div className="item-details">
                      <p> {item.title}</p>
                      <div className="price-quantity-container">
                        <div className="price-container">
                          <p> PHP {item.price}</p>
                        </div>
                        <div className="quantity-container">
                          <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, -1)}>
                            <img src={minusIcon} alt="minus"/>
                          </button>
                          <div className="quantity-value">{item.quantity}</div>
                          <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, 1)}>
                            <img src={addIcon} alt="add"/>
                          </button>
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                        <img src={deleteIcon} alt="delete"/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn add-btn" onClick={handleAdd}>Add Item</button>
              </div>
              <div className="checkout-container">
                <h2>Order Summary</h2>
                <h3>In cart:</h3>
                <div className="cart-items">
                  {items.map((item) => (
                    <p key={item.id}>
                      {item.title} ({item.quantity}) - PHP {item.price * item.quantity}
                    </p>
                  ))}
                </div>
                <div className="totals">
                  <p><strong>Subtotal:</strong> PHP {subtotal}</p>
                  <p><strong>Shipping Cost:</strong> PHP {shippingCost}</p>
                  <p><strong>Total:</strong> PHP {total}</p>
                </div>
                <button className="btn checkout-btn" onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
