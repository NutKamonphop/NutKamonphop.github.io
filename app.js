// Parameter_Product
let Products = document.querySelector(".products")
let cart = [];
let totalItem = 0

const products = [
    {
        id: 1,
        name: 'Orange',
        image: 'Orange.png',
        price: 12
    },
    {
        id: 2,
        name: 'Chili',
        image: 'Chili.png',
        price: 5
    },
    {
        id: 3,
        name: 'Corn',
        image: 'Corn.png',
        price: 9
    },
    {
        id: 4,
        name: 'Dragon Fruit',
        image: 'DragonFruit.png',
        price: 99
    },
    {
        id: 5,
        name: 'Apple',
        image: 'Apple.png',
        price: 15
    },
    {
        id: 6,
        name: 'Cucumber',
        image: 'Cucumber.png',
        price: 5
    },
    {
        id: 7,
        name: 'Grape',
        image: 'Grape.png',
        price: 13
    },
    {
        id: 8,
        name: 'Broccoli',
        image: 'Broccoli.png',
        price: 48
    },
    {
        id: 9,
        name: 'Banana',
        image: 'Banana.png',
        price: 20
    },
    {
        id: 10,
        name: 'Parsley',
        image: 'Parsley.png',
        price: 3
    },
    {
        id: 11,
        name: 'Ginger',
        image: 'Ginger.png',
        price: 24
    },
    {
        id: 12,
        name: 'Pomegranate',
        image: 'Pomegranate.png',
        price: 21
    },
    {
        id: 13,
        name: 'Cherry Tomato',
        image: 'CherryTomato.png',
        price: 50
    },
    {
        id: 14,
        name: 'Cherry',
        image: 'Cherry.png',
        price: 31
    },
    {
        id: 15,
        name: 'Pumpkin',
        image: 'Pumpkin.png',
        price: 36
    },
    {
        id: 16,
        name: 'Green Pea',
        image: 'GreenPea.png',
        price: 6
    },
    {
        id: 17,
        name: 'Tomato',
        image: 'Tomato.png',
        price: 26
    },
    {
        id: 18,
        name: 'Red Berry',
        image: 'RedBerry.png',
        price: 100
    },
    {
        id: 19,
        name: 'Melon',
        image: 'Melon.png',
        price: 60
    },
    {
        id: 20,
        name: 'Pine Apple',
        image: 'PineApple.png',
        price: 49
    } 
];


// Function
function cartData(){
    // Example data to send
    var productData = cart.map(item => item.id)

    // Convert data to a query string
    var queryString = productData.map(id => 'id=' + encodeURIComponent(id)).join('&');

    // Construct the URL for chart.html with the data
    var cartUrl = 'cart.html?' + queryString;

    // Redirect to cart.html
    window.location.href = cartUrl;
}

function calTotalItem() {
    totalItem = cart.length
    let elementTotalItem = document.getElementById('total-item');
    elementTotalItem.innerHTML = totalItem
}

function addToCart(id) {
    const productsId = parseInt(id);
    const charIndex = cart.findIndex(item => item.id === productsId)
    if (charIndex === -1) {
        const product = products.find(item => item.id === productsId)
        cart.push(product)
    }
    calTotalItem()
}

function onSearch(){
    var inputSearch = document.getElementById('input-search');

    // Check if the element exists
    if (inputSearch) {
        // Get the value of the input element
        var inputValue = inputSearch.value;

        // Log or use the retrieved value
        console.log('Input value:', inputValue);

        const myResult = products.find(item => item.name.toLowerCase() === inputValue.toLowerCase())
        if (myResult){

            let newElement = document.createElement('div');
            newElement.classList.add('product_item');
            newElement.innerHTML = `
            <img src="../Images/Products/${myResult.image}" onclick="window.location.href='sproducts.html'; " alt="${myResult.name}"/>
            <div class="description">
                <p>${myResult.name}</p>
                <div class="star">
                    <i class="fa-solid fa-star active"></i>
                    <i class="fa-solid fa-star active"></i>
                    <i class="fa-solid fa-star active"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <p>$${myResult.price} KG</p>
            </div>
            <button onclick={addToCart(${myResult.id})}><i class="fa-solid fa-cart-shopping"></i></button>
            `;
            deleteProducts()
            Products.appendChild(newElement)
        } else {
            deleteProducts()
            initProducts()
        }
    }
}

function deleteProducts(){
    var parentElement = document.getElementById("search-product");

    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
    
}

function initProducts(){
    products.map((item, index) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('product_item');
        newDiv.innerHTML = `
        <img src="../Images/Products/${item.image}" onclick="window.location.href='sproducts.html'; " alt="${item.name}"/>
        <div class="description">
            <p>${item.name}</p>
            <div class="star">
                <i class="fa-solid fa-star active"></i>
                <i class="fa-solid fa-star active"></i>
                <i class="fa-solid fa-star active"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <p>$${item.price} KG</p>
        </div>
        <button onclick={addToCart(${item.id})}><i class="fa-solid fa-cart-shopping"></i></button>
        `;
        Products.appendChild(newDiv)
    })
}

function initApp(){
    initProducts()
}

initApp()
