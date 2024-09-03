import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from "@react-navigation/stack";

import Chat from './Chat';
import GroupChat from './GroupChat';
import Options from './component/Options';
const Stack = createStackNavigator();

export default function AuthenLayout({...props}) {
  const {navigation, route} = props;
  
  return (

    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
            name="userChat" component={Chat}
            initialParams={route}
        />
        <Stack.Screen 
            name="groupChat" component={GroupChat}
            initialParams={route}
        />
        <Stack.Screen
          name="options" component={Options}
          initialParams={route}
        />
    </Stack.Navigator>
  );
}
