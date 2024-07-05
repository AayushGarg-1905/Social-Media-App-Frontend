import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        marginTop: 20,
        borderRadius:10,
        paddingBottom:20
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
        alignSelf:'center'
    },
    postImage:{
        width:'90%',
        height:200,
        borderRadius:10,
        alignSelf:'center',
        marginVertical:10
    }

})