const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closeButton = document.querySelector("#modal a")

buttonSearch.addEventListener("click", () => {
    modal.classList.toggle("hide")
})


closeButton.addEventListener("click", () => {
    modal.classList.toggle("hide")
})