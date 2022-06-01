const toggleBtn = document.querySelector('.toggle')
const video = document.querySelector('.player__video')
const time = document.querySelector('.player__time')
const progress = document.querySelector('.player__progress')
const progressBar = document.querySelector('.player__progress-filled')
const skipBtn = document.querySelectorAll('[data-skip]')
const volume = document.querySelector('.player__volume input')


toggleBtn.addEventListener('click', function() {
    if(video.paused){
        video.play()
        this.innerHTML = `<i class='bx bx-pause'></i>`
    } else {
        video.pause()
        this.innerHTML = `<i class='bx bx-play'></i>`
    }

})


//ProgressBar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${percent}%`

    time.innerHTML = `${formatTime(video.currentTime)}/ ${formatTime(video.duration)}`
}

//Format time
function formatTime(time) {
    let minutes = Math.floor(time / 60)
	let seconds = Math.floor(time - minutes * 60)
	let minuteValue, secondValue

    minuteValue = minutes < 10 ? '0' + minutes : minutes
	secondValue = seconds < 10 ? '0' + seconds : seconds

	let mediaTime = minuteValue + ':' + secondValue
	return mediaTime

}

//Tua
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration
    video.currentTime = scrubTime
    console.log(scrubTime)
    
}

//Skip btn
skipBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        video.currentTime += +btn.dataset.skip
    })
})

volume.addEventListener('change', function () {
	video.volume = this.value
})


progress.addEventListener('click', scrub)

video.addEventListener('timeupdate', handleProgress)


