export default function filter() {
  const cards = document.querySelectorAll('.goods .card') // карточка товара
  const discountCheckbox = document.getElementById('discount-checkbox')
  const min = document.getElementById('min')
  const max = document.getElementById('max')
  const activLi = document.querySelector('.catalog-list li.active')

  cards.forEach((card) => {
    const cardPrice = card.querySelector('.card-price')
    const price = parseFloat(cardPrice.textContent)
    const discount = card.querySelector('.card-sale')
    card.parentNode.style.display = 'flex'

    if ((min.value && price < min.value) || (price > max.value && max.value)) {
      card.parentNode.style.display = 'none'
    } else if (discountCheckbox.checked && !discount) {
      card.parentNode.style.display = 'none'
    } else if (activLi) {
      if (card.dataset.category !== activLi.textContent) {
        card.parentNode.style.display = 'none'
      }
    }
  })
}

// discountCheckbox.addEventListener('click', filter)
// min.addEventListener('change', filter)
// max.addEventListener('change', filter)
