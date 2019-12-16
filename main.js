


window.onload = function(){


var keysPressed = {
  left: false,
  right: false
}
var ben = document.querySelector('.ben')
var container = document.getElementById('container')
var scoreElements = document.querySelectorAll('.score')

var i = 0
var score = 0
var angle = 0
var game = null
var indx = 0
var jumping = false
var stoneGenerated = false
var playing = false


function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function generateStone() {
  console.log('generating')
  if (stoneGenerated) return
  if (Math.random() > 0.1) return
  var rockElement = createElementFromHTML('<div class="rock"><img src="img/rock.png"></div>')
  container.appendChild(rockElement)
  stoneGenerated = true
  window.setTimeout(function() {rockElement.remove()}, 2000)
  window.setTimeout(function(){stoneGenerated = false}, 600)
}

function increaseScore() {
  score += 1
  scoreElements.forEach(function(e){e.innerHTML = score})
}

function resetScore() {
  score = 0
  scoreElements.forEach(function(e){e.innerHTML = score})
}

function startGame() {
  angle = 0
  indx = 0
  playing = true
  resetScore()
  clearInterval(game)
  container.classList.remove('starting')
  container.classList.remove('finished')
  container.classList.add('playing')
  playing = true
  game = window.setInterval(function() {
    if(angle >= Math.PI / 2 || angle <= -Math.PI / 2) {
      clearInterval(game)
      container.classList.remove('playing')
      container.classList.add('finished')
      document.querySelectorAll('.rock').forEach(function(e){
        e.remove()
      })
      playing = false
      return
    } else if(keysPressed.left) {
      angle += Math.PI / 40
    } else if(keysPressed.right) {
      angle -= Math.PI / 40
    }
    benOffsetLeft = ben.offsetLeft
    benOffsetTop = ben.offsetTop
    for (let e of document.querySelectorAll('.rock')) {
      if(e.offsetLeft < benOffsetLeft+110 && e.offsetLeft > benOffsetLeft && benOffsetTop > 100) {
        // container.classList.remove('playing')
        Object.assign(ben.style, {transform:"rotate(90deg)"})
        container.classList.remove('playing')
        container.classList.add('finished')
        document.querySelectorAll('.rock').forEach(function(e){
          e.remove()
        })
        clearInterval(game)
        playing = false
        return
      }
    }
    if(angle > 0) {
      angle += Math.PI / 64
    } else {
      angle -= Math.PI / 64
    }
    var moveLeft = Math.sin(angle) * 400
    Object.assign(ben.style, {transform:"rotate("+angle+"rad)"})
    increaseScore()
    generateStone()
  }, 50)
}


document.addEventListener('keydown', function(e) {
 if(e.which == 37) {
   keysPressed.right = true
 } else if (e.which == 39) {
   keysPressed.left = true
 } else if (e.which == 38 && !jumping) {
   ben.classList.add('jumping')
   jumping = true
   console.log('jump', jumping)
   window.setTimeout(function() {
     ben.classList.remove('jumping')
     jumping = false
   }, 500)
 } else if (e.which == 32 && !playing) {
   startGame()
 }
})

document.addEventListener('keyup', function(e) {
 if(e.which == 37) {
   keysPressed.right = false
 } else if (e.which == 39) {
   keysPressed.left = false
 }
})



}
