import { Dimensions, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { PostModel, PostService } from '../../../../internal_exports'
import { useAppSelector } from '../../../../redux/hooks';
import { PostData } from '../../../../models/post.model';
import FeedItem from '../FeedItem/FeedItem';
import { useIsFocused } from '@react-navigation/native';
import PostOptions from '../PostOptions/PostOptions';
import Toast from 'react-native-toast-message';
import Loader from '../../../Common/components/Loader/Loader';
import UpdatePost from '../UpdatePost/UpdatePost';

const postService = new PostService.default();
const window = Dimensions.get('window')

const Feeds = () => {

  const isFocused = useIsFocused();
  const authData = useAppSelector((state) => state.auth);
  const [feeds, setFeeds] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostModel.PostData | null>(null);
  const [openEditPostModal, setOpenEditPostModal] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      fetchAllPosts()
    }
  }, [isFocused])

  const fetchAllPosts = async () => {
    if (authData.data && authData.data.accessToken) {
      const res = await postService.getAllPosts(authData.data.accessToken);
      if (res && res.data.data) {
        setFeeds(res.data.data.postsData)
      }
    }
  }

  const handleDeletePost = async () => {
    setOpenOptions(false);
    setLoading(true);
    if (selectedPost === null) {
      Toast.show({
        type: 'error',
        text1: 'Some error occured, Please try again later'
      })
      return;
    }
    const resp = await postService.deletePost(authData.data ? authData.data.accessToken : null, selectedPost.postId);
    setLoading(false);
    if (resp) {
      Toast.show({
        type: 'success',
        text1: resp.data.msg
      })
      fetchAllPosts();
    }
  }

  const handleEditPost = async (caption: string) => {
    if (selectedPost === null) {
      Toast.show({
        type: 'error',
        text1: 'Some error occured, Please try again later'
      })
      return;
    }
    
    setOpenEditPostModal(false);
    const res = await postService.editPost(authData.data ? authData.data.accessToken : null, selectedPost.postId, caption);
    if (res) {
      Toast.show({
        type: 'success',
        text1: res.data.msg
      })
    }
    fetchAllPosts();
  }


  // if(loading){
  //   return (
  //     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
  //       <ActivityIndicator size='large'/>
  //     </View>
  //   )
  // }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={feeds}
        renderItem={({ item, index }) => {
          return <FeedItem data={item}
            onClickOptions={() => {
              setSelectedPost(item);
              setOpenOptions(true);
            }}
          />
        }}
        contentContainerStyle={{ paddingBottom: window.height / 10 }}
      />
      <PostOptions
        visible={openOptions}
        onClickEditPost={() => {
          setOpenOptions(false);
          setOpenEditPostModal(true);
        }}
        onClickDeletePost={handleDeletePost}
        onClose={() => {
          setOpenOptions(false);
        }}
      />
      <UpdatePost
        data={selectedPost}
        visible={openEditPostModal}
        handleEditPost={(caption: string) => handleEditPost(caption)}
        onClose={() => {
          setOpenEditPostModal(false)
        }}
      />
      <Loader isVisible={loading}/>
    </View>
  )
}

export default Feeds
