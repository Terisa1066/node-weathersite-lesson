

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherOne = document.querySelector('#message-1')
const weatherTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    weatherOne.textContent = 'Wait for it...'
    weatherTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            
            weatherOne.textContent = data.error
        } else {
            weatherOne.textContent = data.location
            weatherTwo.textContent = data.forecast
        }
    })
})
    
})