import { Image, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { logo_icon } from '../../../../utils/images/GeneralImages'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo_icon} style={styles.logo}/>
      <Text>Welcome Back</Text>
      <Text>Instagram</Text>
    </View>
  )
}

export default LoginScreen
