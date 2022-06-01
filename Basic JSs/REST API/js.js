var coursesApi = 'http://localhost:3000/Courses';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

//Get Courses
function getCourses(callback) {
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

//ham create
function createCourses(data, callback) {
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

//Handle create
function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var FormData = {
            name: name,
            description: description
        }
        createCourses(FormData, function() {
            getCourses(renderCourses);
        })

    }
}

//handle delete
function handleDeleteCourses(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-'+id);
            if(courseItem){
                courseItem.remove();
            }
        })
}

//function update
function updateCourse(id, data, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(coursesApi + "/" +id, options)
        .then(function(response) {
            return  response.json();
        })
        .then(callback);
}

//handle update
function handleUpdateCourses(id) {
    var getName = document.querySelector('.course-item-' + id + ' h2').innerText;
    var getDescription = document.querySelector('.course-item-' + id + ' p').innerText;
    
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');

    name.value = getName;
    description.value = getDescription;

    if(!document.querySelector('#update')) {
        document.querySelector('#create').id = 'update';
    }
    document.querySelector('#update').innerText = 'Luu';
    var updateBtn = document.querySelector('#update');
    updateBtn.onclick = function() {
        var FormData = {
            name: name.value,
            description: description.value
        }
        if(name.value=='' || description.value=='') {
            alert("Nhap lai di");
        }else {
            updateCourse(id, FormData, function() {
                getCourses(renderCourses);
            })
        };
    }
}
//Ham render
function renderCourses(courses) {
    var listCourses = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
        <li class="course-item-${course.id}">
        <h2>${course.name}</h2>
        <p>${course.description}</p>
        <button onclick="handleDeleteCourses(${course.id})">Xoa</button>
        <button onclick="handleUpdateCourses(${course.id})">Sua</button>
        </li>`;
    }) 
    listCourses.innerHTML = htmls.join('');
}
