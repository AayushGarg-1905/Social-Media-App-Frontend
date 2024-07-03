import { Dimensions, StyleSheet} from 'react-native'
import { GRADIENT_START } from '../../../../utils/Colors'

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    title:{
        color:GRADIENT_START,
        fontWeight:'700',
        fontSize:25,
        marginLeft:20,
        marginTop: window.height/60,
        marginBottom:10
    },
    bottomNav:{
        width:'100%',
        height:70,
        position:'absolute',
        bottom:0,
        backgroundColor:'#f2f2f2',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    bottomTab:{
        width:'25%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    tabIcon:{
        width:34,
        height:34
    },
    addBtn:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:GRADIENT_START,
        justifyContent:'center',
        alignItems:'center',
        marginTop:-10
    }
})