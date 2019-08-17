import filter from '../modules/filter'

export default function actionPage() {
  // ========= фильтр по акции (дисконту) ================

  const cards = document.querySelectorAll('.goods .card') // выбираем все карточки
  const discountCheckbox = document.getElementById('discount-checkbox') // выбираем дисконтные карточки (акция)


  discountCheckbox.addEventListener('click', filter)

  // ========== фильтр по диапозону цен ============

  const min = document.getElementById('min') // input для ввода минимального значения
  const max = document.getElementById('max') // input для ввода максимального значения

  min.addEventListener('change', filter) // задаём обработчик для минимальной цены товара
  max.addEventListener('change', filter) // задаём обработчик для максимальной цены товара

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
