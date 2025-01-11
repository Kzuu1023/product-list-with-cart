const emptyCart = document.getElementById("cart__items");
const itemCart = document.getElementById("cart__order");
const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");
const itemName = document.querySelectorAll(".products__menu-item-name");
const orderName = document.querySelector(".cart__order-name");
const orderSummarize = document.querySelector(".cart__order-summary");
let orderDetails = document.querySelector(".cart__order-details");
let itemNumber = document.getElementById("number");
let selectedQty = document.querySelector(".cart__order-selected-quantity");

let selectedPrice = document.querySelector(".cart__order-selected-price");
let selectedAmount = document.querySelector(".cart__order-selected-amount");
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

function orderItem() {
    addToCart.forEach((addCart, index) => {
        addCart.addEventListener("click", function () {
            changeAmounts = changeAmount[index];
            menuImgs = menuImg[index];

            changeAmounts.style.display = "flex";
            addCart.style.display = "none";
            changeAmounts.classList.add("selected");
            menuImgs.style.border = "2px solid var(--red)";

            emptyCart.style.display = "none";
            itemCart.style.display = "flex";
            displayCart(index);
            totalAmount();
        });
    });

    handleQuantityChange();
}

function handleQuantityChange() {
    addAmount.forEach((increment, index) => {
        increment.addEventListener("click", function () {
            currentQuantity[index] += 1;
            quantity[index].innerText = currentQuantity[index];
            selectedQty.innerText = `${currentQuantity[index]}x`;
            itemNumber.innerText = `Your Cart(${currentQuantity[index]})`;
            totalAmount();
            updateDisplayCart();
            removeItem();
        });
    });

    minusAmount.forEach((decrement, index) => {
        decrement.addEventListener("click", function () {
            if (currentQuantity[index] > 0) {
                currentQuantity[index] -= 1;
                quantity[index].innerText = currentQuantity[index];
                selectedQty.innerText = `${currentQuantity[index]}x`;
                itemNumber.innerText = `Your Cart(${currentQuantity[index]})`;
                totalAmount();
                updateDisplayCart();
                removeItem();
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
    selectedPrice.innerText = `$${totalOrder.toFixed(2)}`;
    selectedAmount.innerText = selectedPrice.innerText;
    orderTotal.innerText = selectedAmount.innerText;
    console.log("The total amount: ", `$${totalOrder.toFixed(2)}`);
}

function displayCart(index) {
    orderSummarize.style.display = "flex";
    orderName.innerText += itemName[index].innerText;
    console.log("Current item selected: ", itemName[index].innerText);
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
    orderName.innerText = "";
    changeAmounts.style.display = "none";
    menuImgs.style.border = "none";
    addToCart.forEach((cart) => {
        cart.style.display = "flex";
    });
}

function removeItem() {
    let totalPrice = 0;
    let totalOrder = 0;
    let calculatePrices = 0;

    const remove = document.querySelector(".cart__order-remove");
    let cartNumbers = parseInt(itemNumber.innerText.match(/\d+/)[0]);

    remove.addEventListener("click", function () {
        currentQuantity.forEach((quantity, index) => {
            totalPrice = quantity * price[index];
            calculatePrices += totalPrice;
        });

        selectedAmount.innerText = calculatePrices;
        orderTotal.innerText = selectedAmount.innerText;
        orderSummarize.style.display = "none";
    });
}

orderItem();
