import React from 'react'
import {observer} from 'mobx-react'
import { StyleSheet, css } from 'aphrodite'
import p from '../asset/img/P.png'
import pw from '../asset/img/pw.png'
import gameStore from '../store/gameState'

import AlloyFinger from './common/AlloyFinger'
@observer
class Item extends React.Component {
  x = 0
  y = 0
  onPressMove (evt) {
    this.x += evt.deltaX
    this.y += evt.deltaY
    console.log('X', this.x, 'Y:', this.y)
  }
  init () {
    if (Math.abs(this.x) > 15 && Math.abs(this.y) < 15) {
      gameStore.changeDirection('x')
    } else if (Math.abs(this.y) > 15 && Math.abs(this.x) < 15) {
      gameStore.changeDirection('y')
    }
    gameStore.initChoose()
    this.x = 0
    this.y = 0
  }
  render () {
    let level = this.props.sizeLimit
    let itemData = this.props.itemDate
    return (
      <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)}>
        <div className={css(areaFactory(level), styles.rightMargin)} onClick={gameStore.chageClick.bind(gameStore, itemData)} >
          <img src={gameStore.isSuccess? pw : p} className={css(styles.item, transformFactory(itemData.direction))}
            style={{
              filter: itemData.isChoosed ? 'grayscale(100%)' : ''
          }} />
        </div>
      </AlloyFinger>
    )
  }
}

function transformFactory (direction) {
    let temp = ''
    switch (direction) {
      case 1:
        temp = 'scale(1, 1)'
        break
      case 2:
        temp = 'scale(-1, 1)'
        break
      case -1:
        temp = 'scale(1, -1)'
        break
      case -2:
        temp = 'scale(-1, -1)'
    }
    let transform = {
        transform: temp
    }
    return StyleSheet.create({
      transform
    }).transform
}
function areaFactory (length) {
  return StyleSheet.create({
    area: {
      width: `${80 / length}%`,
      height:`${80 / length}%`
    }
  }).area
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: '100%',
    transition: '.1s all'
  },
  rightMargin: {
    marginRight: '3px'
  }
})



export default Item