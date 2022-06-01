const container = document.querySelector('.container')
const squares = 200

for(let i = 0; i < squares; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', ()=> {setColor(square)})
    square.addEventListener('mouseout', ()=> {removeColor(square)})


    container.appendChild(square)
}


function setColor(element) {
    let color = generateRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 10px ${color}, 0 0 100px ${color}`
}

function removeColor(element) {
    element.style.background = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #000'
}


function generateRandomColor(){
    let letters = '0123456789ABCDEF'
    let color = '#'
    for(let i=0; i<6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)] 
    }
    return color
}
