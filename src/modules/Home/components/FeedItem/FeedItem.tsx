import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { PostModel } from '../../../../internal_exports'
import { comment_icon, like_icon, more_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'

type Props = {
  data: PostModel.PostData;
  onClickOptions:()=>void;
}

const FeedItem = ({ data, onClickOptions }: Props) => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={post_profile_icon} style={styles.profileImage} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.userNameText}>{data.userName}</Text>
              <Text style={styles.timestampText}>{new Date(data.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onClickOptions()}>
            <Image source={more_icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {data.caption ? <Text style={styles.captionText}>{data.caption}</Text> : null}
        <View>
          {data.imageUrl && <Image source={{ uri: data.imageUrl }} style={styles.postImage} />}
        </View>
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Image source={like_icon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.statsValue}>{data.likes.length} likes</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Image source={comment_icon} style={[styles.icon, { height: 35, width: 35 }]} />
            </TouchableOpacity>
            <Text style={styles.statsValue}>{data.comments.length} comments</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default FeedItem
