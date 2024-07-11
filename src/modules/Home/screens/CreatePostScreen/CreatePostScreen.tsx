import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import {
  close_icon,
  camera_icon,
  gallery_icon
} from '../../../../utils/images/GeneralImages'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DISABLE_BTN_COLOR, GRADIENT_START } from '../../../../utils/Colors';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { PostService } from '../../../../internal_exports';
import { useAppSelector } from '../../../../redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../../navigation/RootNavigator';
import { HOME_SCREEN } from '../../../../utils/constants/RouteName';
import Loader from '../../../Common/components/Loader/Loader';


const postService = new PostService.default();
const CreatePostScreen = () => {

  const authData = useAppSelector((state) => state.auth);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [imageData, setImageData] = useState<ImagePickerResponse | null>(null);
  const [caption, setCaption] = useState<string>('');
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const openCamera = async () => {
    const res = await launchCamera({ mediaType: 'photo' });
    if (!res.didCancel) {
      setImageData(res);
    }
  }

  const openGallery = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo' });
    if (!res.didCancel) {
      setImageData(res);
    }
  }

  const handlePostButtonDisability = ()=>{
    if(caption.length===0 && imageData===null){
      return true;
    }
    return false;
  }

  const handleCreatePost = async()=>{
    if(handlePostButtonDisability()){
      Toast.show({
        type:'error',
        text1:'Write caption or choose an image',
        position:'bottom'
      })
      return;
    }
    setIsLoading(true);
    let imageUrl = '';
    if(imageData){
      imageUrl = await uploadImageToFirebase();
    }
  
    const res = await postService.createPost(authData.data?.accessToken,caption.length>0?caption:undefined, imageUrl.length>0 ? imageUrl:undefined);
    setIsLoading(false);
    if(res){
      Toast.show({
        type:'success',
        text1:'Post Created Succesfully',
        position:'top'
      })
      navigation.navigate(HOME_SCREEN);
    }
    
  }

  const uploadImageToFirebase = async()=>{
    if(!imageData || !imageData.assets || !imageData.assets[0].fileName || !imageData.assets[0].uri){
      return '';
    }
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const firebaseUrl = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    return firebaseUrl;
  }

  return (
    <View style={styles.container}>
      <View style={styles.captionContainer}>
        <TextInput
          value={caption}
          onChangeText={(text)=>setCaption(text)}
          placeholder='Type caption here...'
          multiline={true}
          placeholderTextColor='grey'
          style={styles.captionInput} />
      </View>

      {imageData !== null && imageData.assets && <View style={styles.selectedImageView}>
        <Image source={{ uri: imageData.assets[0].uri }} style={styles.selectedImage} />
        <TouchableOpacity style={styles.removeImageBtn} onPress={() => {
          setImageData(null);
        }}>
          <Image source={close_icon} style={[styles.icon, { height: 17, width: 17 }]} />
        </TouchableOpacity>
      </View>
      }

      <TouchableOpacity style={[styles.imagePickerBtn, { marginTop: 40 }]} onPress={() => openCamera()}>
        <Image source={camera_icon} style={styles.icon} />
        <Text style={styles.pickerIconText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.imagePickerBtn, { marginTop: 20 }]} onPress={() => openGallery()}>
        <Image source={gallery_icon} style={styles.icon} />
        <Text style={styles.pickerIconText}>Open Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.postBtn, {backgroundColor:handlePostButtonDisability() ? DISABLE_BTN_COLOR :GRADIENT_START}]}
      onPress={handleCreatePost}
      >
        <Text style={styles.btnText}>Post </Text>
      </TouchableOpacity>
      <Loader isVisible={isLoading}/>
    </View>
  )
}

export default CreatePostScreen
