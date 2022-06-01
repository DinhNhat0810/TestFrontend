const draggable = document.querySelector('.draggable')
const boxes = document.querySelectorAll('.box')

draggable.addEventListener('dragstart', dragStart)
draggable.addEventListener('dragend', dragEnd)

boxes.forEach((box) => {
	box.addEventListener('dragover', dragOver)
	box.addEventListener('drop', dragDrop)
})


function dragStart() {
	this.classList.add('dragging')
}

function dragEnd() {
	this.classList.remove('dragging')
}

//Xuat hien anh khi keo tren box
function dragOver(e) {
	// thêm preventDefault vì theo mặc định thả vào bên trong 1 phần tử sẽ bị vô hiệu hóa => xem con trỏ chuột khi over để rõ hơn
	e.preventDefault()
	this.appendChild(draggable)
}

//Xuat hien anh khi tha vao box
function dragDrop() {
	this.appendChild(draggable)
}










