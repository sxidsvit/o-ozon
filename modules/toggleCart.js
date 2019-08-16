export default function toggleCart() {
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