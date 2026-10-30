const products = [
    { id: 1, name: "Classic Cotton Tee", price: 799 },
    { id: 2, name: "Everyday Essential", price: 1199 },
    { id: 3, name: "Urban Street Sneakers", price: 2499 },
    { id: 4, name: "Everyday Carry Bag", price: 1899 }
];
// Shopping cart
// let cart = [];
let cart = JSON.parse(localStorage.getItem("stylesphere-cart")) || [];

// HTML elements
const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Add product to cart
cartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productName = button.dataset.product;

        const selectedProduct = products.find(function (product) {
            return product.name === productName;
        });

        if (selectedProduct) {
            cart.push(selectedProduct);
            renderCart();
        }
    });
});

// Display cart products
function renderCart() {
    localStorage.setItem("stylesphere-cart", JSON.stringify(cart));

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    cartItems.innerHTML = cart.map(function (product, index) {
        return `
            <div class="d-flex justify-content-between align-items-center border-bottom py-3">
                <div>
                    <h5>${product.name}</h5>
                    <p>Price: ₹${product.price}</p>
                </div>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    }).join("");

    const total = cart.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);

    cartTotal.textContent = total;
}

// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}
renderCart();