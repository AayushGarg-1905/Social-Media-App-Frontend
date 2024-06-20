import { Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { logo_icon } from '../../../../utils/images/GeneralImages'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { LOGIN_SCREEN } from '../../../../utils/constants/RouteName'

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate(LOGIN_SCREEN)
    },2000)
  })
  return (
    <View style={styles.container}>
      <Image source={logo_icon} style={styles.logo}/>
    </View>
  )
}

export default SplashScreen
