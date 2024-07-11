import { StyleSheet } from 'react-native'
import { GRADIENT_START } from '../../../../utils/Colors'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bottomViewContainer:{
        width:'100%',
        height:70,
        backgroundColor:'white',
        elevation:5,
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    commentInput:{
        height:'100%',
        width:'78%',
        marginRight:3,
        textAlignVertical:'top',
        color:'black'
    },
    postCommentBtn:{
        height:'70%',
        width:'22%',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:GRADIENT_START
    },
    postCommentBtnText:{
        color:'white'
    }
})