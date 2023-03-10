import { appState } from "../AppState.js";
import { Player } from "../Models/Player.js";
import { saveState } from "../Utils/Store.js";

class PlayersService {
  createPlayer(formData) {
    let newPlayer = new Player(formData)
    console.log(newPlayer)
    appState.players.push(newPlayer)
    appState.emit('players')
    appState.activePlayer = newPlayer
    console.log('active player', appState.activePlayer)
    saveState('players', appState.players)
  }
  setActivePlayer(playerId) {
    let foundPlayer = appState.players.find(p => p.id == playerId)
    appState.activePlayer = foundPlayer
    console.log('We found a player!', foundPlayer)
  }

}

export const playersService = new PlayersService();