import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { PostModel } from '../../../../internal_exports'
import { bottom_tab_user_icon, more_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'

type Props = {
    data: PostModel.PostData;
}

const FeedItem = ({data}:Props) => {
  console.log('data of post is ',data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Image source={post_profile_icon} style={styles.profileImage}/>
            <View style={{marginLeft:8}}>
              <Text style={styles.userNameText}>{data.userName}</Text>
              <Text style={styles.timestampText}>{data.createdAt}</Text>
            </View>
        </View>
        <TouchableOpacity>
          <Image source={more_icon} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.captionText}>{data.caption}</Text>
    </View>
  )
}

export default FeedItem
