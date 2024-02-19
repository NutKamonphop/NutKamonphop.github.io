let Products = document.querySelector(".cart-order")


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

let cart = [];

let totalAmount = 0
function calTotalAmount (cart) {
    totalAmount = cart.reduce((sum, item) => sum + item.subTotal, 0);
    var elementTotalAmount = document.getElementById("total-amount");
    elementTotalAmount.innerHTML = `$${totalAmount}`
}

function parseUrlParams(url) {
    var params = {};
    var urlParts = url.split('?');

    if (urlParts.length > 1) {
        var queryString = urlParts[1];
        var pairs = queryString.split('&');

        pairs.forEach(function(pair) {
            var keyValue = pair.split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1] || '');

            if (!params[key]) {
                params[key] = [];
            }

            params[key].push(value);
        });
    }

    return params;
}

function calTotalItem() {
    totalItem = cart.length
    let elementTotalItem = document.getElementById('total-item');
    elementTotalItem.innerHTML = totalItem
}

function productToCart (productsId){
    const newCart = productsId.map(id => {
        const productsId = parseInt(id);
        const charIndex = cart.findIndex(item => item.id === productsId)
        if (charIndex === -1) {
            const product = products.find(item => item.id === productsId)
            return {
                ...product,
                quantity: 1,
                subTotal: product.price
            }
        }
    })
    
    cart = newCart
    calTotalAmount(cart)

}

function onChangeQuantity (event, productId) {
    if(event.value > 0) {
        const cartIndex = cart.findIndex(item => item.id === parseInt(productId))
        let product = cart[cartIndex]
        const newQuantity = parseInt(event.value)
        product.quantity = newQuantity
        product.subTotal = newQuantity*product.price
        cart[cartIndex] = product
        var element = document.getElementById(`sub-total-${productId}`);
        element.innerHTML = `$${product.subTotal}`
        calTotalAmount(cart)
    } else {
        event.value = 1
    }
}

function onDelete (id) {
    const deletedCart = cart.filter(item => item.id !== id);
    cart = deletedCart
    calTotalItem()
    calTotalAmount(cart)
    deleteOrder()
    initTable()
}

function deleteOrder(){
    var parentElement = document.getElementById("cart-product");

    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
    
}

function initTable(){
    let strHtml = ""
    cart.map((item, index) => {
        strHtml+= `
            <tr>
                <td onclick={onDelete(${item.id})}><i class="fa-regular fa-circle-xmark"></i></td>
                <td><img src="../Images/Products/${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><input type="number" value="1" onchange={onChangeQuantity(this,${item.id})}></td>
                <td id="sub-total-${item.id}">$${item.subTotal}</td>
            </tr>
        `  
    })

    let newDiv = document.createElement('div');
        newDiv.classList.add('table_head');
        newDiv.innerHTML = `
        <table width="100%">
            <thead>
                <tr>
                    <td>Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price (KG)</td>
                    <td>Quantity</td>
                    <td>Subtotal</td>
                </tr>
            </thead>
            <tbody>
                ${strHtml} 
            </tbody>
         </table>
        `;
        Products.appendChild(newDiv)
}

function initApp(){
    var url = window.location.href;
    var idValues = parseUrlParams(url)['id'];
    productToCart(idValues)
    initTable()
    calTotalItem()
    calTotalAmount(cart)
}


initApp()