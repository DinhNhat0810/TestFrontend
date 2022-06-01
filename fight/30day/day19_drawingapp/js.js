const decrease = document.querySelector('#decrease')
const increase = document.querySelector('#increase')
const size = document.querySelector('#size')
const canvas = document.getElementById('canvas')
const colorEl = document.getElementById('color')
const eraserEl = document.getElementById('eraser')
const saveEl = document.getElementById('save')
const clearEl = document.getElementById('clear')

const context = canvas.getContext('2d')

let isPressed = false
let currentSize = 10
colorEl.value = '#000000'
let color = colorEl.value
let x, y

//Canvas
canvas.addEventListener('mousedown', (e) => {
	isPressed = true

	x = e.offsetX
	y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
	isPressed = false

	x = undefined
	y = undefined
})


canvas.addEventListener('mousemove', (e) => {
	if (isPressed) {
		const x2 = e.offsetX
		const y2 = e.offsetY

		drawCircle(x2, y2)
		drawLine(x, y, x2, y2)

		x = x2
		y = y2
	}
})

function drawCircle(x, y) {
	context.beginPath()
	context.arc(x, y, currentSize, 0, Math.PI * 2)
	context.fillStyle = color
	context.fill()
}

function drawLine(x1, y1, x2, y2) {
	context.beginPath()
	context.moveTo(x1, y1)
	context.lineTo(x2, y2)
	context.strokeStyle = color
	context.lineWidth = currentSize * 2
	context.stroke()
}

colorEl.addEventListener("change" , (e)=>{
    color = e.target.value
})

clearEl.addEventListener("click", (e)=>{
    context.clearRect(0,0,canvas.width,canvas.height)
})

eraserEl.addEventListener("click", (e)=>{
    color = '#fff'
})

saveEl.addEventListener('click', (e)=>{
    const imgUrl = canvas.toDataURL('image/png')
    e.currentTarget.href = imgUrl
})


//size
function updateSizeOnScreen(){
    size.innerText = currentSize
}

increase.addEventListener('click', ()=>{
    currentSize = currentSize + 5

    if(currentSize>50){
        currentSize = 50
    }

    updateSizeOnScreen() 
})

decrease.addEventListener('click', ()=>{
    currentSize = currentSize - 5

    if(currentSize < 5){
        currentSize = 5
    }

    updateSizeOnScreen() 
})





