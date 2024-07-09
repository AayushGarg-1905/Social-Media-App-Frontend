import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import Profile from '../../../Home/components/Profile/Profile';

type OtherUserProfileProps = NativeStackScreenProps<RootStackParams, 'OtherUserProfileScreen'>

const OtherUserProfileScreen = ({route}:OtherUserProfileProps) => {
  return (
    <Profile userId={route.params.userId}/>
  )
}

export default OtherUserProfileScreen
