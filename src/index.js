import getData from '../modules/getData'
import renderCards from '../modules/renderCards'
import renderCatalog from '../modules/renderCatalog'
import toggleCheckbox from '../modules/toggleCheckbox'
import toggleCart from '../modules/toggleCart'
import addCart from '../modules/addCart'
import actionPage from '../modules/actionPage'

(async function () {
  const data = await getData()
  renderCards(data)
  renderCatalog()
  toggleCheckbox()
  toggleCart()
  addCart()
  actionPage()
}())

// инсталяция Webpack
// npm init -y
// npm install webpack  webpack-cli -D
// npx webpack

// end functions' call -------------------------------------------------
