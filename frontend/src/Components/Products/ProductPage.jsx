import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import image from '../../Assets/fprod2.JPG';

const Product = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const handleProductsList = async () => {
            const productId = '';
            try {
                const response = fetch(`/api/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': `Bearer ${accessToken}` // Include authorization token if needed
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch product')
                }

                const productData = (await response).json();
                console.log('Product: ', productData);

            } catch (error) {
                console.error('Error fetching cart:', error.message);
            }
        };

        handleProductsList();
    }, []);
    
    // Initialize quantity state to 1
    const [quantity, setQuantity] = useState(1);

    const [selectedPackage, setSelectedPackage] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    const [showWarning, setShowWarning] = useState(false);
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to update the selected package
    const handlePackageSelection = (productpackage) => {
        setSelectedPackage(currentPackage => currentPackage === productpackage ? '' : productpackage);
        setShowWarning(false);
    };

    // Function to dynamically update price based on package
    const getPrice = () => {
        switch (selectedPackage) {
            case 'Package A':
                return 'P3,950';
            case 'Package B':
                return 'P6,150';
            default:
                return 'P3,950 - P6,150';
        }
    };

    // Function that displays an error message if the user hasn't selected a package
    const handleAddToCart = () => {
        if (!selectedPackage) {
          setWarningMessage('Please select a package');
          setShowWarning(true);
        } else {
          // Proceed with add to cart functionality
          setShowWarning(false);
          console.log("Product added to cart:", { selectedPackage, quantity });
          // Add to cart logic here
        }
    };

    // Example review data
    const [reviews] = useState([
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great product, highly recommend!' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Really good, but the size was slightly off.' },
        // Add more reviews as needed
    ]);
  
    return (
        <div className="product-container">
            <div className="p-details-container">
                <div className="p-image-gallery">
                    <img src={image} alt="Reseller Package" />
                    {/* Add additional thumbnails or a carousel as needed */}
                </div>
                <div className="product-details">
                    <h1>Reseller Package</h1>
                    <p className="p-amount">24 Bottles/Box</p>
                    <p className="p-price">{getPrice()}</p>
                    <ul>
                        <li>Classic: 8 Bottles</li>
                        <li>Sisig: 8 Bottles</li>
                        <li>Spicy: 8 Bottles</li>
                    </ul>
                    <div className="p-quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        min="1" 
                        value={quantity} // Set value to quantity state
                        onChange={handleQuantityChange} // Update state on change
                        />
                    </div>
                    <button
                        className="p-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                    {showWarning && (
                        <div className="p-error-bubble">
                            {warningMessage}
                        </div>
                    )}
                    <div className="p-package-selector">
                        {['Package A', 'Package B'].map((productpackage) => (
                            <button
                                key={productpackage}
                                onClick={() => handlePackageSelection(productpackage)}
                                className={selectedPackage === productpackage ? 'p2-package-button selected' : 'p2-package-button'}
                            >
                                {productpackage}
                            </button>
                        ))}
                    </div>
                    <ul>
                        <li>Ingredients: Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices,
                            and Vegetable Oil.</li>
                        <li>Nutritional Info: Placeholder</li>
                    </ul>
                </div>
            </div>
            {/* Dynamic customer reviews section */}
            <div className="p-reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review) => (
                <div key={review.id} className="p-review">
                    <h3>{review.user}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Product;