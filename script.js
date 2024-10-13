// Sample products
const products = [
    { id: 1, name: 'Corn Flour', price: 3.5 },
    { id: 2, name: 'Popcorn Kernels', price: 4.0 },
    { id: 3, name: 'Corn Syrup', price: 5.5 }
];

let cart = [];
let loggedIn = false;

// Display products on the page
const productContainer = document.querySelector('.product-list');
products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('product-item');
    productEl.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(productEl);
});

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update cart display
function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
    });
}

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (!loggedIn) {
        alert('Please log in first!');
        return;
    }
    alert('Checkout successful!');
});

// Simple login system
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === 'customer@corn.com' && password === 'password') {
        loggedIn = true;
        document.getElementById('login-status').innerText = 'Login successful!';
    } else {
        document.getElementById('login-status').innerText = 'Invalid credentials.';
    }
});
