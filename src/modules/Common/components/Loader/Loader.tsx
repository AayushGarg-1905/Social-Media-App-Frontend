import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    isVisible:boolean
}
const Loader = ({isVisible}:Props) => {
  return (
    <Modal transparent visible={isVisible}>
        <View style={styles.mainView}>
            <View style={styles.loaderView}>
                <ActivityIndicator/>
            </View>
        </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    loaderView:{
        width:80,
        height:80,
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    }
})