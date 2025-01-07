const addToCart = document.querySelectorAll(".products__menu-item-button");
const menuImg = document.querySelectorAll(".products__menu-item-img img");
const changeAmount = document.querySelectorAll(".products__menu-item-amount");

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
