import getData from '../modules/getData'
import renderCards from '../modules/renderCards'
import renderCatalog from '../modules/renderCatalog'
import toggleCheckbox from '../modules/toggleCheckbox'
import toggleCart from '../modules/toggleCart'
import addCart from '../modules/addCart'
import actionPage from '../modules/actionPage'

(async function () {
  const data = await getData()
  renderCards(data)
  toggleCheckbox()
  toggleCart()
  addCart()
  actionPage()
  renderCatalog()
}())

// инсталяция Webpack
// npm init -y
// npm install webpack  webpack-cli -D
// npx webpack

// end functions' call -------------------------------------------------


// Альтернативный фильтр по цене и дисконту
// function filter() {
//   const cards = document.querySelectorAll('.goods .card') // карточка товара
//   cards.forEach((card) => {
//     const cardPrice = card.querySelector('.card-price')
//     const price = parseFloat(cardPrice.textContent)
//     const discount = card.querySelector('.card-sale')
//     if ((min.value && price < min.value) || (price > max.value && max.value)) {
//       card.parentNode.style.display = 'none'
//     } else if (discountCheckbox.checked && !discount) {
//       card.parentNode.style.display = 'none'
//     } else {
//       card.parentNode.style.display = 'flex'
//     }
//   })
// }

// discountCheckbox.addEventListener('click', filter)
// min.addEventListener('change', filter)
// max.addEventListener('change', filter)
//