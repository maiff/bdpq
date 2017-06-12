import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import ItemRow from './ItemRow'
import {observer} from 'mobx-react'

@observer
class ItemContainer extends React.Component {
  render () {
    let gameStore = this.props.gameStore
    return (
      <div className={css(styles.container)}>
        {gameStore.list.map((row) => 
          <ItemRow rowStore={row} key={row[0].id} />
        )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
})

export default ItemContainer