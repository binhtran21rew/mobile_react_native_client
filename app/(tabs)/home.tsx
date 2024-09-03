import { useReducer, useState, useContext, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Button, Text, TextInput, View, TouchableOpacity, FlatList, Image, StyleSheet, Platform, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from "@/assets/stylesCustom";
import { TabBarIconAntDesign, TabBarIconFontAwesome } from '@/components/navigation/TabBarIcon';
import { SocketContext } from '@/context/socketContext';

import {
  useGetAllUserQuery
} from "@/redux/slice/UserApiSlice"
import {
  useGetAllRoomChatQuery,
} from "@/redux/slice/ChatApiSlice";

import {
  imageDefault,
  iamgeGroupDefault
} from "@/constants/constant"


export default function HomeScreen({...props}) {
    const {                
      onlineUser,
      updateCurrentChat,
      currentChat,
      setIsUserOff,
    } = useContext(SocketContext);    
  
    const {navigation, route} = props;
    const {data: groupChatList, refetch: reFecthGetAllRoomChat} = useGetAllRoomChatQuery();  


    const {
      data: userChatList,
      isLoading,
      isSuccess,
      isError,
      error,
      refetch: reFecthGetAllUserChat
    } = useGetAllUserQuery();
    

    useEffect(() => {
      const refetchData = () => {
        reFecthGetAllUserChat();
        reFecthGetAllRoomChat()
        // updateCurrentChat(null);
      }

      refetchData();

    }, []);
    
    const renderItemUser = ({...data}) => {
      const item = data.item;
      
      return (
        <View>
          <TouchableOpacity 
            style={{flexDirection: 'row', padding: 15}}
            onPress={() => navigation.navigate('(chat)', {data: item, screen: 'userChat'})}
          >
            <View  style={[homeStyle.image, { alignSelf: 'center'}]}>
              <Image source={{uri: item.image !== null ? item.image : imageDefault}} style={homeStyle.image}/>

              {
                onlineUser?.some((user:any) => user.userId === item.id) ? (
                  <Text style={styles.userOnline}></Text>
                ) :  <Text></Text>
              }


            </View>
            <Text style={homeStyle.ListUser}>{item.name}</Text>
          </TouchableOpacity>
        </View>
    )}
    const renderItemGroup = ({...data}) => {
      const item = data.item;
    
      return (
        <View>
          <TouchableOpacity 
            style={{flexDirection: 'row', padding: 15}}
            onPress={() => navigation.navigate('(chat)', {data: item, screen: 'groupChat'})}
          >
            <View  style={[homeStyle.image, { alignSelf: 'center'}]}>
              {item.image !== null ? (
                <Image source={{uri: item.image}} style={homeStyle.image}/>
              ) : (
                <TabBarIconFontAwesome name={'group'} color={"white"}/>
              )}
              <Text style={styles.userOnline}></Text>

            </View>
            <Text style={homeStyle.ListUser}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (

    <View  style={styles.container}>
      <FlatList 
        data={userChatList}
        renderItem={renderItemUser}
      />
      <FlatList 
        data={groupChatList}
        renderItem={renderItemGroup}
      />

    </View>
  );
}

const homeStyle = StyleSheet.create({
  image:{
    width: 46, height: 46
  },
  ListUser: {
    color: 'white', fontSize: 20, alignSelf: 'center', margin: 15
  },
  ChatHeader_icon:{
    position: 'absolute',
    right: 25,
    top: -25,
  }
})

