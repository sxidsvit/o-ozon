// Checkbox ------------------------------------------------

const checkbox = document.getElementById('discount-checkbox')
// checkbox.onchange = function () {console.log('галочка') }

checkbox.addEventListener('change', function () {
  if (this.checked) {
    // console.log('Галочка присутствует')
    this.nextElementSibling.classList.add('checked')
  } else {
    this.nextElementSibling.classList.remove('checked')
    // console.log('Галочка отсутствует')
  }
})

// end checkbox --------------------------------------------

// Cart ----------------------------------------------------

const btnCart = document.getElementById('cart')
const modalCart = document.querySelector('.cart')
const closeBtn = document.querySelector('.cart-close')

btnCart.addEventListener('click', () => {
  // modalCart.style.cssText = 'display: flex; background: #009999; opacity: 0.9; '
  modalCart.style.display = 'flex'
  document.body.style.overflow = 'hidden' // убираем прокрутку страницы под карзиной
})

closeBtn.addEventListener('click', () => {
  modalCart.style.display = 'none'
  document.body.style.overflow = ''
})

// end cart --------------------------------------------

// Add product to cart -----------------------------------

const cards = document.querySelectorAll('.goods .card') // карточка товара
const cartWrapper = document.querySelector('.cart-wrapper') // область содержимого карзины
const cartEmpty = document.getElementById('cart-empty') // область для служебного сообщения карзины
const countGoods = document.querySelector('.counter') // область для количества товаров в карзине

cards.forEach((card) => {
  const btn = card.querySelector('button')
  btn.addEventListener('click', () => {
    const cardClone = card.cloneNode(true) // клон узла с его потомками
    cartWrapper.appendChild(cardClone) // копируем карточку товара в карзину
    cartEmpty.remove() // убираем область служебного сообщения карзины
    showData()
  })
})

function showData() {
  const cardsCart = cartWrapper.querySelectorAll('.card') // карточки товаров из карзины
  countGoods.textContent = cardsCart.length // количество карточек записываем в инфометр карзины
}

// end add product to cart -----------------------------------
