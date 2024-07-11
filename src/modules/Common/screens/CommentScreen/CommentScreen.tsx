import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors';
import { CommentModel, CommentService } from '../../../../internal_exports';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../../../../redux/hooks';
import SingleComment from '../../components/SingleComment/SingleComment';
import MoreOptions from '../../components/MoreOptions/MoreOptions';
import Loader from '../../components/Loader/Loader';
import UpdateComment from '../../components/UpdateComment/UpdateComment';


const commentService = new CommentService.default();

type CommentProps = NativeStackScreenProps<RootStackParams, 'CommentScreen'>
const CommentScreen = ({ route }: CommentProps) => {

    const authData = useAppSelector((state) => state.auth);
    const [comment, setComment] = useState<string>('');
    const [postComments, setPostComments] = useState<CommentModel.CommentData[]>([]);
    const [openOptions, setOpenOptions] = useState(false);
    const [selectedComment, setSelectedComment] = useState<CommentModel.CommentData | null>(null);
    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllComments();
    }, [])

    const handlePostCommentBtnDisability = () => {
        if (comment.length === 0) {
            return true;
        }
        return false;
    }

    const handleCreateComment = async () => {
        setLoading(true);
        const res = await commentService.createComment(authData.data?.accessToken || null, route.params.postId, comment);
        setLoading(false);
        if (res) {
            setComment('');
            Toast.show({
                type: 'success',
                text1: res.data.msg,
                position: 'bottom'
            })
            Keyboard.dismiss();
            fetchAllComments();
        }
    }

    const fetchAllComments = async () => {
        const res = await commentService.getAllComments(authData.data?.accessToken || null, route.params.postId);
        if (res && res.data) {
            setPostComments(res.data.data);
        }
    }

    const handleEditComment = async(comment:string)=>{
        setLoading(true);
        if (selectedComment === null) {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Some error occured, Please try again later'
            })
            return;
          }
      
          setOpenEditCommentModal(false);
          const res = await commentService.editComment(authData.data ? authData.data.accessToken : null, comment, selectedComment.commentId);
          setLoading(false);
          if (res) {
            Toast.show({
              type: 'success',
              text1: res.data.msg
            })
          }
          fetchAllComments();
    }

    const handleDeleteComment = async () => {
        setOpenOptions(false);
        setLoading(true);
        if (selectedComment === null) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Some error occured, Please try again later'
            })
            return;
        }
        const resp = await commentService.deleteComment(authData.data ? authData.data.accessToken : null, selectedComment.commentId);
        setLoading(false);
        if (resp) {
            Toast.show({
                type: 'success',
                text1: resp.data.msg
            })
            fetchAllComments();
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={postComments}
                renderItem={({ item, index }) => {
                    return (
                        <SingleComment data={item}
                            onClickOptions={() => {
                                setSelectedComment(item);
                                setOpenOptions(true)
                            }} />
                    )
                }}
            />

            <MoreOptions
                type="Comment"
                visible={openOptions}
                onClickEditBtn={() => {
                    setOpenOptions(false);
                    setOpenEditCommentModal(true);
                }}
                onClickDeleteBtn={handleDeleteComment}
                onClose={() => {
                    setOpenOptions(false);
                }}
            />

            <UpdateComment
                data={selectedComment}
                visible={openEditCommentModal}
                handleEditComment={(comment)=>handleEditComment(comment)}
                onClose={() => {
                    setOpenEditCommentModal(false)
                  }}
            />

            <View style={styles.bottomViewContainer}>
                <TextInput
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    placeholder='Type comment here...'
                    placeholderTextColor='grey'
                    style={styles.commentInput}
                    multiline={true}
                />
                <TouchableOpacity style={[styles.postCommentBtn, { backgroundColor: handlePostCommentBtnDisability() ? DISABLE_BTN_COLOR : GRADIENT_START }]}
                    disabled={handlePostCommentBtnDisability()}
                    onPress={handleCreateComment}
                >
                    <Text style={styles.postCommentBtnText}>Comment</Text>
                </TouchableOpacity>
            </View>
            <Loader isVisible={loading} />
        </View>
    )
}

export default CommentScreen
