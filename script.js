const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");
let origPrice = document.querySelectorAll(".products__menu-item-price");
let addAmount = document.querySelectorAll(
    ".products__menu-item-amount-increment"
);
let minusAmount = document.querySelectorAll(
    ".products__menu-item-amount-decrement"
);
let quantity = document.querySelectorAll(".products__menu-item-amount-value");

addToCart.forEach((add, index) => {
    add.addEventListener("click", function () {
        const changeAmounts = changeAmount[index];
        const menuImgs = menuImg[index];

        changeAmounts.style.display = "flex";
        add.style.display = "none";
        changeAmounts.classList.add("selected");
        menuImgs.style.border = "2px solid var(--red)";
    });
});

function updateQuantity() {
    let price = Array.from(origPrice).map((priceElement) =>
        parseFloat(priceElement.innerText.replace(/[^0-9.-]+/g, ""))
    );

    // let price = parseFloat(
    //     origPrice[index].innerText.replace(/[^0-9.-]+/g, "")
    // );

    let totalPrice = 0;
    addAmount.forEach((increment, index) => {
        increment.addEventListener("click", function () {
            let currentQuantity = parseFloat(quantity[index].innerText);
            currentQuantity += 1;

            quantity[index].innerText = currentQuantity;
            totalPrice = currentQuantity * price[index];
            console.log(totalPrice.toFixed(2));
        });
    });

    minusAmount.forEach((decrement, index) => {
        decrement.addEventListener("click", function () {
            let currentQuantity = parseFloat(quantity[index].innerText);
            if (currentQuantity > 0) {
                currentQuantity -= 1;
                quantity[index].innerText = currentQuantity;
            }
        });
    });
}

updateQuantity();
