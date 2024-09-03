import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";


import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import {SocketContextProvider} from '@/context/socketContext';

import TabLayout from './(tabs)/_layout';
import AuthenLayout from './(authen)/_layouts';
import ChatLayout from './(chat)/_layout'
import DrawerNavigator from '@/app/(drawer)/_layout';
import { getToken, clearToken } from "@/utils/localstorage";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack= createStackNavigator();
export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SocketContextProvider>
      <Provider store={store}>
          <NavigationContainer independent={true}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack.Navigator>
                
                <Stack.Screen name="(authen)"  options={{ headerShown: false }} component={AuthenLayout}/>
                
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} component={TabLayout}/>
                <Stack.Screen name="(chat)" options={{ headerShown: false }} component={ChatLayout}/>
              </Stack.Navigator>

            </ThemeProvider>
          </NavigationContainer>
      </Provider>

    </SocketContextProvider>


  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})





