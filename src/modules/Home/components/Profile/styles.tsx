import { Dimensions, StyleSheet } from 'react-native'
import { DISABLE_BTN_COLOR, GRADIENT_END, GRADIENT_START } from '../../../../utils/Colors';
const window = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    profilePictureContainer:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:GRADIENT_END,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        marginTop:-window.height/20
    },
    profilePicture:{
        height:50,
        width:50,
        tintColor:'white'
    },
    userName:{
        fontSize:25,
        marginLeft:20,
        marginTop:5,
        fontWeight:'500',
        color:'black'
    },
    email:{
        fontSize:15,
        // marginTop:6,
        fontWeight:'400',
        color:'black'
    },
    editBtn:{
        width:'90%',
        height:50,
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    editBtnText:{
        fontSize:20,
        color:'black'
    },
    statsContainer:{
        width:'90%',
        justifyContent:'space-between',
        flexDirection:'row',
        alignSelf:'center',
        marginTop:12
    },
    singleStatContainer:{
        alignItems:'center'
    },
    statValue:{
        fontSize:25,
        fontWeight:'600',
        color:'black'
    },
    statTitle:{
        fontSize:16,
        marginTop:3,
        color:'black'
    },
    coverImageView:{
        width:'100%',
        height:150,
        backgroundColor:GRADIENT_START
    },
    contactDetailsContainer:{
        flexDirection:'row',
        marginLeft:20
    }
})