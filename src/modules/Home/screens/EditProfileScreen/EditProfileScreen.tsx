import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../../navigation/RootNavigator'
import { edit_icon, gallery_icon, post_profile_icon } from '../../../../utils/images/GeneralImages'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { isValidEmail, uploadImageToFirebase } from '../../../../utils/utils'
import { UserService } from '../../../../internal_exports'
import TextInput from '../../../Common/components/TextInput/TextInput'
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors'
import { useAppSelector } from '../../../../redux/hooks'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import Loader from '../../../Common/components/Loader/Loader'

type EditProfileProps = NativeStackScreenProps<RootStackParams, 'EditProfileScreen'>

enum ImageUploadEnum {
  coverPicture = 'coverPicture',
  profilePicture = 'profilePicture'
}

const userService = new UserService.default();

const EditProfileScreen = ({ route }: EditProfileProps) => {

  const { userData } = route.params;
  const authData = useAppSelector((state) => state.auth)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [userName, setUserName] = useState({ value: userData?.userName || '', error: '' });
  const [email, setEmail] = useState({ value: userData?.email || '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: JSON.stringify(userData?.phoneNumber) || '', error: '' });
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>(userData?.profilePicture || '');
  const [coverPictureUrl, setCoverPictureUrl] = useState<string>(userData?.coverPicture || '');

  const [coverImageData, setCoverImageData] = useState<ImagePickerResponse | null>(null);
  const [profileImageData, setProfileImageData] = useState<ImagePickerResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async (type: ImageUploadEnum) => {
    const res = await launchImageLibrary({ mediaType: 'photo' });
    if (!res.didCancel) {
      if (type === ImageUploadEnum.coverPicture) {
        setCoverImageData(res);
      }
      else {
        setProfileImageData(res);
      }
    }
  }

  const handleUpdateProfileBtnDisability = () => {
    if (!email.value || !userName.value || !phoneNumber.value) {
      return true;
    }
    if (email.error || userName.error || phoneNumber.error) {
      return true;
    }
    return false;
  }

  const handleEditProfile = async () => {
    setIsLoading(true);

    let profilePicture: string | undefined = undefined;
    let coverPicture: string | undefined = undefined;
    try {
      if (profileImageData) {
        console.log('profileImageData is ', profileImageData);
        profilePicture = await uploadImageToFirebase(profileImageData);
      }
      console.log('after Profile picture');
      if (coverImageData) {
        console.log('coverImageData is ', coverImageData);
        coverPicture = await uploadImageToFirebase(coverImageData);
      }
      console.log('after coverPicture');
    }
    catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Some Error occured while updating the image'
      })
      setIsLoading(false);
      return;
    }

    const res = await userService.updateUser(authData.data?.accessToken || null, email.value || undefined, userName.value || undefined, parseInt(phoneNumber.value) || undefined, profilePicture, coverPicture);
    setIsLoading(false);

    if (res && res.status === 200) {
      Toast.show({
        type: 'success',
        text2: res.data.msg
      })
      navigation.goBack();
      return;
    }
  }

  return (
    <ScrollView style={styles.container}>

      <View style={{ marginTop: 10 }}>
        <TextInput label='User Name' placeholder='John Doe' errorText={userName.error} value={userName.value} onChangeText={(value) => {
          if (value.length === 0) {
            setUserName({ value: value, error: "User name can't be empty" })
          }
          else {
            setUserName({ value: value, error: '' })
          }
        }}
        />
        <TextInput label='Email' placeholder='example@example.com' errorText={email.error} value={email.value} onChangeText={(value) => {
          if (value.length === 0) {
            setEmail({ value: value, error: "Email can't be empty" })
          }
          else if (!isValidEmail(email.value)) {
            setEmail({ value: value, error: "Invalid email format" })
          }
          else {
            setEmail({ value: value, error: '' })
          }
        }}
        />
        <TextInput label='Phone Number'
          placeholder='9999999999'
          errorText={phoneNumber.error}
          value={phoneNumber.value}
          keyboardType='number-pad'
          maxLength={10}
          onChangeText={(value) => {
            if (value.length === 0) {
              setPhoneNumber({ value: value, error: "Phone number can't be empty" })
            }
            else if (value.length > 10) {
              setPhoneNumber({ value: value, error: "Phone number can't be more than 10 digits" })
            }
            else {
              setPhoneNumber({ value: value, error: '' })
            }
          }}
        />
      </View>

      <View>
        <Text style={styles.heading}>Change Cover Picture</Text>
        <TouchableOpacity style={styles.coverImageView} onPress={() => openGallery(ImageUploadEnum.coverPicture)}>
          {coverImageData !== null && coverImageData.assets ?
            <Image source={{ uri: coverImageData.assets[0].uri }} style={styles.selectedCoverImage} />
            :
            coverPictureUrl ?
              <Image source={{ uri: coverPictureUrl }} style={styles.selectedCoverImage} />
              :
              <Image source={gallery_icon} style={styles.coverImage} />
          }
          <Image source={edit_icon} style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.heading}>Change Profile Picture</Text>
        <TouchableOpacity style={styles.profileImageView} onPress={() => openGallery(ImageUploadEnum.profilePicture)}>
          {profileImageData !== null && profileImageData.assets ?
            <Image source={{ uri: profileImageData.assets[0].uri }} style={styles.selectedProfileImage} />
            :
            profilePictureUrl ?
              <Image source={{ uri: profilePictureUrl }} style={styles.selectedProfileImage} />
              :
              <Image source={post_profile_icon} style={styles.selectedProfileImage} />
          }
          <View style={{
            height: 28, width: 28, margin: 0, backgroundColor: GRADIENT_START, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
            position: 'absolute', bottom: 0, right: 0
          }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.editProfileBtn, { backgroundColor: handleUpdateProfileBtnDisability() ? DISABLE_BTN_COLOR : GRADIENT_START }]} onPress={handleEditProfile} disabled={handleUpdateProfileBtnDisability()}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
      <Loader isVisible={isLoading} />
    </ScrollView>
  )
}

export default EditProfileScreen

