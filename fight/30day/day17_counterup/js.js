const facebook = document.querySelector('.facebook span')
const youtube = document.querySelector('.youtube span')
const instagram = document.querySelector('.instagram span')

function counterUp(e, to){ 
    let speed = 200
    let from = 0
    let step = to / speed

    const counter = setInterval(() =>{
        from = from + step 
        if(from > to){
            clearInterval(counter)
            e.innerText = to
        } else {
            e.innerText = Math.ceil(from)
        }
    },1)

}

counterUp(facebook , 3000)
counterUp(youtube , 4500)
counterUp(instagram , 2500)






