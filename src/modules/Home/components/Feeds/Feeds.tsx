import { Dimensions, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { PostModel, PostService, UserModel, UserService } from '../../../../internal_exports'
import { useAppSelector } from '../../../../redux/hooks';
import { PostData } from '../../../../models/post.model';
import FeedItem from '../FeedItem/FeedItem';
import { useIsFocused } from '@react-navigation/native';
import PostOptions from '../PostOptions/PostOptions';
import Toast from 'react-native-toast-message';
import Loader from '../../../Common/components/Loader/Loader';
import UpdatePost from '../UpdatePost/UpdatePost';
import MoreOptions from '../../../Common/components/MoreOptions/MoreOptions';

const postService = new PostService.default();
const userService = new UserService.default();
const window = Dimensions.get('window')

type Props = {
  fetchPosts:()=>Promise<PostModel.PostData[] | undefined>;
}

const Feeds = ({fetchPosts}:Props) => {

  const isFocused = useIsFocused();
  const authData = useAppSelector((state) => state.auth);
  const [feeds, setFeeds] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostModel.PostData | null>(null);
  const [openEditPostModal, setOpenEditPostModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserModel.UserData | null>(null);

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
      fetchAllPosts();
    }
  }, [isFocused])

  // const fetchAllPosts = async () => {
  //   if (authData.data && authData.data.accessToken) {
  //     const res = await postService.getAllPosts(authData.data.accessToken);
  //     if (res && res.data.data) {
  //       setFeeds(res.data.data.postsData)
  //       return res.data.data.postsData
  //     }
      
  //   }
  // }

  const fetchAllPosts = async()=>{
    const res = await fetchPosts();
    if(res){
      setFeeds(res);
    }
  }

  const fetchUserData = async ()=>{
    if(authData.data && authData.data.accessToken){
      const res = await userService.getUserData(authData.data.accessToken, authData.data.userId);
      if(res && res.data){
        setUserData(res.data.data);
      }
    }
  }

  const handleDeletePost = async () => {
    setOpenOptions(false);
    setLoading(true);
    if (selectedPost === null) {
      setLoading(false);
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

  const handleLikePost = async (postData: PostModel.PostData) => {
    const res = await postService.likePost(authData.data ? authData.data.accessToken : null, postData.postId);
    if (res) {
      fetchAllPosts();
    }
  }

  const handleUnlikePost = async (postData: PostModel.PostData) => {
    const res = await postService.unlikePost(authData.data ? authData.data.accessToken : null, postData.postId);
    if (res) {
      fetchAllPosts();
    }
  }

  const handleFollowUser = async(postData: PostModel.PostData)=>{
    const res = await userService.followUser(authData.data ? authData.data.accessToken : null, postData.userId);
    if (res) {
      fetchUserData();
      fetchAllPosts();
    }
  }

  const handleUnfollowUser = async(postData: PostModel.PostData)=>{
    const res = await userService.unfollowUser(authData.data ? authData.data.accessToken : null, postData.userId);
    if (res) {
      fetchUserData();
      fetchAllPosts();
    }
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
            userData = {userData}
            onClickOptions={() => {
              setSelectedPost(item);
              setOpenOptions(true);
            }}
            handleLikePost={() => {
              handleLikePost(item);
            }}
            handleUnlikePost={() => {
              handleUnlikePost(item);
            }}
            handleFollowUser={()=>{
              handleFollowUser(item);
            }}
            handleUnfollowUser={()=>{
              handleUnfollowUser(item);
            }}
          />
        }}
        contentContainerStyle={{ paddingBottom: window.height / 10 }}
      />
      {/* <PostOptions
        visible={openOptions}
        onClickEditPost={() => {
          setOpenOptions(false);
          setOpenEditPostModal(true);
        }}
        onClickDeletePost={handleDeletePost}
        onClose={() => {
          setOpenOptions(false);
        }}
      /> */}

      <MoreOptions
        type="Post"
        visible={openOptions}
        onClickEditBtn={() => {
          setOpenOptions(false);
          setOpenEditPostModal(true);
        }}
        onClickDeleteBtn={handleDeletePost}
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
      <Loader isVisible={loading} />
    </View>
  )
}

export default Feeds
