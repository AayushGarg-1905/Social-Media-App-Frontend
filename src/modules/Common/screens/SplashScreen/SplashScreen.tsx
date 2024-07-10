import { Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { logo_icon } from '../../../../utils/images/GeneralImages'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { HOME_SCREEN, LOGIN_SCREEN } from '../../../../utils/constants/RouteName'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthService } from '../../../../internal_exports'
import { setAuthData } from '../../../../redux/AuthSlice'

const authService = new AuthService.default();

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   console.log('authData is ',authData);
  //   const isLoggedIn = handleCheckLogin();
  //   const timer = setTimeout(() => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name:  ? HOME_SCREEN : LOGIN_SCREEN }],
  //     });
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [navigation]);

  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      const isLoggedIn = await handleCheckLogin();
      const timer = setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: isLoggedIn ? HOME_SCREEN : LOGIN_SCREEN }],
        });
      }, 2000);

      return () => clearTimeout(timer);
    };

    checkLoginAndNavigate();
  }, [navigation]);

  const handleCheckLogin = async()=>{
    const accessToken = await EncryptedStorage.getItem('accessToken');
    if(!accessToken){
      return false;
    }

    const res = await authService.checkLogin(accessToken);
    if(res && res.data && res.data.data){
      dispatch(setAuthData(res.data.data.userData));
      await EncryptedStorage.setItem('accessToken',res.data.data.userData.accessToken);
      return true;
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <Image source={logo_icon} style={styles.logo} />
    </View>
  )
}

export default SplashScreen
