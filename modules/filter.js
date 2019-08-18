export default function filter() {
  console.log('event.target', event.target)
  const cards = document.querySelectorAll('.goods .card') // карточка товара
  const discountCheckbox = document.getElementById('discount-checkbox')
  const min = document.getElementById('min')
  const max = document.getElementById('max')
  const activLi = document.querySelector('.catalog-list li.active')

  const searchInput = document.querySelector('.search-wrapper_input') // input для поиска по сайту
  const searchText = new RegExp(searchInput.value.trim(), 'i')

  cards.forEach((card) => {
    const cardPrice = card.querySelector('.card-price')
    // console.dir(cardPrice);
    const price = parseFloat(cardPrice.textContent)
    const discount = card.querySelector('.card-sale')
    const cardTitle = card.querySelector('.card-title')
    card.parentNode.style.display = 'flex'

    if ((min.value && price < min.value) || (price > max.value && max.value)) {
      // console.log('price: ', price)
      card.parentNode.style.display = 'none'
    } else if (discountCheckbox.checked && !discount) {
      // console.log('discont: ', price)
      card.parentNode.style.display = 'none'
    } else if (activLi && (card.dataset.category !== activLi.textContent)) {
      // console.log('category: ', price)
      card.parentNode.style.display = 'none'
    } else if (!searchText.test(cardTitle.textContent)) { // есть ли регулярное выражение в заголовке карточки
      // console.log('text: ', price)
      card.parentNode.style.display = 'none' // скрываем карточки не попавшие в диапозон поиска
    } else {
      // console.log('show: ', price)
      card.parentNode.style.display = 'flex' // отображаем все карточки
    }
  })
}
