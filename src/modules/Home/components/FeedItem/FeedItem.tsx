import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { PostModel, PostService } from '../../../../internal_exports'
import { bottom_tab_user_icon, comment_icon, like_icon, more_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'
import PostOptions from '../PostOptions/PostOptions'
import { useAppSelector } from '../../../../redux/hooks'
import Loader from '../../../Common/components/Loader/Loader'
import Toast from 'react-native-toast-message'
import UpdatePost from '../UpdatePost/UpdatePost'

type Props = {
  data: PostModel.PostData;
  isFeedUpdated:boolean;
  setIsFeedUpdated:React.Dispatch<React.SetStateAction<boolean>>;
}

const postService = new PostService.default();

const FeedItem = ({ data, isFeedUpdated, setIsFeedUpdated }: Props) => {

  const authData = useAppSelector((state)=>state.auth);

  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openEditPostModal, setOpenEditPostModal] = useState<boolean>(false);
  
  const handleEditPostModal = ()=>{
    setOpenOptions(false);
    setOpenEditPostModal(true);
  }

  const handleDeletePost = async()=>{
    setOpenOptions(false);
    const resp = await postService.deletePost(authData.data?authData.data.accessToken:null, data.postId);
    if(resp){
      Toast.show({
        type:'success',
        text1:resp.data.msg
      })
    }
    setIsFeedUpdated(true);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={post_profile_icon} style={styles.profileImage} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.userNameText}>{data.userName}</Text>
              <Text style={styles.timestampText}>{new Date(data.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setOpenOptions(true)}>
            <Image source={more_icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {data.caption ? <Text style={styles.captionText}>{data.caption}</Text> : null}
        <View>
          {data.imageUrl && <Image source={{ uri: data.imageUrl }} style={styles.postImage} />}
        </View>
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Image source={like_icon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.statsValue}>{data.likes.length} likes</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Image source={comment_icon} style={[styles.icon, { height: 35, width: 35 }]} />
            </TouchableOpacity>
            <Text style={styles.statsValue}>{data.comments.length} comments</Text>
          </View>
        </View>
      </View>
      
      <PostOptions
        visible={openOptions}
        onClickEditPost={handleEditPostModal}
        onClickDeletePost={handleDeletePost}
        onClose={() => {
          setOpenOptions(false)
        }}
      />

      <UpdatePost
        data={data}
        visible={openEditPostModal}
        setIsFeedUpdated={setIsFeedUpdated}
        onClose={() => {
          setOpenEditPostModal(false)
        }}
      />
    </>
  )
}

export default FeedItem
