const emptyCart = document.getElementById("cart__items");
const itemCart = document.getElementById("cart__order");
const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");
const itemName = document.querySelectorAll(".products__menu-item-name");
const orderName = document.querySelector(".cart__order-name");
const cartOrderInformation = document.querySelector(".cart__order-information");
const orderSummarize = document.querySelector(".cart__order-summary");
const confirmOrder = document.querySelector(".cart__order-button");
let orderModal = document.querySelector(".cart__order-modal");
let orderedModal = document.querySelector(".cart__ordered-modal-information");
let orderDetails = document.querySelector(".cart__order-details");
let orderedItemTotal = document.querySelector(".cart__ordered-amount");
let newOrder = document.querySelector(".cart__order-new");
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
let itemNames = "";
let itemQuantities = 0;
let itemPrices = 0;
let itemTotalAmount = 0;
let itemOrderTotal = 0;

function orderItem() {
    addToCart.forEach((addCart, index) => {
        addCart.addEventListener("click", function () {
            changeAmounts = changeAmount[index];
            menuImgs = menuImg[index];

            changeAmounts.style.display = "flex";
            addCart.style.display = "none";
            changeAmounts.classList.add("selected");
            menuImgs.style.border = "2px solid var(--red)";

            currentQuantity[index] = 1;

            itemNames += itemName[index].innerText;
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

    let totalItemCart = 0;
    let cartItems = "";

    currentQuantity.forEach((quantity, i) => {
        totalItemCart += quantity;
        itemQuantities = quantity;
        itemPrices = `$${price[i].toFixed(2)}`;
        itemTotalAmount = `$${(itemQuantities * price[i]).toFixed(2)}`;

        if (quantity > 0) {
            cartItems += `
            <div class="cart__order-details">
                                        <div class="cart__order-items">
                                          <h3 class="cart__order-name">${itemName[i].innerText}</h3>
                                          <div class="cart__order-numbers">
                                              <p class="cart__order-selected-quantity">
                                                      ${itemQuantities}x
                                              </p>
                                              <p class="cart__order-selected-price">${itemPrices}</p>
                                              <p class="cart__order-selected-amount">${itemTotalAmount}</p>
                                          </div>
                                          </div>

                                               <img
                class="cart__order-remove"
                src="assets/images/icon-remove-item.svg"
                alt=""
            />
                                 </div>

                                 `;
        }
    });

    itemNumber.innerText = `Your Cart(${totalItemCart})`;

    orderSummarize.innerHTML = cartItems;
    orderTotal.innerText = `${itemOrderTotal}`;

    removeItem(orderSummarize, itemQuantities);
}

function removeItem(orderCartSummarize, orderQuantities) {
    orderCartSummarize.addEventListener("click", (event) => {
        // Ensure the clicked element is the remove button

        if (event.target.classList.contains("cart__order-remove")) {
            let itemElement = event.target.closest(".cart__order-details");

            quantity.forEach((qty, index) => {
                if (
                    itemElement &&
                    itemElement.querySelector(".cart__order-name").innerText ===
                        itemName[index].innerText
                ) {
                    let itemTotalAmountValue =
                        price[index] * currentQuantity[index];

                    let cartTotalAmounts = parseFloat(
                        itemTotalAmountValue.toFixed(2)
                    );

                    let cartCurrentTotalAmount = parseFloat(
                        orderTotal.innerText.replace(/[^0-9.-]+/g, "")
                    );

                    let updatedTotalAmount =
                        cartCurrentTotalAmount - cartTotalAmounts;

                    orderTotal.innerText = `$${updatedTotalAmount.toFixed(2)}`;

                    itemElement.remove();
                    currentQuantity[index] = 0;
                    menuImg[index].style.border = "none";
                    changeAmount[index].style.display = "none";
                    addToCart[index].style.display = "flex";
                    orderQuantities -= 1;

                    // const totalItems = currentQuantity.reduce(
                    //     (sum, qty) => sum + qty,
                    //     0
                    // );
                    // orderQuantities = totalItems; // Update the orderQuantities variable

                    // // Update the UI with the total items count
                    // itemNumber.innerText = `Your Cart(${totalItems})`;
                }

                displayCart();
                updateDisplayCart();
            });
        }
    });
}

function updateDisplayCart() {
    const cartCount = parseInt(itemNumber.innerText.match(/\d+/)[0]);

    if (cartCount === 0) {
        emptyCart.style.display = "flex";
        itemCart.style.display = "none";
        addToCart.forEach((cart) => {
            cart.style.display = "flex";
        });

        menuImg.forEach((img) => {
            img.style.border = "none";
        });

        changeAmount.forEach((backToCart) => {
            backToCart.style.display = "none";
        });
    } else {
        emptyCart.style.display = "none";
        itemCart.style.display = "flex";
    }

    currentQuantity.forEach((qty, i) => {
        if (qty === 0) {
            menuImg[i].style.border = "none";
            addToCart[i].style.display = "flex";
            changeAmount[i].style.display = "none";
            quantity[i].innerText = 1;
        }
    });
}

function orderConfirmation() {
    let orderedItemQuantities = 0;
    let orderedItemPrices = 0;
    let orderedItemTotalAmount = 0;
    confirmOrder.addEventListener("click", function () {
        orderModal.style.display = "flex";

        let confirmationModal = "";
        currentQuantity.forEach((qty, i) => {
            if (qty > 0) {
                orderedItemQuantities = qty;
                orderedItemPrices = price[i].toFixed(2);
                orderedItemTotalAmount = `$${(
                    orderedItemQuantities * orderedItemPrices
                ).toFixed(2)}`;
                orderedItemTotal.innerText = `${orderTotal.innerText}`;
                confirmationModal += ` <div class="cart__ordered-modal-items">
                                        <img
                                            class="cart__ordered-item-img"
                                            src="${menuImg[i]?.src}"
                                            alt="Order Item Image"
                                        />

                                        <div
                                            class="cart__ordered-modal-details"
                                        >
                                            <h3 class="cart__ordered-name">
                                                ${itemName[i].innerText}
                                            </h3>
                                            <div class="cart__ordered-numbers">
                                                <p
                                                    class="cart__ordered-selected-quantity"
                                                >
                                                    ${orderedItemQuantities}x
                                                </p>
                                                <p
                                                    class="cart__ordered-selected-price"
                                                >
                                                    $${orderedItemPrices}
                                                </p>
                                            </div>
                                        </div>
                                       <p class="cart__ordered-selected-amount">
                                        ${orderedItemTotalAmount}
                                        </p>  
                                    </div>
                                   `;
            }
        });

        orderModal.style.display = "flex";
        console.log(orderedItemTotal);
        orderedModal.innerHTML = confirmationModal;
    });
}

function reset() {
    itemNames = "";
    currentQuantity = Array.from(quantity).map(() => 0);

    let cartItem = orderSummarize.querySelectorAll(".cart__order-items");

    cartItem.forEach((perItem) => {
        perItem.remove();
    });

    changeAmount.forEach((amountElement) => {
        amountElement.style.display = "none";
    });

    menuImg.forEach((imgElement) => {
        imgElement.style.border = "none";
    });

    emptyCart.style.display = "flex";
    itemCart.style.display = "none";

    addToCart.forEach((cart) => {
        cart.style.display = "flex";
    });

    // itemQuantities -= 1;
}

function startNewOrder() {
    newOrder.addEventListener("click", function () {
        orderModal.style.display = "none";
        quantity.forEach((qty) => {
            qty.innerText = 1;
        });
        reset();
    });
}

orderItem();
orderConfirmation();
startNewOrder();
