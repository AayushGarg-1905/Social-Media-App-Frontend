import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { close_icon } from '../../../../utils/images/GeneralImages'
import { CommentModel } from '../../../../internal_exports'
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors'

type Props = {
    data: CommentModel.CommentData | null
    visible: boolean;
    handleEditComment: (comment: string) => void;
    onClose: () => void
}

const UpdateComment = ({data, visible, handleEditComment,onClose}:Props) => {

    const [comment,setComment] = useState('');

    useEffect(()=>{
        setComment(data?.text || '');
    },[visible])

    const handleUpdateCommentBtnDisability = ()=>{
        if((data && data.text === comment) || (comment.length==0)){
            return true;
        }
        return false;
    }

    return (
        <Modal onRequestClose={()=>onClose()} transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <Text style={styles.editCommentTitle}>Edit Comment</Text>
                    <View style={styles.commentContainer}>
                        <TextInput
                            value={comment}
                            onChangeText={(text) => {setComment(text) }}
                            placeholder='Type comment here...'
                            placeholderTextColor='grey'
                            multiline={true}
                            style={styles.commentInput} />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={()=>onClose()}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={handleUpdateCommentBtnDisability()}style={[styles.btn,{backgroundColor:handleUpdateCommentBtnDisability() ?DISABLE_BTN_COLOR:GRADIENT_START}]}
                        onPress={()=>handleEditComment(comment)}
                        >
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default UpdateComment
