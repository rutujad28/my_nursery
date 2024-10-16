// Sample data for plants
const plantsData = [
    { id: 1, name: 'Rose', category: 'Flower Plants', price: 6.49, imageUrl: 'rose.png' },
    { id: 2, name: 'Tulip', category: 'Flower Plants', price: 4.29, imageUrl: 'tulip.png' },
    { id: 3, name: 'Hibiscus', category: 'Flower Plants', price: 5.99, imageUrl: 'hibiscus.png' },
    { id: 4, name: 'Marigold', category: 'Flower Plants', price: 3.99, imageUrl: 'marigold.png' },
    { id: 5, name: 'Aloe Vera', category: 'Medicinal Plants', price: 8.49, imageUrl: 'aloevera.png' },
    { id: 6, name: 'Basil', category: 'Medicinal Plants', price: 4.49, imageUrl: 'basil.png' },
    { id: 7, name: 'Ginger', category: 'Medicinal Plants', price: 6.29, imageUrl: 'ginger.png' },
    { id: 8, name: 'Turmeric', category: 'Medicinal Plants', price: 6.49, imageUrl: 'turmeric.png' },
    { id: 9, name: 'Lemon', category: 'Fruit Plants', price: 16.99, imageUrl: 'lemon.png' },
    { id: 10, name: 'Mango', category: 'Fruit Plants', price: 4.49, imageUrl: 'mango.png' },
    { id: 11, name: 'Chikoo', category: 'Fruit Plants', price: 6.99, imageUrl: 'chikoo.png' },
    { id: 12, name: 'Banana', category: 'Fruit Plants', price: 5.49, imageUrl: 'banana.png' },
];


// Global cart and total price
let cart = [];
let totalPrice = 0;

// Load cart from localStorage on page load
loadCartFromLocalStorage();

// Load products into the cart page on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        loadCartItems();
        updateTotalPrice();
    }
});

// Function to load cart items on the cart page
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous content

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="delete-from-cart" onclick="deleteFromCart(${item.id})">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Keep the "Add to Cart" button blurred for items in the cart
        updateButtonState(item.id, true);
    });
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length; // Update the cart count based on the number of items in the cart
    }
}

// Add an item to the cart and update the UI
function addToCart(id) {
    const plant = plantsData.find(p => p.id === id);
    if (plant && !cart.some(item => item.id === id)) {
        cart.push(plant);
        totalPrice += plant.price; // Add price to total

        // Apply the blurred effect to the button
        const button = document.getElementById(`add-to-cart-${id}`);
        if (button) {
            button.textContent = "Added";
            button.classList.add('blurred'); // Add blurred class
            button.disabled = true; // Disable button
        }

        saveCartToLocalStorage(); // Save updated cart and total price
        updateTotalPrice(); // Update total price in the UI
        updateCartCount(); // Update cart count in the navbar
    }
}

// Delete an item from the cart
function deleteFromCart(id) {
    const plant = cart.find(item => item.id === id); // Find the plant in the cart

    if (plant) {
        cart = cart.filter(item => item.id !== id); // Remove the item from the cart
        totalPrice -= plant.price; // Subtract the price from total

        updateButtonState(id, false); // Re-enable the "Add to Cart" button
        updateCartCount(); // Update cart count in the navbar
    }

    loadCartItems(); // Reload the cart items on the cart page
    updateTotalPrice(); // Update the total price in the cart
    saveCartToLocalStorage(); // Save updated cart and total price
}

// Function to update the total price in the cart
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

// Save cart and total price to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice'));

    if (savedCart) {
        cart = savedCart;
        totalPrice = isNaN(savedTotalPrice) ? 0 : savedTotalPrice; // Ensure totalPrice is a number
    }
}

// Helper function to update button state based on whether the item is in the cart
function updateButtonState(id, inCart) {
    const button = document.getElementById(`add-to-cart-${id}`);
    if (button) {
        button.textContent = inCart ? "Added" : "Add to Cart";
        button.disabled = inCart; // Disable button if in cart
        if (inCart) {
            button.classList.add('blurred'); // Add blurred class
        } else {
            button.classList.remove('blurred'); // Remove the blurred class
        }
    }
}

// Function to navigate back to the products page
function continueShopping() {
    window.location.href = 'products.html'; // Change 'products.html' to your actual products page URL
}

// Function to navigate to the checkout page
function checkout() {
    window.location.href = 'index.html'; // Change 'checkout.html' to your actual checkout page URL
}
