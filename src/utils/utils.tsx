import { ImagePickerResponse } from "react-native-image-picker";
import storage from '@react-native-firebase/storage';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const isValidEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(email)) {
    return false;
  }
  return true;
};

export const uploadImageToFirebase = async(imageData:ImagePickerResponse | null)=>{
  if(!imageData || !imageData.assets || !imageData.assets[0].fileName || !imageData.assets[0].uri){
    return '';
  }
  const reference = storage().ref(imageData.assets[0].fileName);
  const pathToFile = imageData.assets[0].uri;
  await reference.putFile(pathToFile);
  const firebaseUrl = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
  return firebaseUrl;
}

export const formattedDate = (dateString:string) => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays > 5) {
    return format(date, 'dd-MM-yyyy');
  }

  return formatDistanceToNow(date, { addSuffix: true });
};