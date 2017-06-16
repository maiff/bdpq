import {observable, computed, autorunAsync, action, useStrict} from 'mobx'
import {_p, _q, _b, _d} from '../compoent/common/direction'

useStrict(true)

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
          direction: _d,
          isChoosed: false
        }
        this.list[column].push(obj)
      }
    }
    this.shuffle(10)
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
  @action changeDirection (direction, onlyToShuffle) {
    let list = this.list
    list.forEach(col => col.forEach(ele => {
      if (ele.isChoosed)
        if (direction === 'x') {
          switch (ele.direction) {
            case _p:
              ele.direction = _q
              break
            case _q:
              ele.direction = _p
              break
            case _b:
              ele.direction = _d
              break
            case _d:
              ele.direction = _b
              break
          }
        } else if (direction === 'y') {
          switch (ele.direction) {
            case _p:
              ele.direction = _b
              break
            case _q:
              ele.direction = _d
              break
            case _b:
              ele.direction = _p
              break
            case _d:
              ele.direction = _q
              break
          }
        }
    }))
    onlyToShuffle || this.checkSuccess() && (this.isSuccess = true)
    this.initChoose()
  }
  @action shuffle (max) {
    let list = this.list
    let length = list.length
    let i = max
    while (i--) {
      console.log(list[getRandom(length)][getRandom(length)])
      this.chageClick(list[getRandom(length)][getRandom(length)])
      this.changeDirection(Math.random() < 0.5 ? 'x' : 'y', 1)
    }
  }
}

function divide (dividend, divisor) {
  return ~~ (dividend / divisor)
}
function isDivided (dividend, divisor) {
  return (~~ (dividend / divisor)) === (dividend / divisor)
}
function getRandom (limit) {
  return ~~ (Math.random() * limit)
}

export default new Game
