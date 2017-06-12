import {observable, computed, autorunAsync, action, useStrict} from 'mobx'


useStrict(true)
const UP = 1
const DOWN = 2
const LEFT = -1
const RIGHT = -2
class Game {
  @observable list = []
  constructor () {
    this.initLevel(4)
  }
  @action initLevel (num = 2) {
    this.list.clear()
    for (let column = 0; column < num; column++) {
      this.list.push([])
      for (let row = 0; row < num; row++) {
        let random = Math.random()
        let obj = {
          id: column * num + row,
          direction: random > 0.75 ? 1 : random > 0.5 ? 2 : random > 0.25 ? -1 : -2,
          isClicked: false
        }
        this.list[column].push(obj)
      }
    }
  }

  @action chageClick (item) {
    item.isClicked = true
  }
}

export default new Game
