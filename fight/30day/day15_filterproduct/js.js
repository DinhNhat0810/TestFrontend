
    productsApi = "https://fakestoreapi.com/products"
    const input = document.querySelector('.search-input')

    function start(){
        getProducts(renderProducts)
        getProducts(filterProducts)
    }

    start()


    function getProducts(callback) {
        fetch(productsApi)
            .then(function(response){
                return response.json()
            })
            .then(callback)
    }

    function filterProducts(products) {
        input.onkeyup = function(e){
            let searchInput = e.target.value
            var results = products.filter(product =>{
                return (
                    product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    product.price.toString().includes(searchInput)
                )
            })
            
            renderProducts(results)
            
        }

    }


    function renderProducts(products) {
        const listProducts = document.querySelector('.list-product')

        var htmls = products.map((product,index) => {
            return `
                <div class="product-item">
                    <img src="${product.image}" alt="" srcset="">
                    <div class="infor">
                        <div class="title">${product.title}</div>
                        <div class="price">$${product.price}</div>
                    </div>
                </div>
            `
        })
        listProducts.innerHTML = htmls.join('')
        input.focus()
    }




