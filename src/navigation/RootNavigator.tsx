import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
    SPLASH_SCREEN,
    LOGIN_SCREEN,
    REGISTER_SCREEN,
    HOME_SCREEN,
    CREATE_POST_SCREEN,
    COMMENT_SCREEN,
    EDIT_PROFILE_SCREEN,
    OTHER_USER_PROFILE_SCREEN
} from "../utils/constants/RouteName";
import SplashScreen from "../modules/Common/screens/SplashScreen/SplashScreen";
import RegisterScreen from "../modules/Auth/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "../modules/Auth/screens/LoginScreen/LoginScreen";
import HomeScreen from "../modules/Home/screens/HomeScreen/HomeScreen";
import CreatePostScreen from "../modules/Home/screens/CreatePostScreen/CreatePostScreen";
import CommentScreen from "../modules/Common/screens/CommentScreen/CommentScreen";
import EditProfileScreen from "../modules/Home/screens/EditProfileScreen/EditProfileScreen";
import { UserModel } from "../internal_exports";
import OtherUserProfileScreen from "../modules/Common/screens/OtherUserProfileScreen/OtherUserProfileScreen";


export type RootStackParams = {
    SplashScreen: undefined,
    LoginScreen: undefined,
    RegisterScreen: undefined,
    HomeScreen: undefined,
    CreatePostScreen: undefined,
    CommentScreen: {
        postId: string
    },
    EditProfileScreen: {
        userData: UserModel.UserData | null
    },
    OtherUserProfileScreen:{
        userId:string
    }
    
}
const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={SPLASH_SCREEN}
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={LOGIN_SCREEN}
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={REGISTER_SCREEN}
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={HOME_SCREEN}
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={CREATE_POST_SCREEN}
                    component={CreatePostScreen}
                    options={{ headerTitle: 'Create New Post' }}
                />
                <RootStack.Screen
                    name={COMMENT_SCREEN}
                    component={CommentScreen}
                    options={{ headerTitle: 'Comments' }}
                />

                <RootStack.Screen
                    name={EDIT_PROFILE_SCREEN}
                    component={EditProfileScreen}
                    options={{ headerTitle: 'Edit Profile' }}
                />

                <RootStack.Screen
                    name={OTHER_USER_PROFILE_SCREEN}
                    component={OtherUserProfileScreen}
                    options={{ headerTitle: 'Profile' }}
                />

            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator