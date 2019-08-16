export default function getData() {
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
