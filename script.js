// Sample products
const products = [
    { id: 1, name: 'Corn Flour', price: 3.5 },
    { id: 2, name: 'Popcorn Kernels', price: 4.0 },
    { id: 3, name: 'Corn Syrup', price: 5.5 }
];

let cart = [];
let loggedIn = false;

// CAROUSEL LOGIC
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Show the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Show the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Initial display of first slide
showSlide(currentSlide);

// PRODUCT LISTING
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

// CART MANAGEMENT
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
    cartContainer.innerHTML = ''; // Clear previous content
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (!loggedIn) {
        alert('Please log in first!');
        return;
    }
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Checkout successful!');
        cart = [];
        updateCart();
    }
});

// LOGIN SYSTEM
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

// CONTACT FORM SUBMISSION
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Message sent by ${name} (${email}):\n\n${message}`);
});
