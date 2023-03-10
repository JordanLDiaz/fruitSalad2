import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class Player {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.score = 0
    this.highScore = data.highScore || 0
  }

  get PlayerTemplate() {
    return `
  <h5 onclick="app.playersController.setActivePlayer('${this.id}')" class="selectable">${this.name} <span>High Score: ${this.highScore}</span></h5>
  `
  }

  get ActivePlayerTemplate() {
    return `
    <h1>${this.name} <span>${this.score}</span></h1>
    `
  }

  static GetStartGameButton() {
    return `
    <button onclick="app.playersController.startGame()" class="btn btn-primary w-50 m-auto bg-peach" type="button">BEGIN</button>
    `
  }

  static GetFruitForm() {
    return `
    <form onsubmit="app.playersController.spellFruit()" class="mt-3">
    <input type="text" name="fruit" id="fruit" placeholder="Spell the word here..." required>
  </form>
    `
  }

  static GetWord() {
    let randomFruit = Math.floor(Math.random() * appState.fruits.length)
    appState.activeFruit = appState.fruits[randomFruit]
    return `
    <h5>${appState.fruits[randomFruit]}</h5>
    `
  }
}