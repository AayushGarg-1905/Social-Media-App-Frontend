import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:100,
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:10,
        
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    headerLeft: {
        flexDirection:'row',
        marginTop:10
    },
    profileImage:{
        width:40,
        height:40,
        borderRadius:25,
        tintColor:'#9e9e9e',
        marginLeft:10
    },
    userNameText:{
        fontSize:16,
        fontWeight:'500',
        color:'black'
    },
    timestampText:{
        fontSize:14
    },
    commentText:{
        fontSize:16,
        fontWeight:'400',
        width:'90%',
        alignSelf:'center',
        marginTop:10
    },
    icon:{
        height:20,
        width:20,
        tintColor:'black',
        marginTop:5
    },
})