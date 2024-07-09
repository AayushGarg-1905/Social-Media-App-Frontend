import { StyleSheet } from 'react-native'
import { GRADIENT_START } from '../../../../utils/Colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    coverImageView: {
        width: '90%',
        height: 120,
        backgroundColor: GRADIENT_START,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    coverImage: {
        width: 50,
        height: 50,
        tintColor: 'white'
    },
    editIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
        position: 'absolute',
        top: 10,
        right: 10
    },
    selectedCoverImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    uploadBtn: {
        width: 120,
        height: 50,
        backgroundColor: GRADIENT_START,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        marginLeft: 20
    },
    btnText: {
        color: 'white'
    },
    heading: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        marginTop: 10,
        marginLeft: 20
    },
    profileImageView: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: GRADIENT_START,
        marginTop: 10,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedProfileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50
    },
    editProfileBtn: {
        width: '87%',
        height: 55,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 18,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:50
    }
})