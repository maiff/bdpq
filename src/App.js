import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import DevTools from 'mobx-react-devtools'
import ItemContainer from './compoent/ItemContainer'

import gameStore from './store/gameState'
// const gameStore = new Game()

class App extends React.Component {
  render () {
    return (
      <div>
        <ItemContainer gameStore={gameStore} />
        <DevTools />
        <button onClick={gameStore.initLevel.bind(gameStore, 2)}>test</button>
      </div>
    )
  }
}

const styles = StyleSheet.create({
})


export default App
