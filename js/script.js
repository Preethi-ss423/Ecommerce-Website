// =============================
// PREETHI STORE - SCRIPT.JS V2
// PART 1
// =============================

// -----------------------------
// PRODUCT DATABASE
// -----------------------------

const products = [

{
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    image: "images/laptop.png"
},

{
    id: 2,
    name: "Mobile",
    price: 19000,
    category: "Electronics",
    image: "images/mobile.png"
},

{
    id: 3,
    name: "Headphone",
    price: 5000,
    category: "Electronics",
    image: "images/headphone.png"
},

{
    id: 4,
    name: "Watch",
    price: 2500,
    category: "Accessories",
    image: "images/watch.png"
},

{
    id: 5,
    name: "Backpack",
    price: 3300,
    category: "Accessories",
    image: "images/backpack.png"
},

{
    id: 6,
    name: "Shoes",
    price: 3000,
    category: "Fashion",
    image: "images/shoes.png"
}

];

// -----------------------------
// CART
// -----------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// -----------------------------
// DISPLAY PRODUCTS
// -----------------------------

function displayProducts(productArray){

    const container = document.getElementById("product-container");

    if(!container) return;

    container.innerHTML = "";

    productArray.forEach(product => {

        container.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">

                🛒 Add to Cart

            </button>

        </div>

        `;

    });

}

// Load products automatically
displayProducts(products);

// -----------------------------
// SEARCH PRODUCTS
// -----------------------------

function searchProducts(){

    const text = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(text)

    );

    displayProducts(filteredProducts);

}

// -----------------------------
// CATEGORY FILTER
// -----------------------------

function filterProducts(category){

    if(category === "All"){

        displayProducts(products);

        return;

    }

    const filteredProducts = products.filter(product =>

        product.category === category

    );

    displayProducts(filteredProducts);

}

// -----------------------------
// UPDATE CART COUNT
// -----------------------------

function updateCartCount(){

    const cartCount = document.getElementById("cart-count");

    if(!cartCount) return;

    let totalItems = 0;

    cart.forEach(item =>{

        totalItems += item.quantity;

    });

    cartCount.innerHTML = totalItems;

}

// Load cart count
updateCartCount();
// =============================
// ADD TO CART
// =============================

function addToCart(id) {

    // Find selected product
    const product = products.find(p => p.id === id);

    // Check if product already exists
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1

        });

    }

    // Save to Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show notification
    showToast(product.name + " added to cart!");
}


// =============================
// TOAST MESSAGE
// =============================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        ✅ ${message}
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2000);

}
// =============================
// DISPLAY CART
// =============================

function displayCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <h2 class="empty-cart">
                🛒 Your Cart is Empty
            </h2>
        `;

        if (totalElement) {
            totalElement.innerHTML = "";
        }

        updateCartCount();
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

            </div>

            <button class="remove-btn"
                onclick="removeItem(${index})">

                🗑 Remove

            </button>

        </div>

        `;

    });

    if (totalElement) {
        totalElement.innerHTML = `Grand Total : ₹${total}`;
    }

    updateCartCount();
}


// =============================
// INCREASE QUANTITY
// =============================

function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =============================
// DECREASE QUANTITY
// =============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =============================
// REMOVE PRODUCT
// =============================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =============================
// LOAD CART PAGE
// =============================

displayCart();

// =============================
// REGISTER USER
// =============================

function registerUser() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(name==="" || email==="" || password==="" || confirmPassword===""){

        alert("Please fill all fields.");

        return;
    }

    if(password!==confirmPassword){

        alert("Passwords do not match.");

        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(user => user.email === email);

    if(exists){

        alert("Email already registered.");

        return;
    }

    users.push({

        name:name,
        email:email,
        password:password

    });

    localStorage.setItem("users",JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href="login.html";

}



// =============================
// LOGIN USER
// =============================

function loginUser(){

    let email=document.getElementById("loginEmail").value.trim();

    let password=document.getElementById("loginPassword").value;

    let users=JSON.parse(localStorage.getItem("users")) || [];

    let user=users.find(u=>u.email===email && u.password===password);

    if(user){

        localStorage.setItem("loggedInUser",JSON.stringify(user));

        alert("Login Successful!");

        window.location.href="index.html";

    }

    else{

        alert("Invalid Email or Password.");

    }

}



// =============================
// SHOW USER NAME
// =============================

function showLoggedInUser(){

    let user=JSON.parse(localStorage.getItem("loggedInUser"));

    let userName=document.getElementById("user-name");

    if(user && userName){

        userName.innerHTML="👋 "+user.name;

    }

}

showLoggedInUser();



// =============================
// LOGOUT
// =============================

function logout(){

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href="login.html";

}