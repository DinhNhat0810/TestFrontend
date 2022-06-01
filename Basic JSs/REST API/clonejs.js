var coursesApi = 'http://localhost:3000/courses'
var nameBox = document.querySelector('input[name="name"]')
var descriptionBox = document.querySelector('input[name="description"]')

function start(){
    getCourses(renderCourses)
    handleCreateCourses()

}

start()

//Get Courses
function getCourses(callback) {
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

//ham Create
function createCourses(data,callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesApi, options)
        .then(function(response) {
            return response.json();
        }) 
        .then(callback);
}




function handleCreateCourses(){
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function(){
        var formData = {
            name: nameBox.value,
            description: descriptionBox.value
        }

        if(nameBox.value=='' || descriptionBox.value==''){
            alert('Nhap vao')
        }else{
            createCourses(formData,()=>{
                getCourses(renderCourses)
            })
        }
    }
}


function handleDeleteCourses(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesApi + '/' + id, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + id)
            if(courseItem) {
                courseItem.remove()
            }

            checkItem()
        })
}

function checkItem() {
    var listCourses = document.querySelector('#list-courses')
    var undoCreateBtn = document.querySelector('.btn')
            if(listCourses.childElementCount==0) {
                if(undoCreateBtn.id == 'update'){
                    undoCreateBtn.id = 'create'
                    undoCreateBtn.innerText = 'create'
                }
                document.querySelector('input[name="name"]').value=''
                document.querySelector('input[name="description"]').value=''

                handleCreateCourses()

            }


}


function updateCourse(id, data, callback){
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(coursesApi + "/" +id, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function handleUpdateCourses(id){
    var getName = document.querySelector('.course-item-' + id + ' h2').innerText
    var getDescription = document.querySelector('.course-item-' + id + ' p').innerText

    nameBox.value = getName
    descriptionBox.value = getDescription

    if(!document.querySelector('#update')) {
        document.querySelector('#create').id = 'update';
    }

    document.querySelector('#update').innerText = 'Luu';
    
    var updateBtn = document.querySelector('#update')
    updateBtn.onclick = function() {
        var FormData = {
            name: nameBox.value,
            description: descriptionBox.value
        }

        if(nameBox.value == '' || descriptionBox.value == ''){
            alert('Nhap lai nao')
        }else{
            updateCourse(id,FormData, ()=> {
                getCourses(renderCourses)
            })
        }
    }

}






function renderCourses(courses){
    var listCourses = document.querySelector('#list-courses')
    var htmls = courses.map(course => {
        return `
            <li class="course-item-${course.id}">
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourses(${course.id})">Xoa</button>
                <button onclick="handleUpdateCourses(${course.id})">Sua</button>
                
            
            </li>
        
        `
    })


    listCourses.innerHTML = htmls.join('')

}
