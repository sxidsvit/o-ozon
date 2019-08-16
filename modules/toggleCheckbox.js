export default function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox')
  // checkbox.onchange = function () {console.log('галочка') }

  checkbox.forEach(elem => {
    elem.addEventListener('change', function () {
      if (this.checked) {
        // console.log('Галочка присутствует')
        this.nextElementSibling.classList.add('checked')
      } else {
        this.nextElementSibling.classList.remove('checked')
        // console.log('Галочка отсутствует')
      }
    })
  })
}