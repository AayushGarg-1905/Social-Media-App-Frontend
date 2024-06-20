import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { 
SPLASH_SCREEN,
LOGIN_SCREEN,
REGISTER_SCREEN 
} from "../utils/constants/RouteName";
import SplashScreen from "../modules/Common/screens/SplashScreen/SplashScreen";
import RegisterScreen from "../modules/Auth/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "../modules/Auth/screens/LoginScreen/LoginScreen";


export type RootStackParams = {
    SplashScreen:undefined,
    LoginScreen:undefined,
    RegisterScreen:undefined
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
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator