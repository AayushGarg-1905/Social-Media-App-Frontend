import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { PostModel, UserModel } from '../../../../internal_exports'
import { comment_icon, heart_icon, like_icon, liked_icon, more_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'
import { useAppSelector } from '../../../../redux/hooks'
import { GRADIENT_START } from '../../../../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { COMMENT_SCREEN, OTHER_USER_PROFILE_SCREEN } from '../../../../utils/constants/RouteName'
import { formattedDate } from '../../../../utils/utils'

type Props = {
  data: PostModel.PostData;
  userData:UserModel.UserData | null; 
  onClickOptions: () => void;
  handleLikePost: () => void;
  handleUnlikePost: () => void;
  handleFollowUser:()=>void;
  handleUnfollowUser:()=>void;
}

const FeedItem = ({ data,userData, onClickOptions, handleLikePost, handleUnlikePost, handleFollowUser, handleUnfollowUser }: Props) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const authData = useAppSelector((state) => state.auth);

  const isPostAlreadyLiked = () => {
    let isLiked = false;
    data.likes.map((id) => {
      if (id === authData.data?.userId) {
        isLiked = true;
      }
    })
    return isLiked;
  }

  const isAlreadyFollowing = ()=>{
    if(!userData){
      return;
    }
    let isFollowed = false;
    userData.following.map((id) => {
      if (id === data.userId) {
        isFollowed = true;
      }
    })
    return isFollowed;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(OTHER_USER_PROFILE_SCREEN,{userId:data.userId})
            }}>
              {data.userProfilePicture ?
              <Image source={{uri:data.userProfilePicture}} style={[{width:40,
                height:40,
                borderRadius:25,
                marginLeft:10,resizeMode:'cover'}]} />
              : 
              <Image source={post_profile_icon} style={styles.profileImage} />
              }
            </TouchableOpacity>
            
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.userNameText}>{data.userName}</Text>
              <Text style={styles.timestampText}>{formattedDate(data.createdAt)}</Text>
            </View>
          </View>
          {authData && authData.data && authData.data.userId === data.userId ?
            <TouchableOpacity onPress={() => onClickOptions()}>
              <Image source={more_icon} style={styles.icon} />
            </TouchableOpacity>
            :
            isAlreadyFollowing() ?
            <TouchableOpacity onPress={() => {handleUnfollowUser()}} style={styles.btn}>
              <Text style={styles.btnText}>Unfollow</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => {handleFollowUser()}} style={styles.btn}>
              <Text style={styles.btnText}>Follow</Text>
            </TouchableOpacity>
            }

        </View>
        {data.caption ? <Text style={styles.captionText}>{data.caption}</Text> : null}
        <View>
          {data.imageUrl && <Image source={{ uri: data.imageUrl }} style={styles.postImage} />}
        </View>

        <View style={styles.footer}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isPostAlreadyLiked() ?
              <TouchableOpacity onPress={() => {
                handleUnlikePost();
              }}>
                <Image source={liked_icon} style={[styles.icon, { tintColor: GRADIENT_START }]} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => {
                handleLikePost();
              }}>
                <Image source={like_icon} style={[styles.icon]} />
              </TouchableOpacity>
            }
            <Text style={styles.statsValue}>{data.likes.length} {data.likes.length == 1 ? 'like' : 'likes'}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate(COMMENT_SCREEN, { postId: data.postId })
            }}>
              <Image source={comment_icon} style={[styles.icon, { height: 35, width: 35 }]} />
            </TouchableOpacity>
            <Text style={styles.statsValue}>{data.comments.length} {data.comments.length == 1 ? 'comment' : 'comments'}</Text>
          </View>

        </View>
      </View>
    </>
  )
}

export default FeedItem
