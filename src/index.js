// Checkbox ------------------------------------------------

function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox')
  // checkbox.onchange = function () {console.log('галочка') }

  checkbox.forEach(elem => {
    elem.addEventListener('change', function () {
      if (this.checked) {
        // console.log('Галочка присутствует')
        this.nextElementSibling.classList.add('checked')
      } else {
        this.nextElementSibling.classList.remove('checked')
        // console.log('Галочка отсутствует')
      }
    })
  })
}

// end checkbox --------------------------------------------


// Cart ----------------------------------------------------

function toggleCart() {
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
}

// end cart --------------------------------------------


// Add product to cart -----------------------------------

function addCart() {

  const cards = document.querySelectorAll('.goods .card') // карточка товара
  const cartWrapper = document.querySelector('.cart-wrapper') // область содержимого карзины
  const cartEmpty = document.getElementById('cart-empty') // область для служебного сообщения карзины
  const countGoods = document.querySelector('.counter') // область для количества товаров в карзине

  cards.forEach((card) => {
    const btn = card.querySelector('button')
    btn.addEventListener('click', () => {
      const cardClone = card.cloneNode(true) // клон узла с его потомками
      cartWrapper.appendChild(cardClone) // копируем карточку товара в карзину
      showData()

      const removeBtn = cardClone.querySelector('.btn') // выбираем кнопку
      removeBtn.textContent = 'Удалить' // меняем текст на кнопке
      removeBtn.addEventListener('click', () => { // вешаем событие на текущую карточку в карзине
        cardClone.remove() // удаляем карточку из карзины
        showData() // обновление цены в карзине
      })
    })
  })

  function showData() {  // отображение контента корзины

    const cardsCart = cartWrapper.querySelectorAll('.card') // карточки товаров из карзины
    const cardsPrice = cartWrapper.querySelectorAll('.card-price') // товары в карзине 
    const cardTotal = document.querySelector('.cart-total span') // отображение суммарной цены
    countGoods.textContent = cardsCart.length // количество карточек записываем в инфометр карзины

    let sum = 0
    cardsPrice.forEach((cardPrice) => {
      sum += parseFloat(cardPrice.textContent) // подсчет стоимости покупки
    })
    cardTotal.textContent = sum // отображаем стоимость покупки

    if (cardsCart.length !== 0) {
      cartEmpty.remove() // убираем область служебного сообщения карзины
    } else {
      cartWrapper.appendChild(cartEmpty) // добавляем служебное сообщение 
    }

  }
}

// end add product to cart -----------------------------------


// filter for actions (filtering & searche) ------------------

function actionPage() {

  // ========= фильтр по акции (дисконту) ================

  const cards = document.querySelectorAll('.goods .card')  // выбираем все карточки
  const discountCheckbox = document.getElementById('discount-checkbox') // выбираем дисконтные карточки (акция)

  discountCheckbox.addEventListener('click', () => {
    cards.forEach((card) => {
      card.setAttribute('discont-filter', 'yes')
      if (discountCheckbox.checked) {
        if (!card.querySelector('.card-sale') || card.getAttribute('price-filter') == 'no') { // отображаем только дисконтные карточки
          card.parentNode.style.display = 'none' // обращаемся к родителю элемента card
          card.setAttribute('discont-filter', 'no')
          console.log(card.getAttribute('discont-filter'));
          // card.parentNode.remove() // альтернативный способ
        }
      } else { // отображаем все ранее скрытые не дисконтные карточки
        card.parentNode.style.display = 'flex' // обращаемся к родителю элемента card
        card.setAttribute('discont-filter', 'no')
        console.log(card.getAttribute('discont-filter'));
        // document.querySelector('.goods').appendChild(card.parentNode) // альтернативный способ
      }
    })
  })

  // ========== фильтр по диапозону цен ============

  const min = document.getElementById('min')  // input для ввода минимального значения
  const max = document.getElementById('max')  // input для ввода максимального значения

  function filterPrice() { // функция-фильтр (обработчик события change)
    cards.forEach((card) => {
      card.setAttribute('price-filter', 'yes')
      const cardPrice = card.querySelector('.card-price') // извлекаем из карточки её цену
      const price = parseFloat(cardPrice.textContent) // удаляем из карточки символ валюты

      if ((min.value && price < min.value) || (price > max.value && max.value) || card.getAttribute('discont-filter') == 'no') {  // диапозон фильтрации
        card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
        card.setAttribute('price-filter', 'no')
      } else {
        card.parentNode.style.display = 'flex' // отображаем все карточки
      }
    })
  }

  min.addEventListener('change', filterPrice) // задаём минимальную цену товара
  max.addEventListener('change', filterPrice) // задаём максимальную цену товара

  // ========== поиск по заголовкам карточек (шапка сайта) ===============================

  const searchBtn = document.querySelector('.search-btn') // кнопка поиска в шапке сайта
  const searchInput = document.querySelector('.search-wrapper_input') // input для поиска по сайту

  searchBtn.addEventListener('click', () => {
    const searchText = new RegExp(searchInput.value.trim(), 'i') // введенное в поле поиска значение преобразовываем в регулярное выражение и далее будем искать первое совпадение 
    cards.forEach((card) => {
      const cardTitle = card.querySelector('.card-title')
      if (!searchText.test(cardTitle.textContent)) {  // есть ли регулярное выражение в заголовке карточки
        card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
      } else {
        card.parentNode.style.display = 'flex' // отображаем все карточки
      }
    })
  })
} // end actionPage()


// end filter for action -----------------------------------------


// functions' call -------------------------------------------------

toggleCheckbox()
toggleCart()
addCart()
actionPage()

// end functions' call -------------------------------------------------