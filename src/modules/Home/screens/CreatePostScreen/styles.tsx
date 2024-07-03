import { Dimensions, StyleSheet} from 'react-native'

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    captionContainer:{
       width:'90%',
       height:100,
       borderWidth:0.5,
       alignSelf:'center',
       borderRadius:10,
       marginTop: window.height/40
    },
    captionInput:{
        width:'100%',
        height:'100%',
        textAlignVertical:'top'
    },
    imagePickerBtn:{
        width:'90%',
        height:50,
        flexDirection:'row',
        alignSelf:'center',
        borderBottomWidth:1,
        borderBottomColor:'#9e9e9e',
        alignItems:'center'
    },
    icon:{
      width:24,
      height:24,
      tintColor:'#9e9e9e'  
    },
    pickerIconText:{
        marginLeft:15,
        fontSize:18
    },
    selectedImageView:{
        width:'90%',
        height:200,
        marginTop:20,
        borderRadius:10,
        alignSelf:'center'
    },
    selectedImage:{
       width:'100%',
       height:'100%',
       borderRadius:10
    },
    removeImageBtn:{
       width:30,
       height:30,
       backgroundColor:'white',
       justifyContent:'center',
       alignItems:'center',
       position:'absolute',
       top:10,
       right:10,
       borderRadius:20 
    },
    postBtn:{
        width:'90%',
        height:50,
        marginTop:20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    btnText:{
        fontSize:16,
        color:'white'
    }
})