import { Dimensions, StyleSheet } from 'react-native'

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    editCommentTitle:{
        color: 'black',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '600',
        alignSelf:'center'
    },
    
    commentContainer: {
        width: '90%',
        height: 75,
        borderWidth: 0.5,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: window.height / 40
    },
    commentInput: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'top'
    },
    mainView:{
        width:'90%',
        paddingBottom:20,
        backgroundColor:'white',
        borderRadius:10
    },
    btnContainer:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        marginTop:20
    },
    btn:{
        width:'40%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
    btnText:{
        color:'white',
        fontSize:16
    }
})