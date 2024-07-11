import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { close_icon } from '../../../../utils/images/GeneralImages';
import { PostModel } from '../../../../internal_exports';
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors';

type Props = {
    data: PostModel.PostData | null;
    visible: boolean;
    handleEditPost:(caption:string)=>void;
    onClose: () => void
}

const UpdatePost = ({ data, visible, onClose, handleEditPost }: Props) => {

    const [caption, setCaption] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(()=>{
        setCaption((data && data.caption) ? data.caption : '')
        setImageUrl((data && data.imageUrl) ? data.imageUrl : '')
    },[visible])

    const handleUpdatePostBtnDisability = ()=>{
        if(data && data.caption === caption){
            return true;
        }
        return false;
    }

    return (
        <Modal onRequestClose={() => onClose()} transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => onClose()}>
                            <Image source={close_icon} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                        <Text style={styles.editPostTitle}>Edit Post</Text>
                    </View>
                    <View style={styles.captionContainer}>
                        <TextInput
                            value={caption}
                            onChangeText={(text) => setCaption(text)}
                            placeholder='Type caption here...'
                            multiline={true}
                            placeholderTextColor='grey'
                            style={styles.captionInput} />
                    </View>
                    {imageUrl && <View style={styles.selectedImageView}>
                        <Image source={{ uri: imageUrl }} style={styles.selectedImage} />
                    </View>
                    }

                    <TouchableOpacity style={[styles.postBtn, { backgroundColor: handleUpdatePostBtnDisability() ? DISABLE_BTN_COLOR : GRADIENT_START }]}
                        onPress={()=>handleEditPost(caption)}
                    >
                        <Text style={styles.btnText}>Update Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default UpdatePost