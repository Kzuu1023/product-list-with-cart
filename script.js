const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");
let addAmount = document.querySelectorAll(
    ".products__menu-item-amount-increment"
);
let minusAmount = document.querySelectorAll(
    ".products__menu-item-amount-decrement"
);
let value = document.querySelectorAll(".products__menu-item-amount-value");

addToCart.forEach((add, index) => {
    add.addEventListener("click", function () {
        const changeAmounts = changeAmount[index];
        const menuImgs = menuImg[index];

        changeAmounts.style.display = "flex";
        add.style.display = "none";
        changeAmounts.classList.add("selected");
        menuImgs.style.border = "2px solid var(--red)";
        updateQuantity();
    });
});

function updateQuantity() {
    let quantity = 1;

    addAmount.forEach((increment, index) => {
        increment.addEventListener("click", function () {
            quantity += 1;
            value[index].innerText = quantity;
        });
    });

    minusAmount.forEach((decrement, index) => {
        decrement.addEventListener("click", function () {
            if (quantity > 0) {
                quantity -= 1;
                value[index].innerText = quantity;
            }
        });
    });
}
