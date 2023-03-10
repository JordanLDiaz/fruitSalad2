import { appState } from "../AppState.js"
import { Player } from "../Models/Player.js"
import { playersService } from "../Services/PlayersService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"
import { setHTML } from "../Utils/Writer.js"

let gameSeconds = 30

function _drawPlayers() {
  let template = ''
  appState.players.forEach(p => template += p.PlayerTemplate)
  setHTML('players', template)
}

function _drawActive() {
  console.log('Drawing active player', appState.activePlayer)
  setHTML('active-player', appState.activePlayer.ActivePlayerTemplate)
}


export class PlayersController {
  constructor() {
    // console.log('hello from controller')
    appState.on('players', _drawPlayers)
    appState.on('activePlayer', _drawActive)
    _drawPlayers()
    document.getElementById('game-box').innerHTML = Player.GetStartGameButton()
  }

  createPlayer() {
    window.event.preventDefault()
    let form = window.event.target
    // console.log(form)
    let formData = getFormData(form)
    // console.log(formData)
    playersService.createPlayer(formData)
    // @ts-ignore
    form.reset()
  }

  setActivePlayer(playerId) {
    playersService.setActivePlayer(playerId)
    // console.log(playerId)
  }

  startGame() {
    if (appState.activePlayer) {
      document.getElementById('fruit-form').innerHTML = Player.GetFruitForm()
      let timerInterval = setInterval(this.timer, 1000)
      setTimeout(() => {
        clearInterval(timerInterval);
        this.endGame()
      }, 31000)
      document.getElementById('game-box').innerHTML = Player.GetWord()
    } else {
      Pop.toast('Please select a player or create a new one!')
    }
  }

  timer() {
    gameSeconds--
    document.getElementById('timer').innerText = gameSeconds
  }

  endGame() {
    window.alert('Game Over!')
    gameSeconds = 30
    document.getElementById('timer').innerText = gameSeconds
    document.getElementById('game-box').innerHTML = Player.GetStartGameButton()
    if (appState.activePlayer.score > appState.activePlayer.highScore) {
      appState.activePlayer.highScore = appState.activePlayer.score
    }
    appState.activePlayer.score = 0
    let index = appState.players.findIndex(p => p.id == appState.activePlayer.id)
    // console.log("finding index", index)
    appState.players.splice(index, 1, appState.activePlayer)
    saveState('players', appState.players)
    _drawPlayers()
  }

  spellFruit() {
    window.event.preventDefault()
    const form = window.event.target
    const formValue = getFormData(form)
    // console.log(formValue)
    if (formValue.fruit == appState.activeFruit) {
      console.log('you good at spelling')
      document.getElementById('game-box').innerHTML = Player.GetWord()
      form.reset()
      appState.activePlayer.score++
      _drawActive()
    } else {
      console.log('you bad at spelling')
      form.reset()
    }
  }
}