import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Item from './Item'
import {observer} from 'mobx-react'

@observer
class ItemRaw extends React.Component {
  render () {
    let rowStore = this.props.rowStore
    return (
      <div className={css(styles.contaners)}>
        {rowStore.map(itemDate => 
          <Item itemDate={itemDate} sizeLimit={rowStore.length} key={itemDate.id}/>
        )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  contaners: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default ItemRaw