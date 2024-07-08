import { Dimensions, StyleSheet} from 'react-native'

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.2)',
        flex:1
    },
    bottomSheetContainer:{
        width:'100%',
        // height:window.height/3,
        paddingBottom:20,
        backgroundColor:'white',
        bottom:0,
        position:'absolute',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        
    },
    postOptionsTitle:{
        color:'black',
        fontSize:20,
        marginTop:20,
        marginLeft:20,
        fontWeight:'600'
    },
    optionContainer:{
        flexDirection:'row',
        width:'90%',
        height:50,
        alignItems:'center',
        alignSelf:'center',
    },
    optionImage:{
        width:25,
        height:25
    },
    optionText:{
        color:'black',
        marginLeft:10,
        fontSize:17
    }
})