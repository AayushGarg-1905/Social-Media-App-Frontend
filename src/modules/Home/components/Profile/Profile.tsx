import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { useAppSelector } from '../../../../redux/hooks';
import { bottom_tab_user_icon } from '../../../../utils/images/GeneralImages';
import { UserModel, UserService } from '../../../../internal_exports';
import { useIsFocused } from '@react-navigation/native';

const userService = new UserService.default();

const Profile = () => {
  const authData = useAppSelector((state) => state.auth);

  const [userData,setUserData] = useState<UserModel.UserData | null>(null);
  // const [loading,setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      fetchProfileData();
    }
  },[isFocused])

  const fetchProfileData = async()=>{
    // setLoading(true);
    const res = await userService.getUserData(authData.data?.accessToken || null, authData.data?.userId || '');
    // setLoading(false);
    if(res && res.data){
      setUserData(res.data.data);
    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image source={bottom_tab_user_icon} style={styles.profilePicture}/>
      </View>
      <Text style={styles.userName}>{authData.data ? authData.data.userName : ''}</Text>
      <Text style={styles.email}>{authData.data ? authData.data.email : ''}</Text>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

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
          <Text style={styles.statValue}>{0}</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
      </View>
    </View>
  )
}

export default Profile
