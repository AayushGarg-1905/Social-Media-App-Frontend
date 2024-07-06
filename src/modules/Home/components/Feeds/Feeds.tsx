import { ActivityIndicator, Dimensions, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { PostService } from '../../../../internal_exports'
import { useAppSelector } from '../../../../redux/hooks';
import { PostData } from '../../../../models/post.model';
import FeedItem from '../FeedItem/FeedItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { useIsFocused } from '@react-navigation/native';
import PostOptions from '../PostOptions/PostOptions';

const postService = new PostService.default();
const window = Dimensions.get('window')

const Feeds = () => {

  const isFocused = useIsFocused();  
  const authData = useAppSelector((state) => state.auth);
  const [feeds,setFeeds] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFeedUpdated, setIsFeedUpdated] = useState(false);
  useEffect(()=>{
    console.log('useEffect of isFoccuse called');
    fetchAllPosts()
  },[isFocused])

  useEffect(()=>{
    if(isFeedUpdated){
      console.log('feed updated')
      fetchAllPosts();
    }
  },[isFeedUpdated])

  const fetchAllPosts = async()=>{
    setLoading(true);
    if(authData.data && authData.data.accessToken){
      const res = await postService.getAllPosts(authData.data.accessToken);
      if(res && res.data.data){
        setFeeds(res.data.data.postsData)
      }
      setLoading(false);
      setIsFeedUpdated(false);
    }
  }

  if(loading){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  return (
    <View style={{flex:1}}>
      <FlatList
        data={feeds}
        renderItem={({item,index})=>{
          return <FeedItem data={item} isFeedUpdated={isFeedUpdated} setIsFeedUpdated={setIsFeedUpdated}/>
        }}
        contentContainerStyle={{paddingBottom: window.height/10}}
      />
    </View>
  )
}

export default Feeds
