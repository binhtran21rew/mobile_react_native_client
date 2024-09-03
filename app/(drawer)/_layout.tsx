import { useContext, useEffect } from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Image, Text} from 'react-native'
import { TabBarIconAntDesign, TabBarIcon} from '@/components/navigation/TabBarIcon';

import { SocketContext } from '@/context/socketContext';
const Drawer = createDrawerNavigator()

import HomeScreen from '@/app/(tabs)/home';
import RoomChat from './RoomChat';

import {
    useGetUserQuery
} from '@/redux/slice/UserApiSlice';
import {
    imageDefault,
  } from "@/constants/constant"

const DrawerNavigator = ({...props}) => {
    const {navigation, route} = props;

    const {data: infoUser, refetch} = useGetUserQuery();
    
    useEffect(() => {
        refetch();
    }, []);
    const {                
        setIsUserOff,
    } = useContext(SocketContext);  

    const handleLogOut = async () => {
        setIsUserOff(true);
        navigation.replace('(authen)');
    }
    return (
        <View style={{flex: 1}}>
            <Drawer.Navigator 
                initialRouteName='Đoạn chat'
                screenOptions={{
                    drawerLabelStyle: {
                        color: 'white', 
                        fontSize: 18,
                    },
                    drawerActiveBackgroundColor: 'rgba(215, 212, 213, 0.12)',
                    drawerStyle: {backgroundColor: 'black'}
                }}
                drawerContent={
                    (props) => {
                        return (
                            <SafeAreaView style={{
                                flex: 1
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingBottom: 12,
                                    borderBottomWidth: 0.2,
                                    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                    marginBottom: 22
                                }}>
                                    <Image 
                                        source={{uri: infoUser?.image !== null ? infoUser?.image : imageDefault}} 
                                        style={{ width: 60, height: 60, marginBottom: 22}}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}
                                    >   
                                        {infoUser?.name}
                                    </Text>
                                </View>
                                <DrawerItemList {...props}/>
                                <View
                                    style={{
                                        marginTop: 'auto', 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderTopWidth: 0.2,
                                        borderTopColor: 'rgba(255, 255, 255, 0.5)',
                                    }}
                                >
                                    <TouchableOpacity 
                                        onPress={handleLogOut}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 15
                                        }}
                                    >
                                        <TabBarIconAntDesign name={'logout'} color={"white"} style ={{marginRight: 18}}/>
                                        <Text style={{fontSize: 18, color: 'white'}}>Logout </Text>
                                    </TouchableOpacity>
                                </View>
                            </SafeAreaView>
                        )
                    }
                }
            >
                <Drawer.Screen 
                    name="Đoạn chat" 
                    component={ HomeScreen } 
                    options={{
                        drawerLabel: 'Đoạn chat',
                        drawerIcon: () => (
                            <TabBarIcon name="chatbubble-ellipses-outline" color={'white'}/>
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="Tạo room chat" 
                    component={ RoomChat } 
                    options={{
                        drawerLabel: 'Tạo room chat',
                        drawerIcon: () => (
                            <TabBarIconAntDesign name="addusergroup" color={'white'}/>
                        ),
                    }}
                />
            </Drawer.Navigator>
        </View>
    )
}

export default DrawerNavigator;
