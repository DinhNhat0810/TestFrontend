const productsApi = 'http://localhost:3000/courses';
const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)

const modal = $('.modal')
const registerModal = $('.register-modal')
const loginModal = $('.login-modal')
const userRegister = $('.user-register')
const userLogin = $('.user-login')
const logged = $('.logged')
const errMessage = $('.form-login span')
const logout = $('.logout')



function start(){
    getProducts(renderProducts)
    typeProducts()
    searchProducts()
    register()
    login()
    modalSwapLogin()
    modalSwapRegister()
    blockRegister()
    formSubmit()
    logoutHandle()


}

start()

function getProducts(callback){
    fetch(productsApi)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

//Render san pham
function renderProducts(products){
    const listProduct = $('.list-product')
    const htmls = products.map(product=>{
        return `
            <div class="col l-3 m-4 c-6 item-product">
                <h2 class="title-product">${product.title}</h2>
                <p class="des-product">${product.description}</p>
                <span class="category-product">${product.category}</span>
                <div class="image-box">
                    <img src="${product.image}" alt="" class="image-product">
                </div>
            </div>
        `
    })

    listProduct.innerHTML = htmls.join('')
}

//Render sau khi filter
function renderFilter(filterData){
    renderProducts(filterData)
}



//Phan loaij san pham
function typeProducts(){
    const categories = $$('.item-category')
    categories.forEach(category=>{
        const id = category.getAttribute('data-filter')
        category.onclick = function(){
            $('.item-category.active').classList.remove('active')
            this.classList.add('active')
            if(id){
                function filterProduct(products){
                    const filterData = products.filter(product=>{
                        return product.category === id
                    })
                    if(filterData){
                        renderFilter(filterData)
                    }
                }
                getProducts(filterProduct)
            }else{
                getProducts(renderProducts)
            }    
        }
    });
    
}

//Tim kiem san pham
function searchProducts(){
    const search = $('.search')
    search.oninput = function(e){
        const searchString = e.target.value.toLowerCase()
        function filterProduct(products){
            const filterData = products.filter(product=>{
                return (
                    product.category.toLowerCase().includes(searchString) ||
                    product.title.toLowerCase().includes(searchString)
                )
            })
            if(filterData){
                renderFilter(filterData)
            }
        }
        getProducts(filterProduct)
        
    }
}

//Dang ky
function register(){
    const register = $('.user-register')
    register.onclick = function(e){
        e.preventDefault()
        modal.style.display = 'block'
        registerModal.style.display = 'block'
    }
}

//Dang nhap
function login(){
    const login = $('.user-login')
    login.onclick = function(e){
        e.preventDefault()
        modal.style.display = 'block'
        loginModal.style.display = 'block'
    }
}

//Modal swap login
function modalSwapLogin(){
    const swap = $('.swap-login')
    swap.onclick = function(){
        registerModal.style.display = 'none'
        loginModal.style.display = 'block'
    }
}

//Modal swap register
function modalSwapRegister(){
    const swap = $('.swap-register')
    swap.onclick = function(){
        registerModal.style.display = 'block'
        loginModal.style.display = 'none'
    }
}

//Block register
function blockRegister(){
    const blockRegister = $('.form-register')
    blockRegister.onsubmit = function(e){
        e.preventDefault()
    }
}

//Submit
function formSubmit(){
    const formSubmit = $('.form-login')
    formSubmit.addEventListener('submit', e=>{
        e.preventDefault()
        var username = $('#user-name').value
        var password = $('#user-pass').value

        if (username == 'admin' && password == '123456'){
            modal.style.display = 'none'
            userRegister.style.display = 'none'
            userLogin.style.display = 'none'
            logged.style.display = 'block'
            logout.style.display = 'inline-block'
        } else{
            errMessage.style.display = 'block'
        }
    })

}

//logout function
function logoutHandle(){
    logout.onclick = function(){
        logout.style.display = 'none'
        userRegister.style.display = 'inline-block'
        userLogin.style.display = 'inline-block'
        logged.style.display = 'none'


    }
}


//Handles
function handles(){
    logged.onclick = function(){
        
    }
}



   











    