import { Dimensions, StyleSheet} from 'react-native'
import { GRADIENT_START } from '../../../../utils/Colors';

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    logo:{
        width:150,
        height:150,
        alignSelf:'center',
        marginTop: window.height/30
    },
    welcomeText:{
        color:'black',
        alignSelf:'center',
        fontSize:25,
        fontWeight:'500'
    },
    appName:{
        color:GRADIENT_START
    },
    btn:{
        width:'87%',
        height:55,
        alignSelf:'center',
        marginTop:30,
        borderRadius:18
    },
    btnText:{
        color:'white',
        fontSize:20,
        fontWeight:'600'
    },
    signUpText:{
        fontSize:18,
        alignSelf:'center',
        marginTop:40,
        fontWeight:'500',
        color:'black'
    },
    signUpLink:{
        color:GRADIENT_START,
        fontWeight:'700',
        marginLeft:10
    }
})