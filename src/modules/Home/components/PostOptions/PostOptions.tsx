import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { delete_icon, edit_icon } from '../../../../utils/images/GeneralImages'

type Props = {
    visible:boolean;
    onClickEditPost:()=>void;
    onClickDeletePost:()=>void;
    onClose:()=>void
}

const PostOptions = ({visible,onClickEditPost, onClickDeletePost, onClose}:Props) => {
  return (
    <Modal onRequestClose={()=>onClose() } transparent visible={visible}>
        <View style={styles.container}>
            <View style={styles.bottomSheetContainer}>
                <Text style={styles.postOptionsTitle}>Post Options</Text>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>onClickEditPost()}>
                    <Image source={edit_icon} style={styles.optionImage}/>
                    <Text style={styles.optionText}>Edit Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>onClickDeletePost()}>
                    <Image source={delete_icon} style={[styles.optionImage,{tintColor:'red'}]}/>
                    <Text style={styles.optionText}>Delete Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default PostOptions