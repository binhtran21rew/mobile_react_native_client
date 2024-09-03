import React, {useEffect, useContext} from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, View, StatusBar, StyleSheet, Text } from 'react-native'

import HomeScreen from './home';
import TodoApp from './todoApp';
import { getToken } from '@/utils/localstorage';
import { SocketContext } from '@/context/socketContext';

import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();

import DrawerNavigator from '@/app/(drawer)/_layout';


export default function TabLayout({...props}) {
  const colorScheme = useColorScheme();

  const {navigation, route} = props;
  const {                
    setUserToken
  } = useContext(SocketContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setUserToken(token);
      if(!token){
        navigation.navigate('(auth)');
      }
    }
    checkToken();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={DrawerNavigator}
        initialParams={route}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="todo"
        component={TodoApp}
        initialParams={route}
        options={{
          title: 'Todo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

