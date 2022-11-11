const { ipcRenderer } = require('electron')

// const showModal = document.getElementById('show-modal')
const closeModal = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const add = document.getElementById('add-item')
const url = document.getElementById('url')

const toggleModalButtons = () => {
  if (add.disabled === true) {
    add.disabled = true
    add.style.opacity = 0.5
    add.innerText = 'Adding...'
    closeModal.style.display = 'inline'
  } else {
    add.disabled = true
    add.style.opacity = 0.5
    add.innerText = 'Adding...'
    closeModal.style.display = 'none'
  }
}

// showModal.addEventListener('click', () => {
//   modal.style.display = 'flex'
//   url.focus()
// })

// closeModal.addEventListener('click', () => {
//   modal.style.display = 'none'
// })

// add.addEventListener('click', () => {
//   if (url.value) {
//     ipcRenderer.send('new-item', url.value)
//     // disable
//     toggleModalButtons()
//   }
// })

ipcRenderer.on('new-item-success', (e, newItem) => {
  console.log(newItem)

  toggleModalButtons()

  modal.style.display = 'none'
  url.value = ''
})

// url.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') add.click()
// })
