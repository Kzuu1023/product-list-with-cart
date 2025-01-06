const addToCart = document.querySelector(".button");

addToCart.addEventListener("click", function () {
    document.querySelector(".amount").style.display = "flex";
    addToCart.style.display = "none";
});
