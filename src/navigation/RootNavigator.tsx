import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { 
SPLASH_SCREEN,
LOGIN_SCREEN,
REGISTER_SCREEN, 
HOME_SCREEN,
CREATE_POST_SCREEN
} from "../utils/constants/RouteName";
import SplashScreen from "../modules/Common/screens/SplashScreen/SplashScreen";
import RegisterScreen from "../modules/Auth/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "../modules/Auth/screens/LoginScreen/LoginScreen";
import HomeScreen from "../modules/Home/screens/HomeScreen/HomeScreen";
import CreatePostScreen from "../modules/Home/screens/CreatePostScreen/CreatePostScreen";


export type RootStackParams = {
    SplashScreen:undefined,
    LoginScreen:undefined,
    RegisterScreen:undefined,
    HomeScreen:undefined,
    CreatePostScreen:undefined
}
const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = ()=>{
    return (
        <NavigationContainer>   
            <RootStack.Navigator>
                <RootStack.Screen 
                    name= {SPLASH_SCREEN}
                    component={SplashScreen}
                    options={{headerShown:false}}
                />
                <RootStack.Screen 
                    name= {LOGIN_SCREEN}
                    component={LoginScreen}
                    options={{headerShown:false}}
                />
                <RootStack.Screen 
                    name= {REGISTER_SCREEN}
                    component={RegisterScreen}
                    options={{headerShown:false}}
                />
                <RootStack.Screen 
                    name= {HOME_SCREEN}
                    component={HomeScreen}
                    options={{headerShown:false}}
                />
                <RootStack.Screen 
                    name= {CREATE_POST_SCREEN}
                    component={CreatePostScreen}
                    options={{headerTitle:'Create New Post'}}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator