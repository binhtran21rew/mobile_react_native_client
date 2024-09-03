import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../../app/pages/Login";
// import Register from "../../app/pages/Register";



const Stack = createStackNavigator();
export const AppNavigation = () => {
    return (
        <NavigationContainer  independent={true}>
            <Stack.Navigator>
                <Stack.Screen 
                    name="auth" component={AuthNavigation}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                // name="login" component={Login}
            />
            <Stack.Screen 
                // name="register" component={Register}
            />
        </Stack.Navigator>
    )
}