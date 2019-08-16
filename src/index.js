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
        if (!card.querySelector('.card-sale') || card.getAttribute('price-filter') == 'no' || card.getAttribute('category-filter') == 'no') { // отображаем дисконтные карточки и отфильтрованные по цене
          card.parentNode.style.display = 'none' // обращаемся к родителю элемента card
          card.setAttribute('discont-filter', 'no')  // Устанавливаем значение атрибута
          // card.setAttribute('category-filter', 'no')  // Устанавливаем значение атрибута
          // card.parentNode.remove() // альтернативный способ
        }
      }
      if (!discountCheckbox.checked) {
        // console.log('discountCheckbox.checked: ', discountCheckbox.checked);

        card.parentNode.style.display = 'flex' // обращаемся к родителю элемента card
        card.setAttribute('discont-filter', 'no')  // Устанавливаем значение атрибута
        if (card.getAttribute('price-filter') == 'no' || card.getAttribute('category-filter') == 'no') { // отображаем дисконтные карточки и отфильтрованные по цене
          card.parentNode.style.display = 'none' // обращаемся к родителю элемента card
        }
      }
    })
  })

  // ========== фильтр по диапозону цен ============

  const min = document.getElementById('min')  // input для ввода минимального значения
  const max = document.getElementById('max')  // input для ввода максимального значения

  function filterPrice() { // функция-фильтр (обработчик события change!!!)
    cards.forEach((card) => {
      card.setAttribute('price-filter', 'yes') // Устанавливаем значение атрибута
      const cardPrice = card.querySelector('.card-price') // извлекаем из карточки её цену
      const price = parseFloat(cardPrice.textContent) // удаляем из карточки символ валюты

      if ((min.value && price < min.value) || (price > max.value && max.value) || card.getAttribute('discont-filter') == 'no' || card.getAttribute('category-filter') == 'no') {  // диапозон фильтрации
        card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
        card.setAttribute('price-filter', 'no') // Устанавливаем значение атрибута
      } else {
        card.parentNode.style.display = 'flex' // отображаем все карточки
      }
    })
  }

  min.addEventListener('change', filterPrice) // задаём обработчик для минимальной цены товара
  max.addEventListener('change', filterPrice) // задаём обработчик для максимальной цены товара

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


// Get data from server -------------------------------------------------

function getData() {
  const goodsWrapper = document.querySelector('.goods')
  // https://jsonplaceholder.typicode.com/ 
  return fetch('db/db.json')
    .then((response) => {
      if (response.ok) {
        return response.json(); // получаем данные для последующей обработки
      } else {
        // ловим ошибку и передаем её дальше для обработки в catch()
        throw new Error('Данные не были получены. Ошибка: ' + response.status)
      }
    })
    // .then((data) => data) // возвращаем полученные с сервера данные для их последующей обработки
    .catch(err => {  // получаем сообщение об ошибке и выводи его внутри обертки карточек 
      console.warn(err)
      goodsWrapper.innerHTML = '<div class="mt-5 p-5 text-danger bg-light shadow lead text-center" >Что-то пошло не так<br> Возможно проблема с сервером ...</div>'
    })
}
// end get data from server 


// Cards rendering -------------------------------------------------

function renderCards(data) {   // рендерим данные полученные с сервера
  const goodsWrapper = document.querySelector('.goods') // обертка для карточек
  data.goods.forEach((good) => {
    const card = document.createElement('div')
    card.className = 'col-12 col-md-6 col-lg-4 col-xl-3' // задаем классы элементу
    card.innerHTML = `
      <div class="card" data-category = "${good.category}">
        ${good.sale ? '<div class="card-sale">🔥Hot Sale💖</div>' : ''}
				<div class="card-img-wrapper">
					<span class="card-img-top"
						style="background-image: url('${good.img}')"></span>
				</div>
				<div class="card-body justify-content-between">
					<div class="card-price" style = "${good.sale ? 'color : red' : ''}">${good.price} ₽</div>
        <h5 class= "card-title" > ${good.title}</h5 >
        <button class="btn btn-primary">В корзину</button>
			</div >
    `
    goodsWrapper.appendChild(card)
  })
}
// end cards rendering


// Сatalog rendering -------------------------------------------------

function renderCatalog() {
  const cards = document.querySelectorAll('.goods .card') // карточки товаров
  const catalogBtn = document.querySelector('.catalog-button') // обертка списка категорий и кнопки "Каталог"
  const catalogWrapper = document.querySelector('.catalog')  // обертка списка категорий каталога
  const catalogList = document.querySelector('.catalog-list') // тэг ul для вывода списка категорий каталога
  const categories = new Set() // коллекция для сохранения уникальных значений категорий  

  cards.forEach(card => { // получаем все категории товаров
    card.setAttribute('category-filter', 'no')
    categories.add(card.dataset.category) // получаем значение дата-атрибута data-category
  })

  categories.forEach((item) => { // формируем список категорий
    const li = document.createElement('li')
    li.textContent = item
    catalogList.appendChild(li)
  })

  catalogBtn.addEventListener('click', (event) => {
    if (catalogWrapper.style.display) {  // Отображение.скрытие списка категорий
      catalogWrapper.style.display = ''
    } else {
      catalogWrapper.style.display = 'block'
    }
    if (event.target.tagName == 'LI') {  // если кликнули по элементу списка категорий
      cards.forEach((card) => { // получаем карточки из выбранной категории
        if (card.dataset.category === event.target.textContent) {
          card.parentNode.style.display = 'flex'
          card.setAttribute('category-filter', 'yes')
        } else {
          card.parentNode.style.display = 'none'
          card.setAttribute('category-filter', 'no')
        }
      })
    }
  })

}
// end catalog rendering


// Functions' call -------------------------------------------------

getData().then((data) => {
  // только после получения данных от сервера ( из базы данных ) можно выполнять другие функции
  renderCards(data)
  toggleCheckbox()
  toggleCart()
  addCart()
  actionPage()
  renderCatalog()
})

// end functions' call -------------------------------------------------


/* Альтернативный фильтр по цене и дисконту
 function filter() {
   const cards = document.querySelectorAll('.goods .card') // карточка товара
   cards.forEach((card) => {
     const cardPrice = card.querySelector('.card-price')
     const price = parseFloat(cardPrice.textContent)
     const discount = card.querySelector('.card-sale')
     if ((min.value && price < min.value) || (price > max.value && max.value)) {
       card.parentNode.style.display = 'none'
     } else if (discountCheckbox.checked && !discount) {
       card.parentNode.style.display = 'none'
     } else {
       card.parentNode.style.display = 'flex'
     }
   })
 }
 discountCheckbox.addEventListener('click', filter)
 min.addEventListener('change', filter)
 max.addEventListener('change', filter)
*/