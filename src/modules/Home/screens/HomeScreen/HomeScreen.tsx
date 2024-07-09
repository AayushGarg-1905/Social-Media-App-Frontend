import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { bottom_tab_home_icon, bottom_tab_user_icon, bottom_tab_plus_icon } from '../../../../utils/images/GeneralImages'
import { GRADIENT_END, GRADIENT_START } from '../../../../utils/Colors'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { CREATE_POST_SCREEN } from '../../../../utils/constants/RouteName'
import Feeds from '../../components/Feeds/Feeds'
import Profile from '../../components/Profile/Profile'
import { useAppSelector } from '../../../../redux/hooks'
import { PostService } from '../../../../internal_exports'

const postService = new PostService.default();
const HomeScreen = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const authData = useAppSelector((state) => state.auth);

  const fetchAllPosts = async () => {
    if (authData.data && authData.data.accessToken) {
      const res = await postService.getAllPosts(authData.data.accessToken);
      if (res && res.data.data) {
        return res.data.data.postsData
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instagram</Text>
      {selectedTab===0 ? <Feeds fetchPosts={fetchAllPosts}/> : <Profile userId={authData.data?.userId || ''}/>}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(0)}}>
          <Image
            source={bottom_tab_home_icon} style={[styles.tabIcon, {tintColor: selectedTab===0 ? GRADIENT_START : 'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={()=>navigation.navigate(CREATE_POST_SCREEN)}>
          <Image
            source={bottom_tab_plus_icon} style={[styles.tabIcon,{tintColor:'white'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>setSelectedTab(1)}>
          <Image
            source={bottom_tab_user_icon} style={[styles.tabIcon, {tintColor: selectedTab===1 ? GRADIENT_START : 'black'}]} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen
