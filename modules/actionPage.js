export default function actionPage() {
  // ========= фильтр по акции (дисконту) ================

  const cards = document.querySelectorAll('.goods .card') // выбираем все карточки
  const discountCheckbox = document.getElementById('discount-checkbox') // выбираем дисконтные карточки (акция)

  discountCheckbox.addEventListener('click', () => {
    cards.forEach((card) => {
      card.setAttribute('discont-filter', 'yes')
      if (discountCheckbox.checked) {
        if (!card.querySelector('.card-sale') || card.getAttribute('price-filter') === 'no' || card.getAttribute('category-filter') === 'no') { // отображаем дисконтные карточки и отфильтрованные по цене
          card.parentNode.style.display = 'none' // обращаемся к родителю элемента card
          // card.parentNode.remove() // альтернативный способ
        }
      }
      if (!discountCheckbox.checked) {
        // console.log('discountCheckbox.checked: ', discountCheckbox.checked);

        card.parentNode.style.display = 'flex' // обращаемся к родителю элемента card
        card.setAttribute('discont-filter', 'no') // Устанавливаем значение атрибута
        if (card.getAttribute('price-filter') === 'no' || card.getAttribute('category-filter') === 'no') { // отображаем дисконтные карточки и отфильтрованные по цене
          card.parentNode.style.display = 'none' // обращаемся к родителю элемента card
        }
      }
    })
  })

  // ========== фильтр по диапозону цен ============

  const min = document.getElementById('min') // input для ввода минимального значения
  const max = document.getElementById('max') // input для ввода максимального значения

  function filterPrice() { // функция-фильтр (обработчик события change!!!)
    cards.forEach((card) => {
      card.parentNode.style.display = 'flex' // отображаем все карточки
      card.setAttribute('price-filter', 'yes') // Устанавливаем значение атрибута
      const cardPrice = card.querySelector('.card-price') // извлекаем из карточки её цену
      const price = parseFloat(cardPrice.textContent) // удаляем из карточки символ валюты

      if ((min.value && price < min.value) || (price > max.value && max.value) || card.getAttribute('discont-filter') === 'no' || card.getAttribute('category-filter') == 'no') {  // диапозон фильтрации
        card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
        // card.setAttribute('price-filter', 'no') // Устанавливаем значение атрибута
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
      if (!searchText.test(cardTitle.textContent)) { // есть ли регулярное выражение в заголовке карточки
        card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
      } else {
        card.parentNode.style.display = 'flex' // отображаем все карточки
      }
    })
  })

}