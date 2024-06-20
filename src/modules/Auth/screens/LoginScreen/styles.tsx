import { Dimensions, StyleSheet} from 'react-native'

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
        marginTop: window.height/8
    }
})