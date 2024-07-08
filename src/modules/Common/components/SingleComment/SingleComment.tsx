import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { more_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'
import { CommentModel } from '../../../../internal_exports'
import { useAppSelector } from '../../../../redux/hooks'

type Props = {
    data: CommentModel.CommentData,
    onClickOptions: () => void;
}
const SingleComment = ({ data, onClickOptions }: Props) => {

    const authData = useAppSelector((state) => state.auth);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={post_profile_icon} style={styles.profileImage} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.userNameText}>{data.userName}</Text>
                        <Text style={styles.timestampText}>{new Date(data.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>

                {authData && authData.data && authData.data.userId === data.userId ?
                    <TouchableOpacity onPress={() => { onClickOptions() }}>
                        <Image source={more_icon} style={styles.icon} />
                    </TouchableOpacity>
                    :
                    null}

            </View>

            <View>
                <Text style={styles.commentText}>{data.text}</Text>
            </View>
        </View>
    )
}

export default SingleComment
