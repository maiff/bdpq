import React from 'react'
import {observer} from 'mobx-react'
import { StyleSheet, css } from 'aphrodite'
import p from '../asset/img/P.png'
import gameStore from '../store/gameState'

@observer
class Item extends React.Component {
  render () {
    let level = this.props.sizeLimit
    let itemData = this.props.itemDate
    
    return (
      <div className={css(areaFactory(level))} onClick={gameStore.chageClick.bind(gameStore, itemData)} >
        <img src={p} className={css(styles.item, ...combineCss({
            isClicked: itemData.isClicked,
            direction: itemData.direction
          })
        )} />
      </div>
    )
  }
}

function combineCss (obj) {
  // console.log(areaFactory(obj.length))
  return [transformFactory(obj.direction, obj.isClicked)]
}

function transformFactory (direction, isClicked) {
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
    isClicked && (transform.filter = 'grayscale(100%)')
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
    transition: '.3s all'
  }
})



export default Item