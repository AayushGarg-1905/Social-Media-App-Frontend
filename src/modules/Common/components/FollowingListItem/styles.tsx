import { StyleSheet } from 'react-native'
import { GRADIENT_START } from '../../../../utils/Colors'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius:10,
    },
    header: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        paddingRight:10
    }, 
    headerLeft: {
        flexDirection:'row'
    },
    headerRight: {

    },
    profileImage:{
        width:40,
        height:40,
        borderRadius:25,
        tintColor:'#9e9e9e',
        marginLeft:10
    },
    userNameText:{
        fontSize:17,
        fontWeight:'600',
        color:'black'
    },
    timestampText:{
        fontSize:14
    },
    icon:{
        height:24,
        width:24,
        tintColor:'black',
        marginTop:5
    },
    captionText:{
        width:'90%',
        marginTop:10,
        alignSelf:'center',
        // color:'black'
    },
    postImage:{
        width:'100%',
        height:200,
        // borderRadius:10,
        alignSelf:'center',
        marginVertical:10,
        // resizeMode:'contain'
    },
    footer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        // marginBottom:-10
    },
    statsValue:{
        color:'black',
        fontSize:15,
        marginLeft:4
    },
    btn:{
      height:35,
      backgroundColor:GRADIENT_START,
      paddingHorizontal:15,
      marginTop:10,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
    },
    btnText:{
        color:'white',
        fontSize:15
    }


})