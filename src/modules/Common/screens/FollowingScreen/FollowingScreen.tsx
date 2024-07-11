import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { UserModel, UserService } from '../../../../internal_exports'
import { useAppSelector } from '../../../../redux/hooks'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import FollowingListItem from '../../components/FollowingListItem/FollowingListItem'


type FollowingScreenProps = NativeStackScreenProps<RootStackParams, 'FollowingScreen'>
const userService = new UserService.default();

const FollowingScreen = ({ route }: FollowingScreenProps) => {

  const [followingList, setFollowingList] = useState<UserModel.FollowingData[]>([]);
  const [userData, setUserData] = useState<UserModel.UserData | null>(null);
  const authData = useAppSelector((state) => state.auth);
  const isFoccused = useIsFocused();

  useEffect(() => {
    if (isFoccused) {
      fetchOwnUserData();
      fetchFollowingList();
    }
  }, [isFoccused])


  const fetchFollowingList = async () => {
    const res = await userService.getFollowingList(authData.data?.accessToken || null, route.params.userId);
    if (res && res.data) {
      setFollowingList(res.data.data.followingData);
    }
  }

  const fetchOwnUserData = async () => {
    if (authData.data && authData.data.accessToken) {
      const res = await userService.getUserData(authData.data.accessToken, authData.data.userId);
      if (res && res.data) {
        setUserData(res.data.data);
      }
    }
  }

  const handleFollowUser = async(targetUserId: string)=>{
    const res = await userService.followUser(authData.data ? authData.data.accessToken : null, targetUserId);
    if (res) {
      fetchOwnUserData();
      fetchFollowingList();
    }
  }

  const handleUnfollowUser = async(targetUserId: string)=>{
    const res = await userService.unfollowUser(authData.data ? authData.data.accessToken : null, targetUserId);
    if (res) {
      fetchOwnUserData();
      fetchFollowingList();
    }
  }

  if(followingList.length==0){
    return (
      <View style={{marginTop:10,justifyContent:'center', alignItems:'center'}}>
        <Text style={{color:'black'}}>You don't follow anyone</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={followingList}
        renderItem={({ item, index }) => {
          return <FollowingListItem
            data={item}
            userData={userData}
            handleFollowUser={() => {
              handleFollowUser(item._id);
            }}
            handleUnfollowUser={() => {
              handleUnfollowUser(item._id);
            }}
          />
        }}
      />
    </View>
  )
}

export default FollowingScreen
