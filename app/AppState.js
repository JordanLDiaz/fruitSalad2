import { Player } from "./Models/Player.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./Models/Player').Player[]} */
  players = loadState('players', [Player])

  /** @type {import('./Models/Player').Player|null} */
  activePlayer = null

  fruits = ['banana', 'apple', 'kiwi', 'orange', 'pineapple', 'grape', 'mango', 'nectarine', 'pomegranite', 'plum', 'guava', 'coconut', 'mandarin', 'satsuma', 'lemon', 'lime', 'rambutan', 'dragon fruit', 'papaya', 'plantain', 'persimmon', 'star fruit', 'duran', 'canteloupe', 'grapefruit', 'honeydew', 'watermelon', 'cherry', 'raspberry', 'blackberry', 'blueberry', 'huckleberry', 'boysenberry', 'peach', 'strawberry', 'fig']

  activeFruit = null

  gameSeconds = 30
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
