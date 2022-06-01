//1. Render song
//2. ScrollTop
//3. Play/Pause/Seek
//4. CD Rolate
//5. Next/Prev 
//6. Random songs
//7. Next/Repeat when ended
//8. Active songs
//9. Scroll Active song into view
//10. Play song when click 

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const playlists = $('.playlist');
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const btnNext  = $('.btn-next')
const btnPrev = $('.btn-prev')
const randomSong = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


console.log()


const app = {
  currentIndex : 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Despacito",
      singer: "Raftaar x Fortnite",
      path: "./audio/Despacito.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Let Me Love You",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./audio/LetMeLoveYou.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Look What You Made Me Do",
      singer: "Raftaar x Brobha V",
      path:
        "./audio/LookWhatYouMadeMeDo.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Love Your Seft",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "./audio/LoveYourself.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Sorry",
      singer: "Raftaar",
      path: "./audio/Sorry.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Yummi",
      singer: "Raftaar x kr$na",
      path:
        "./audio/Yummy.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    }
  ],

  //Ham render UI
  render: function() {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
      `
     })

     playlists.innerHTML = htmls.join('');
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },
  
  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path

  },

  handleEvents: function() {
    const _this = this;

    //Xu ly  CD quay / dung
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    })

    cdThumbAnimate.pause()

    //Xu ly ScrollTop
    const cdWidth = cd.offsetWidth;
    document.onscroll = function() {
      const scrollTop = window.screenY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth/cdWidth
    }

    //Xu ly khi click play
    playBtn.onclick = function() {
      if(_this.isPlaying){
        audio.pause()
      }else{
        audio.play()
      }
    }

    //Khi song duoc play
    audio.onplay = function() {
      _this.isPlaying = true;
      player.classList.add('playing')
      cdThumbAnimate.play()

    }

    //Khi song bi pause
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing')
      cdThumbAnimate.pause()

    }

    //Khi tien do bai hat thay doi
    audio.ontimeupdate = function() {
      if(audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
        
      }
    }

    //Xu ly khi tua
    progress.onchange = function(e) {
        const seekTime = e.target.value * audio.duration / 100
        audio.currentTime = seekTime
    }

    //Khi next song
    btnNext.onclick = function() {
      if(_this.isRandom){
        _this.playRandomSong()
      }else{
        _this.nextSong();
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()

    }

    //Khi pre song
    btnPrev.onclick = function() {
      if(_this.isRandom){
        _this.playRandomSong()
      }else{
        _this.prevSong();
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //Xu ly bat/tat random xong
    randomSong.onclick = function(e) {
      _this.isRandom = !_this.isRandom;
      randomSong.classList.toggle('active' ,this.randomSong)
    }

    //Xu ly next song khi ended
    audio.onended = function() {
      if(_this.isRepeat){
          audio.play()
      }else{
          btnNext.click()
      }
    }

    //Xu ly lap lai song
    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active', _this.isRepeat)
    }

    //Lang nghe hang vi click vao playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)")

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }
      }
    };
  },
  
  nextSong: function() {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  prevSong: function() {
    this.currentIndex--;
    if(this.currentIndex < 0) {
        this.currentIndex = this.songs.length -1 
    }
    this.loadCurrentSong()
  },

  playRandomSong: function() {
    let newIndex
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while(newIndex === this.currentSong)
    
    this.currentIndex = newIndex
    this.loadCurrentSong()

  },

  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    },300)
  },

  start: function() {
    //LAng nghe/ Xu ly cac su kien(Dom events)
    this.handleEvents()

    //Dinh nghia cac thuoc tinh cho Object
    this.defineProperties()

    //Tai thong tin bai hat dau tien vao UI khi chay app
    this.loadCurrentSong()
    
    //Render playlists
    this.render()

   
  }


}

app.start()
