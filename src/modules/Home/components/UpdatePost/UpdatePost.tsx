import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { styles } from './styles'
import { close_icon, delete_icon, edit_icon } from '../../../../utils/images/GeneralImages';
import { PostModel, PostService } from '../../../../internal_exports';
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors';
import { useAppSelector } from '../../../../redux/hooks';
import Toast from 'react-native-toast-message';
type Props = {
    data: PostModel.PostData;
    visible: boolean;
    setIsFeedUpdated: React.Dispatch<SetStateAction<boolean>>;
    onClose: () => void
}

const postService = new PostService.default();

const UpdatePost = ({ data, visible, setIsFeedUpdated, onClose }: Props) => {

    const [caption, setCaption] = useState<string>(data.caption ? data.caption : '');
    const [imageUrl, setImageUrl] = useState<string>(data.imageUrl ? data.imageUrl : '');

    const authData = useAppSelector((state)=>state.auth);

    const handleUpdatePostBtnDisability = ()=>{
        if(data && data.caption === caption){
            return true;
        }
        return false;
    }

    const handleEditPost = async()=>{
        const res = await postService.editPost(authData.data ? authData.data.accessToken : null, data.postId, caption);
        if(res){
            setIsFeedUpdated(true);
            Toast.show({
                type:'success',
                text1:res.data.msg
            })
        }
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
                            style={styles.captionInput} />
                    </View>
                    {imageUrl && <View style={styles.selectedImageView}>
                        <Image source={{ uri: imageUrl }} style={styles.selectedImage} />
                    </View>
                    }

                    <TouchableOpacity style={[styles.postBtn, { backgroundColor: handleUpdatePostBtnDisability() ? DISABLE_BTN_COLOR : GRADIENT_START }]}
                        onPress={handleEditPost}
                    >
                        <Text style={styles.btnText}>Update Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default UpdatePost