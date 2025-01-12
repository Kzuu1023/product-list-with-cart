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
let itemNames = "";
let itemQuantities = "";
let itemPrices = "";
let itemTotalAmount = "";
let itemOrderTotal = "";

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

            itemNames += itemName[index].innerText;
            console.log(itemNames);
            console.log("Current item selected: ", itemName[index].innerText);

            emptyCart.style.display = "none";
            itemCart.style.display = "flex";
            displayCart(index);
        });
    });

    handleQuantityChange();
}

function handleQuantityChange() {
    addAmount.forEach((increment, index) => {
        increment.addEventListener("click", function () {
            currentQuantity[index] += 1;
            quantity[index].innerText = currentQuantity[index];

            displayCart(index);
            updateDisplayCart();
        });
    });

    minusAmount.forEach((decrement, index) => {
        decrement.addEventListener("click", function () {
            if (currentQuantity[index] > 0) {
                currentQuantity[index] -= 1;
                quantity[index].innerText = currentQuantity[index];

                displayCart(index);
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
    itemPrices = `$${totalOrder.toFixed(2)}`;
    itemTotalAmount = itemPrices;
    itemOrderTotal = itemTotalAmount;

    console.log("The total amount: ", itemPrices); // Display total amount
    console.log("The total amount: ", `$${totalOrder.toFixed(2)}`);
}

function displayCart(index) {
    orderSummarize.style.display = "flex";
    totalAmount();

    itemQuantities = `${currentQuantity[index]}x`;
    console.log(itemQuantities);
    let totalItemCart = 0;
    currentQuantity.forEach((quantity) => {
        totalItemCart += quantity;
    });

    itemNumber.innerText = `Your Cart(${totalItemCart})`;
    console.log(itemNumber.innerText);
    orderSummarize.innerHTML = `
  <div class="cart__order-details">
                                <h3 class="cart__order-name">${itemNames}</h3>
                                <div class="cart__order-numbers">
                                    <p class="cart__order-selected-quantity">
                                            ${itemQuantities}
                                    </p>
                                    <p class="cart__order-selected-price">${itemPrices}</p>
                                    <p class="cart__order-selected-amount">${itemTotalAmount}</p>
                                </div>
                            </div>

                            <img
                                class="cart__order-remove"
                                src="assets/images/icon-remove-item.svg"
                                alt=""
                            />`;
    orderTotal.innerText = `${itemOrderTotal}`;

    orderSummarize
        .querySelector(".cart__order-remove")
        .addEventListener("click", () => {
            orderSummarize.remove();
            orderTotal.innerText = `${""}`;
            emptyCart.style.display = "flex";
            itemCart.style.display = "none";
        });
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
    itemNames = "";
    currentQuantity = Array.from(quantity).map(() => 0);

    changeAmounts.style.display = "none";
    menuImgs.style.border = "none";
    addToCart.forEach((cart) => {
        cart.style.display = "flex";
    });
}

orderItem();
