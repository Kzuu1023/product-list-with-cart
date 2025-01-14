const emptyCart = document.getElementById("cart__items");
const itemCart = document.getElementById("cart__order");
const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");
const itemName = document.querySelectorAll(".products__menu-item-name");
const orderName = document.querySelector(".cart__order-name");
const cartOrderInformation = document.querySelector(".cart__order-information");
const orderSummarize = document.querySelector(".cart__order-summary");
let orderDetails = document.querySelector(".cart__order-details");
let itemNumber = document.getElementById("number");
let orderTotal = document.querySelector(".cart__order-total-amount");
let origPrice = document.querySelectorAll(".products__menu-item-price");
let addAmount = document.querySelectorAll(
    ".products__menu-item-amount-increment"
);
let minusAmount = document.querySelectorAll(
    ".products__menu-item-amount-decrement"
);
let quantity = document.querySelectorAll(".products__menu-item-amount-value");
let currentQuantity = Array.from(quantity).map(() => parseFloat(0));
let price = Array.from(origPrice).map((priceElement) =>
    parseFloat(priceElement.innerText.replace(/[^0-9.-]+/g, ""))
);

let changeAmounts;
let menuImgs;
let itemTotalAmount = 0;
let itemOrderTotal = 0;
let totalItemCart = 0;

function orderItem() {
    addToCart.forEach((addCart, index) => {
        addCart.addEventListener("click", function () {
            changeAmounts = changeAmount[index];
            menuImgs = menuImg[index];

            currentQuantity[index] = 1;

            changeAmounts.style.display = "flex";
            addCart.style.display = "none";
            changeAmounts.classList.add("selected");
            menuImgs.style.border = "2px solid var(--red)";

            console.log("Current item selected: ", itemName[index].innerText);

            emptyCart.style.display = "none";
            itemCart.style.display = "flex";
            displayCart();
        });
    });

    handleQuantityChange();
}

function handleQuantityChange() {
    addAmount.forEach((increment, index) => {
        increment.addEventListener("click", function () {
            currentQuantity[index] += 1;
            quantity[index].innerText = currentQuantity[index];
            displayCart();
            updateDisplayCart();
        });
    });

    minusAmount.forEach((decrement, index) => {
        decrement.addEventListener("click", function () {
            if (currentQuantity[index] > 0) {
                currentQuantity[index] -= 1;
                quantity[index].innerText = currentQuantity[index];

                displayCart();
                updateDisplayCart();
            }
        });
    });
}

function totalAmount() {
    let totalPrice = 0;
    let totalOrder = 0;
    let calculatePrices = 0;

    currentQuantity.forEach((quantity, index) => {
        totalPrice = quantity * price[index];
        calculatePrices += totalPrice;
    });

    totalOrder = calculatePrices;
    itemOrderTotal = `$${totalOrder.toFixed(2)}`;
    console.log("The total amount: ", `$${totalOrder.toFixed(2)}`);
}

function displayCart() {
    orderSummarize.style.display = "flex";
    totalAmount();

    let cartDetailsHTML = "";
    let itemQuantities = 0;

    currentQuantity.forEach((quantity, i) => {
        totalItemCart += quantity;
        itemQuantities = quantity;
        if (quantity > 0) {
            itemTotalAmount = `$${(itemQuantities * price[i]).toFixed(2)}`;
            console.log(itemTotalAmount);

            cartDetailsHTML += `
                <div class="cart__order-details">
                    <h3 class="cart__order-name">${itemName[i].innerText}</h3>
                    <div class="cart__order-numbers">
                        <p class="cart__order-selected-quantity">${itemQuantities}x</p>
                        <p class="cart__order-selected-price">$${price[
                            i
                        ].toFixed(2)}</p>
                        <p class="cart__order-selected-amount">${itemTotalAmount}</p>
                    </div>
                </div>
            `;
        }
    });

    itemNumber.innerText = `Your Cart(${totalItemCart})`;

    orderSummarize.innerHTML = cartDetailsHTML;

    orderTotal.innerText = `${itemOrderTotal}`;

    if (totalItemCart === 0) {
        emptyCart.style.display = "flex";
        itemCart.style.display = "none";
    } else {
        emptyCart.style.display = "none";
        itemCart.style.display = "flex";
    }
}

function updateDisplayCart() {
    const cartCount = parseInt(itemNumber.innerText.match(/\d+/)[0]);

    if (cartCount === 0) {
        emptyCart.style.display = "flex";
        itemCart.style.display = "none";
        reset();
    }
}

function reset() {
    let itemNames = Array.from(itemName).map(() => "");
    currentQuantity = Array.from(quantity).map(() => 0);

    changeAmounts.style.display = "none";
    menuImgs.style.border = "none";
    addToCart.forEach((cart) => {
        cart.style.display = "flex";
    });
}

orderItem();
