import {observable, computed, autorunAsync, action, useStrict} from 'mobx'


useStrict(true)
const UP = 1
const DOWN = 2
const LEFT = -1
const RIGHT = -2
class Game {
  @observable list = []
  @observable isSuccess = false
  constructor () {
    this.initLevel()
  }
  @action initLevel (num = 2) {
    this.list.clear()
    this.isSuccess = false
    for (let column = 0; column < num; column++) {
      this.list.push([])
      for (let row = 0; row < num; row++) {
        let random = Math.random()
        let obj = {
          id: column * num + row,
          direction: random > 0.75 ? 1 : random > 0.5 ? 2 : random > 0.25 ? -1 : -2,
          isChoosed: false
        }
        this.list[column].push(obj)
      }
    }
  }
  checkSuccess () {
    let direction = this.list[0][0].direction
    let isSuccess = true
    this.list.forEach(col => col.forEach(ele => {
      if (direction !== ele.direction)
        isSuccess = false
    }))
    return isSuccess
  }
  @action chageClick (item) {
    let id = item.id
    let list = this.list
    let length = list.length
    this.initChoose()
    list.forEach(col => col.forEach(ele => {
      if (Math.abs(ele.id - id) < length && divide(ele.id, length) === divide(id, length))
        ele.isChoosed = true
      else if (isDivided(Math.abs(ele.id - id), length))
        ele.isChoosed = true
    }))
  }

  @action initChoose () {
    this.list.forEach(col => col.forEach(ele => {
      ele.isChoosed = false
    }))
  }
  @action changeDirection (direction) {
    let list = this.list
    list.forEach(col => col.forEach(ele => {
      if (ele.isChoosed)
        if (direction === 'x') {
          switch (ele.direction) {
            case 1:
              ele.direction = 2
              break
            case 2:
              ele.direction = 1
              break
            case -1:
              ele.direction = -2
              break
            case -2:
              ele.direction = -1
              break
          }
        } else if (direction === 'y') {
          switch (ele.direction) {
            case 1:
              ele.direction = -1
              break
            case 2:
              ele.direction = -2
              break
            case -1:
              ele.direction = 1
              break
            case -2:
              ele.direction = 2
              break
          }
        }
    }))
    this.checkSuccess() && (this.isSuccess = true)
  }
}

function divide (dividend, divisor) {
  return ~~ (dividend / divisor)
}
function isDivided (dividend, divisor) {
  return (~~ (dividend / divisor)) === (dividend / divisor)
}

export default new Game
