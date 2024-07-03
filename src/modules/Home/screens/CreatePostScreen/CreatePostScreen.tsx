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

const CreatePostScreen = () => {

  const [imageData, setImageData] = useState<ImagePickerResponse | null>(null);
  const [caption, setCaption] = useState<string>('');
  
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

  const handleCreatePost = ()=>{
    if(handlePostButtonDisability()){
      Toast.show({
        type:'error',
        text1:'Write caption or choose an image',
        position:'bottom'
      })
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.captionContainer}>
        <TextInput
          value={caption}
          onChangeText={(text)=>setCaption(text)}
          placeholder='Type caption here...'
          multiline={true}
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
    </View>
  )
}

export default CreatePostScreen
