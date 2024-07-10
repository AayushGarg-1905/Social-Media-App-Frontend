import { Button, Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { logo_icon } from '../../../../utils/images/GeneralImages'
import TextInput from '../../../Common/components/TextInput/TextInput'
import { isValidEmail } from '../../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient'
import { GRADIENT_END, GRADIENT_START } from '../../../../utils/Colors'
import { TouchableOpacity } from 'react-native'
import { AuthService } from '../../../../internal_exports'
import md5 from 'md5'
import Loader from '../../../Common/components/Loader/Loader'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { HOME_SCREEN, REGISTER_SCREEN } from '../../../../utils/constants/RouteName'
import { useAppDispatch } from '../../../../redux/hooks'
import { setAuthData } from '../../../../redux/AuthSlice'
import EncryptedStorage from 'react-native-encrypted-storage'

const authService = new AuthService.default();
const LoginScreen = () => {

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState({value:'',error:''});
  const [password, setPassword] = useState({value:'', error:''}); 
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async()=>{
    console.log('login clicked')
    setIsLoading(true);
    const res = await authService.login(email.value, md5(password.value));
    if(res && res.status === 200 && res.data.data){
      dispatch(setAuthData(res.data.data.userData));
      await EncryptedStorage.setItem('accessToken',res.data.data.userData.accessToken);
      navigation.reset({
        index: 0,
        routes: [{ name: HOME_SCREEN }],
      });
    }
    setIsLoading(false);
  }

  const handleButtonDisability = ()=>{
    if(!email.value || !password.value){
      return true;
    }
    if(email.error || password.error){
      return true;
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <Image source={logo_icon} style={styles.logo}/>
      <Text style={[styles.welcomeText,{marginTop:-20}]}>Welcome To</Text>
      <Text style={[styles.welcomeText, styles.appName]}>Instagram</Text>

      <View style={{marginTop:30}}>
        <TextInput label='Email' placeholder='example@example.com' errorText={email.error} value={email.value} onChangeText={(value)=>{
          if(value.length === 0){
            setEmail({value:value, error:"Email can't be empty"})
          }
          else if(!isValidEmail(email.value)){
            setEmail({value:value, error:"Invalid email format"})
          }
          else{
            setEmail({value:value,error:''} )
          }
          
        }}
        />
        <TextInput label='Password' placeholder='password' errorText={password.error} value={password.value} onChangeText={(value)=>{
          if(value.length<4){
            setPassword({value:value, error:"Password length should be aleast 4"})
          }
          else{
            setPassword({value:value,error:''} )
          }
          
        }}
        containerStyle={{marginTop:10}}
        />

        <LinearGradient
        colors= {handleButtonDisability() ?  ['#6f62d0','#c180ff'] : [GRADIENT_START, GRADIENT_END]}
        style={styles.btn}
        >
          <TouchableOpacity style={[styles.btn, {justifyContent:'center', alignItems:'center', marginTop:0}]} onPress={handleLogin} disabled={handleButtonDisability()}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Text style={styles.signUpText} onPress={()=>{
        navigation.navigate(REGISTER_SCREEN)
      }}>
        Create New Account? <Text style={styles.signUpLink}>Sign Up</Text>
      </Text>
      <Loader isVisible={isLoading}/>
    </View>
  )
}

export default LoginScreen
