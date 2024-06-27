import { Button, Image, Pressable, ScrollView, Text, View } from 'react-native'
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
import { LOGIN_SCREEN, REGISTER_SCREEN } from '../../../../utils/constants/RouteName'
import { Gender } from '../../../../models/common.model'
import RadioButton from '../../../Common/components/RadioButton/RadioButton'

const authService = new AuthService.default();
const RegisterScreen = () => {

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [userName, setUserName] = useState({value:'', error:''});
  const [email, setEmail] = useState({value:'',error:''});
  const [password, setPassword] = useState({value:'', error:''});
  const [phoneNumber, setPhoneNumber] = useState({value:'', error:''});
  const [gender, setGender] = useState({value:'', error:''}); 
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async()=>{
    setIsLoading(true);
    const res = await authService.register(userName.value, email.value, md5(password.value), gender.value, phoneNumber.value);
    setIsLoading(false);
    if(res && res.status===200){
      Toast.show({
        type:'success',
        text2:'Registered succesfully'
      })
      navigation.navigate(LOGIN_SCREEN)
      return;
    }
  }

  const handleButtonDisability = ()=>{
    if(!email.value || !password.value || !userName.value || !phoneNumber.value || !gender.value){
      return true;
    }
    if(email.error || password.error || userName.error || phoneNumber.error || gender.error){
      return true;
    }
    return false;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={logo_icon} style={styles.logo}/>
      <Text style={[styles.welcomeText,{marginTop:-20}]}>Create New Account</Text>
      <Text style={[styles.welcomeText, styles.appName]}>Instagram</Text>

      <View style={{marginTop:30}}>
      <TextInput label='User Name' placeholder='John Doe' errorText={userName.error} value={userName.value} onChangeText={(value)=>{
          if(value.length === 0){
            setUserName({value:value, error:"User name can't be empty"})
          }
          else{
            setUserName({value:value,error:''} )
          }
        }}
        />
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
        <TextInput label='Phone Number'
         placeholder='9999999999'
          errorText={phoneNumber.error}
          value={phoneNumber.value} 
          keyboardType='number-pad'
          maxLength={10}
          onChangeText={(value)=>{
            if(value.length === 0){
              setPhoneNumber({value:value, error:"Phone number can't be empty"})
            }
            else if(value.length >10){
              setPhoneNumber({value:value, error:"Phone number can't be more than 10 digits"})
            }
            else{
              setPhoneNumber({value:value,error:''} )
            }
        }}
        />
        <View style={styles.radiocontainer}>
          <Text style={styles.radioLabel}>Select Gender</Text>
          <RadioButton options={Gender} 
          selectedOption={gender.value} 
          onSelect={(option)=>setGender({value:option,error:''})
          }
          containerStyle={{flexDirection:'row', marginTop:10}}
          radioContainerStyle={{marginRight:20}}
          />
        </View>
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
          <TouchableOpacity style={[styles.btn, {justifyContent:'center', alignItems:'center', marginTop:0}]} onPress={handleRegister} disabled={handleButtonDisability()}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{marginBottom:40}}>
      <Text style={styles.signUpText} onPress={()=>{
        navigation.navigate(LOGIN_SCREEN)
      }}>
        Already Account Exists? <Text style={styles.signUpLink}>Login</Text>
      </Text>
      </View>
      <Loader isVisible={isLoading}/>
    </ScrollView>
  )
}

export default RegisterScreen
