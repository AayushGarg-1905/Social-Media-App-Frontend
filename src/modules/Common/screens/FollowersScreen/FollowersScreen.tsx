import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { UserModel, UserService } from '../../../../internal_exports';
import { useAppSelector } from '../../../../redux/hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { OTHER_USER_PROFILE_SCREEN } from '../../../../utils/constants/RouteName';
import { post_profile_icon } from '../../../../utils/images/GeneralImages';

type FollowingScreenProps = NativeStackScreenProps<RootStackParams, 'FollowingScreen'>
const userService = new UserService.default();

const FollowersScreen = ({ route }: FollowingScreenProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [followersList, setFollowersList] = useState<UserModel.FollowersData[]>([]);
    const [userData, setUserData] = useState<UserModel.UserData | null>(null);
    const authData = useAppSelector((state) => state.auth);
    const isFoccused = useIsFocused();

    useEffect(() => {
        if (isFoccused) {
          fetchFollowersList();
        }
    }, [isFoccused])

    const fetchFollowersList = async () => {
        const res = await userService.getFollowersData(authData.data?.accessToken || null, route.params.userId);
        if (res && res.data) {
            setFollowersList(res.data.data.followersData);
        }
    }

    if(followersList.length==0){
      return (
        <View style={{marginTop:10,justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'black'}}>No one follows you</Text>
        </View>
      )
    }

    return (
        <View style={{ flex: 1 }}>
      <FlatList
        data={followersList}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate(OTHER_USER_PROFILE_SCREEN,{userId:item._id})
                }}>
                  {item.profilePicture ?
                  <Image source={{uri:item.profilePicture}} style={[styles.profileImage, {tintColor:'',resizeMode:'cover'}]} />
                  : 
                  <Image source={post_profile_icon} style={styles.profileImage} />
                  }
                </TouchableOpacity>
                
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.userNameText}>{item.userName}</Text>
                </View>
              </View>
            </View>
          </View>
          )
        }}
      />
    </View>
    )
}

export default FollowersScreen
