describe('testing spec', () => {
  it('should load the homepage', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/'); 
    cy.contains('Home').should('be.visible'); 
  });

  it('should display the login page', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/login');
    cy.contains('LOG IN').should('be.visible'); 
  });

  it('should log in with valid credentials', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/login');
    cy.get('input[type="email"]').type('user1@gmail.com'); 
    cy.get('input[type="password"]').type('123'); 
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'https://theoriginalbeeftapaflakes-9u0t.onrender.com/'); // Verify that the URL is the homepage after login
  });

  it('should display a product page', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/products'); 
    cy.contains('PRODUCT LIST').should('be.visible'); 
  });

  it('should display the cart page', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/cart');
    cy.contains('Order Summary').should('be.visible'); 
  });

  it('should add a product to the cart', () => {
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/login');
    cy.get('input[type="email"]').type('user1@gmail.com');
    cy.get('input[type="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'https://theoriginalbeeftapaflakes-9u0t.onrender.com/');
    
    // Visit the product list page
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/products');

    // Assuming products are loaded and displayed, click on the first product
    cy.contains('Sub-Reseller Package').click();
   

    // Verify that we are on the product page by checking for a specific element
    cy.contains('Sub-Reseller Package').should('be.visible');

    cy.get('.p-package-button').contains('Package A').click(); // Adjust based on your package option text

    // Click the "ADD TO CART" button on the product page
    cy.get('.p-add-to-cart').click();

    // Optionally, navigate to the cart page and verify that the product is in the cart
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/cart');
    cy.contains('Sub-Reseller Package').should('be.visible'); // Adjust this selector based on your cart page UI
  });

  it('should proceed to checkout', () => {
    // Log in
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/login');
    cy.get('input[type="email"]').type('user1@gmail.com');
    cy.get('input[type="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'https://theoriginalbeeftapaflakes-9u0t.onrender.com/');

    // Add a product to the cart
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/products');
    cy.contains('Sub-Reseller Package').click();
    cy.contains('Sub-Reseller Package').should('be.visible');
    cy.get('.p-package-button').contains('Package A').click();
    cy.get('.p-add-to-cart').click();

    // Go to cart page and proceed to checkout
    cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/cart');
    cy.contains('Sub-Reseller Package').should('be.visible');

    // Assuming there's a button to proceed to checkout
    cy.get('button').contains('Checkout').click();
    cy.get('button.modal-cancel-inventory-btn').contains('Confirm').click();

    // Verify that we are on the checkout page
    cy.url().should('include', '/cos');
    

    // Select an order to upload proof of payment
    cy.get('.items-container .item').first().click(); // Click on the first order item

    // Click on the bill button to open the modal
    cy.get('.bill-btn').first().click();

    // Upload a file and enter order number in the modal
    const fileName = 'cypress\fixtures\ZOOM BG.png'; // Change this to the path of the file you want to upload
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get('input[placeholder="Order ID"]').type('order123'); // Change this to the correct order ID

    // Confirm the checkout
    cy.get('button').contains('Confirm').click();

    // Verify that the modal closes and the order status is updated (if applicable)
    cy.get('.modal').should('not.exist');
    cy.contains('Upload failed, please try again.').should('not.exist'); // Check for success message or updated order status
  });


  it('should return a list of products from the API', () => {
    cy.request('GET', 'https://theoriginalbeeftapaflakes-9u0t.onrender.com/api/products')
      .its('status')
      .should('equal', 200);
  });


  it('should create a new account through UI', () => {
      cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/register');
  
      // Fill out the registration form
      cy.get('input[type="email"]').type('testuser@example.com');
      cy.get('input[type="username"]').type('Test User'); 
      cy.get('input[type="password"]').first().type('121');
      cy.get('#confirmPassword').type('121'); 

  
      // Submit the registration form
      cy.get('button[type="submit"]').click();
  
      cy.visit('https://theoriginalbeeftapaflakes-9u0t.onrender.com/login');
      cy.get('input[type="email"]').type('testuser@example.com'); // Replace with your test email
      cy.get('input[type="password"]').type('121'); // Replace with your test password
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'https://theoriginalbeeftapaflakes-9u0t.onrender.com/');

      // After submitting the registration form
      cy.get('.nav-login-cart').within(() => {
      cy.get('img.user-img').click(); // Click on the user icon to open the dropdown
  });

  //   // Verify the username in the dropdown
      cy.get('.username-display').should('be.visible').and('contain', 'Logged in as');
      cy.get('.username-display span').should('have.text', 'Test User');

  });

  
});
