        const images = document.querySelectorAll('.image-box .image')
        const prev = document.querySelector('.prev')
        const next = document.querySelector('.next')
        const close = document.querySelector('.close ')
        const galleryImg = document.querySelector('.gallery__inner .gallery__inner-image')
        const gallery = document.querySelector('.gallery')


        var currentIndex = 0

        function showGallery(){
            //PRev
            if(currentIndex == 0 ){
                prev.classList.add('hide')
            }else{
                prev.classList.remove('hide')
            }

            //Next
            if(currentIndex == images.length - 1 ){
                next.classList.add('hide')
            }else{
                next.classList.remove('hide')
            }



            galleryImg.src = images[currentIndex].src
            gallery.classList.add('show')
        }

        images.forEach((image,index) =>{
            image.addEventListener('click', () =>{
                currentIndex = index
                showGallery()
            })

        })

        close.addEventListener('click', () =>{
            gallery.classList.remove('show')

        })

       

        prev.addEventListener('click', () =>{
            if(currentIndex > 0){
                currentIndex--
                showGallery()
            }
        })

        next.addEventListener('click', () =>{
            if(currentIndex < images.length - 1){
                currentIndex++
                showGallery()
            }
        })

        document.addEventListener('keydown', function(e){
            if(e.keyCode == '27'){
                gallery.classList.remove('show')
            }
        })