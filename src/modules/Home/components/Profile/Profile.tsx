import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { useAppSelector } from '../../../../redux/hooks';
import { bottom_tab_user_icon } from '../../../../utils/images/GeneralImages';
import { PostService, UserModel, UserService } from '../../../../internal_exports';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Feeds from '../Feeds/Feeds';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { EDIT_PROFILE_SCREEN } from '../../../../utils/constants/RouteName';

const userService = new UserService.default();
const postService = new PostService.default();

type ProfileProps = {
  userId:string
}

const Profile = ({userId}:ProfileProps) => {
  const authData = useAppSelector((state) => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [userData,setUserData] = useState<UserModel.UserData | null>(null);

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      fetchProfileData();
    }
  },[isFocused])

  const fetchProfileData = async()=>{
    const res = await userService.getUserData(authData.data?.accessToken || null, userId || '');
    if(res && res.data){
      setUserData(res.data.data);
    } 
  }

  const fetchAllUserPosts = async()=>{
    if (authData.data && authData.data.accessToken) {
      const res = await postService.getAllUserPosts(authData.data.accessToken,userId);
      if (res && res.data.data) {
        fetchProfileData();
        return res.data.data.postsData
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverImageView}>
        {userData && userData.coverPicture ?
        <Image source={{uri:userData.coverPicture}} style={{height:'100%', width:'100%',resizeMode:'cover'}}/>
        : 
        null}       
      </View>
      <View style={styles.profilePictureContainer}>
        {userData && userData.profilePicture ?
        <Image source={{uri:userData.profilePicture}} style={{height:100, width:100, borderRadius:50,resizeMode:'cover'}}/>
        : 
        <Image source={bottom_tab_user_icon} style={styles.profilePicture}/>
        }
      </View>
      <Text style={styles.userName}>{userData?.userName || ''}</Text>
      <View style={styles.contactDetailsContainer}>
        {/* add icon for email and password */}
        <Text style={styles.email}>{userData?.email || ''}</Text>
        <Text style={styles.email}> | {userData?.phoneNumber || ''}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.singleStatContainer}>
          <Text style={styles.statValue}>{userData ? userData.followers.length : 0}</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
        <View style={styles.singleStatContainer}>
          <Text style={styles.statValue}>{userData ? userData.following.length : 0}</Text>
          <Text style={styles.statTitle}>Following</Text>
        </View>
        <View style={styles.singleStatContainer}> 
          <Text style={styles.statValue}>{userData?.totalPosts || 0}</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
      </View>

      {authData.data && authData.data.userId === userId ?
      <TouchableOpacity style={styles.editBtn} onPress={()=>{navigation.navigate(EDIT_PROFILE_SCREEN,{userData:userData})}}>
      <Text style={styles.editBtnText}>Edit Profile</Text>
    </TouchableOpacity>
      : 
      null}
      <Feeds fetchPosts={fetchAllUserPosts}/>
    </ScrollView>
  )
}

export default Profile
