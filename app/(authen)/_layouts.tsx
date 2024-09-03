import React, {useEffect, useContext} from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from "@react-navigation/stack";


import Login from './Login';
import Register from './Register';
import { clearToken, getToken } from '@/utils/localstorage';
import { SocketContext } from '@/context/socketContext';

const Stack = createStackNavigator();

export default function AuthenLayout({...props}) {
  const {navigation, route} = props;

  const {                
    setUserToken,
    setIsUserOff,
  } = useContext(SocketContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if(token){
        setUserToken(token);
      }      
      
      await clearToken();
      setUserToken(token);
    }
    checkToken();
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
            name="login" component={Login}
            initialParams={route}
        />
        <Stack.Screen 
            name="register" component={Register}
            initialParams={route}
        />
    </Stack.Navigator>
  );
}
