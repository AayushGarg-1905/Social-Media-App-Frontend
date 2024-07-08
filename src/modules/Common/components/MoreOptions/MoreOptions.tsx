import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { delete_icon, edit_icon } from '../../../../utils/images/GeneralImages'

type Props = {
    type:string
    visible:boolean;
    onClickEditBtn:()=>void;
    onClickDeleteBtn:()=>void;
    onClose:()=>void
}

const MoreOptions = ({type, visible,onClickEditBtn, onClickDeleteBtn, onClose}:Props) => {
  return (
    <Modal onRequestClose={()=>onClose() } transparent visible={visible}>
        <View style={styles.container}>
            <View style={styles.bottomSheetContainer}>
                <Text style={styles.postOptionsTitle}>{type} Options</Text>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>onClickEditBtn()}>
                    <Image source={edit_icon} style={styles.optionImage}/>
                    <Text style={styles.optionText}>Edit {type}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>onClickDeleteBtn()}>
                    <Image source={delete_icon} style={[styles.optionImage,{tintColor:'red'}]}/>
                    <Text style={styles.optionText}>Delete {type}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default MoreOptions