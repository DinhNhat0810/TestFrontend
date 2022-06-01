    const products = document.querySelector('.list-product')
    const input = document.querySelector('.search-input')
    const listItems = []

    function start() {
        getProducts()
        input.addEventListener('input', (e) => {
            filterProduct(e.target.value)
           
        })

    }

    async function getProducts() {
        const res = await fetch('https://fakestoreapi.com/products')

        const results = await res.json()

        //clear products
        products.innerHTML = ''

        results.forEach(product =>{
            const div = document.createElement('div')
            div.setAttribute('class', 'product-item')
            listItems.push(div)

            div.innerHTML = `
                <img src="${product.image}">
                <div class="infor">
                    <div class="title">${product.title}</div>
                    <div class="price">$${product.price}</div>
                </div>
            `

            products.appendChild(div)
        })
    }


    function filterProduct(data) {
        listItems.forEach((product) => {
            if (product.innerText.toLowerCase().includes(data.toLowerCase())) {
                product.classList.remove('hide')
            } else {
                product.classList.add('hide')
            }
        })
    }

    start()
