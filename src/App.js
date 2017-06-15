import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import DevTools from 'mobx-react-devtools'
import ItemContainer from './compoent/ItemContainer'

import gameStore from './store/gameState'
// const gameStore = new Game()
import {observer} from 'mobx-react'

@observer
class App extends React.Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <ItemContainer gameStore={gameStore} />
        <DevTools />
        {gameStore.isSuccess && (<h1> win!!</h1>)}
        {gameStore.isSuccess && (<button onClick={gameStore.initLevel.bind(gameStore, gameStore.list.length + 1)}>下一关</button>)}
        <p style={
          {
            position: 'absolute',
            bottom: 0
          }
        }>点击选择，胜利条件：全部变成同一个字母~</p>
      </div>
    )
  }
}

const styles = StyleSheet.create({
})


export default App
