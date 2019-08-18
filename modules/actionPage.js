import filter from '../modules/filter'
// import filterTitle from '../modules/fiterTitle'

export default function actionPage() {
  // ========= фильтр по акции (дисконту) ================

  // const cards = document.querySelectorAll('.goods .card') // выбираем все карточки
  const discountCheckbox = document.getElementById('discount-checkbox') // выбираем дисконтные карточки (акция)


  discountCheckbox.addEventListener('click', filter)

  // ========== фильтр по диапозону цен ============

  const min = document.getElementById('min') // input для ввода минимального значения
  const max = document.getElementById('max') // input для ввода максимального значения

  min.addEventListener('change', filter) // задаём обработчик для минимальной цены товара
  max.addEventListener('change', filter) // задаём обработчик для максимальной цены товара

  // ========== поиск по заголовкам карточек (шапка сайта) =

  // const searchBtn = document.querySelector('.search-btn') // кнопка поиска в шапке сайта
  const search = document.querySelector('.search') // область поиска в шапке сайта

  search.addEventListener('click', filter)
}
