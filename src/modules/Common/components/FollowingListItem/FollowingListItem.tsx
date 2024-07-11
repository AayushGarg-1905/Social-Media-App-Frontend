import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { UserModel } from '../../../../internal_exports';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { OTHER_USER_PROFILE_SCREEN } from '../../../../utils/constants/RouteName';
import { post_profile_icon } from '../../../../utils/images/GeneralImages';
import { useAppSelector } from '../../../../redux/hooks';

type Props = {
    data: UserModel.FollowingData;
    userData:UserModel.UserData | null; 
    handleFollowUser:()=>void;
    handleUnfollowUser:()=>void;
}
const FollowingListItem = ({data, userData, handleFollowUser, handleUnfollowUser}:Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const authData = useAppSelector((state)=>state.auth);
    const isAlreadyFollowing = ()=>{
        if(!userData){
          return;
        }
        let isFollowed = false;
        userData.following.map((id) => {
          if (id === data._id) {
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
                  navigation.navigate(OTHER_USER_PROFILE_SCREEN,{userId:data._id})
                }}>
                  {data.profilePicture ?
                  <Image source={{uri:data.profilePicture}} style={[styles.profileImage, {tintColor:'',resizeMode:'cover'}]} />
                  : 
                  <Image source={post_profile_icon} style={styles.profileImage} />
                  }
                </TouchableOpacity>
                
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.userNameText}>{data.userName}</Text>
                </View>
              </View>
              {
                data._id !== authData.data?.userId ? 
                isAlreadyFollowing() ?
                <TouchableOpacity onPress={() => {handleUnfollowUser()}} style={styles.btn}>
                  <Text style={styles.btnText}>Unfollow</Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity onPress={() => {handleFollowUser()}} style={styles.btn}>
                  <Text style={styles.btnText}>Follow</Text>
                </TouchableOpacity>
                :
                null  
                
              }
            </View>
          </View>
        </>
      )
}

export default FollowingListItem
