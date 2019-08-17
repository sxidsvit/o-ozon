export default function filterTitle() {
  // поиск по заголовкам карточек текста введенного в строке поиска
  const cards = document.querySelectorAll('.goods .card') // карточка товара
  const searchInput = document.querySelector('.search-wrapper_input') // input для поиска по сайту
  const searchText = new RegExp(searchInput.value.trim(), 'i') // введенное в поле поиска значение преобразовываем в регулярное выражение и далее будем искать первое совпадение
  cards.forEach((card) => {
    const cardTitle = card.querySelector('.card-title')
    if (!searchText.test(cardTitle.textContent)) { // есть ли регулярное выражение в заголовке карточки
      card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
    } else {
      card.parentNode.style.display = 'flex' // отображаем все карточки
    }
  })
}
