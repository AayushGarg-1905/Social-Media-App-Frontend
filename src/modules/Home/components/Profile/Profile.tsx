import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useAppSelector } from '../../../../redux/hooks';
import { bottom_tab_user_icon } from '../../../../utils/images/GeneralImages';

const Profile = () => {
  const authData = useAppSelector((state) => state.auth);
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
          <Text style={styles.statValue}>{authData.data ? authData.data.followers.length : 0}</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
        <View style={styles.singleStatContainer}>
          <Text style={styles.statValue}>{authData.data ? authData.data.following.length : 0}</Text>
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
