export default function addCart() {
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