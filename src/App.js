import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import DevTools from 'mobx-react-devtools'
import ItemContainer from './compoent/ItemContainer'

import gameStore from './store/gameState'
// const gameStore = new Game()
import {observer} from 'mobx-react'
import isPhone from './compoent/common/isPhone'

@observer
class App extends React.Component {
  render () {

    return (
      isPhone() ? <div style={{textAlign: 'center'}}>
        <ItemContainer gameStore={gameStore} />
        {process.env.NODE_ENV === 'production' || <DevTools />}
        {gameStore.isSuccess && (<h1 onClick={gameStore.initLevel.bind(gameStore, gameStore.list.length + 1)}> win!! 点我下一关~</h1>)}
        <p style={
          {
            position: 'absolute',
            bottom: 0
          }
        }>点击选择，胜利条件：全部变成同一个字母~</p>
      </div> : <p>请用手机打开</p>
    )
  }
}

const styles = StyleSheet.create({
})


export default App
