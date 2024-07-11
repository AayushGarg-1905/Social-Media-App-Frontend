import { Dimensions, StyleSheet } from 'react-native'

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1
    },
    bottomSheetContainer: {
        width: '100%',
        height: '100%',
        paddingBottom: 20,
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute',
        // borderTopLeftRadius:20,
        // borderTopRightRadius:20,

    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 20
    },
    editPostTitle: {
        color: 'black',
        fontSize: 20,
        // marginTop: 20,
        marginLeft: 20,
        fontWeight: '600'
    },
    captionContainer: {
        width: '90%',
        height: 100,
        borderWidth: 0.5,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: window.height / 40
    },
    captionInput: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
        color:'black'
    },
    selectedImageView: {
        width: '90%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        opacity:0.7
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