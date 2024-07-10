import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { bottom_tab_user_icon, mail_icon, phone_icon } from '../../../../utils/images/GeneralImages';
import { AuthService, PostService, UserModel, UserService } from '../../../../internal_exports';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Feeds from '../Feeds/Feeds';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { EDIT_PROFILE_SCREEN, LOGIN_SCREEN } from '../../../../utils/constants/RouteName';
import Toast from 'react-native-toast-message';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setAuthData } from '../../../../redux/AuthSlice';

const userService = new UserService.default();
const postService = new PostService.default();
const authService = new AuthService.default();

type ProfileProps = {
  userId:string
}

const Profile = ({userId}:ProfileProps) => {
  const authData = useAppSelector((state) => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dispatch = useAppDispatch();
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

  const handleLogout = async()=>{
    const res = await authService.logout(authData.data?.accessToken || '');
    if(res && res.data){
      Toast.show({
        type:'success',
        text1:res.data.msg
      })
      navigation.reset({
        index: 0,
        routes: [{ name: LOGIN_SCREEN }],
      });
      await EncryptedStorage.removeItem('accessToken');
      dispatch(setAuthData(null));
      
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverImageView}>
        {userData && userData.coverPicture ?
        <Image source={{uri:userData.coverPicture}} style={{height:'100%', width:'100%',resizeMode:'cover'}}/>
        : 
        null}
        {authData && authData.data && authData.data.userId === userId && 
          <TouchableOpacity style={styles.logoutBtn} onPress={()=>{
            handleLogout();
          }}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
        }
               
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
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={mail_icon} style={{height:16,width:16,marginRight:4}}/>
          <Text style={styles.email}>{userData?.email || ''}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.email}> | </Text>
          <Image source={phone_icon} style={{height:16,width:16,marginRight:4}}/>
          <Text style={styles.email}>{userData?.phoneNumber || ''}</Text>
        </View>
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
      <Feeds fetchPosts={fetchAllUserPosts} scrollEnabled={false}/>
    </ScrollView>
  )
}

export default Profile
