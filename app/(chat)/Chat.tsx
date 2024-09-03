import { useState, useEffect, useContext, useCallback } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet, Dimensions, RefreshControl  } from "react-native";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { styles } from "@/assets/stylesCustom";
import moment from 'moment'

import { SocketContext } from '@/context/socketContext';
import {
    imageDefault
  } from "@/constants/constant"
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  useGetAllUserChatQuery,
  useSendMessageUserMutation,
} from "@/redux/slice/ChatApiSlice";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const initialState = {
  text: '',
  members: [],
  userId: null
}

const Chat = ({...props}) => {
    const {navigation, route} = props;
    const item = route.params.params.data;
    const {                
      onlineUser,
      updateSendMessage,
      newMessage,
      message,
      setMessage,
      updateCurrentChat
    } = useContext(SocketContext);

    

    const {data: chatList, refetch} = useGetAllUserChatQuery(item.id);
    const [sendMessage, sendMessageResult] = useSendMessageUserMutation();
    const [formData, setFormData] = useState(initialState);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
      updateCurrentChat(item)
      setMessage(chatList);
    }, []);


    const handleInput = (value:any, name:string) => {
      setFormData({...formData, text: value, members: [item.id]})
      
    }
    
    const handleSendMessage = async () => {
      if(formData.text.replace(/\s/g, '').length){
        const data = await sendMessage(formData);
        setFormData(initialState);    
        updateSendMessage(data.data);
        setMessage((prev) => [...prev, data.data])
      }
    }
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setMessage(chatList);
      refetch();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    
    const renderItem = ({...data}) => {
      const items = data.item;   

        return (
          <View
            style={items.UserId === item.id ? [chatStyle.message, chatStyle.message_self_start] : [chatStyle.message, chatStyle.message_self_end]}
          >
              <View>
                  <Text style={chatStyle.message_text}>{items.text}</Text>
                  <Text style={items.UserId === item.id ? [chatStyle.message_footer, {color: 'white'}] 
                  : [chatStyle.message_footer]}>{moment(items.createdAt).calendar()}</Text>
              </View>

          </View>
        )
    }
    return (
        <View style={chatStyle.bodyContainer}>
            <View style={chatStyle.ChatHeader}>
                <View
                    style={chatStyle.ChatHeader_icon}
                >
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                    >
                        <TabBarIcon name={'chevron-back'} color={"white"}/>
                    </TouchableOpacity>

                </View>
                <View style={[chatStyle.image, {alignSelf: 'center'}]}>
                    <Image source={{uri: item.image !== null ? item.image : imageDefault}} style={chatStyle.image}/>
                  {
                    onlineUser?.some((user:any) => user.userId === item.id) ? (
                      <Text style={styles.userOnline}></Text>
                    ) :  <Text></Text>
                  }
                </View>
                <Text style={chatStyle.ChatHeader_user}>{item.name}</Text>
            </View>

            <View style={chatStyle.bodyContainer}>
                <FlatList 
                    data={message}
                    renderItem={renderItem}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                <View style={{flexDirection: "row"}}>
                    <TextInput 
                      value={formData.text}
                      placeholder='Enter message...'
                      style={{
                          flex: 1, 
                          backgroundColor: "rgba(72, 112, 223, 1)",
                          color: "white",
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          paddingLeft: 18,
                          alignSelf: 'center'

                      }}
                      onChangeText={(value) => handleInput(value, 'text')}
                    />
                    <TouchableOpacity
                      onPress={handleSendMessage}
                    >
                        <TabBarIcon name={'send'} color={"white"} style={{
                            alignSelf: 'center',
                            marginLeft: 10,
                            padding: 10,
                        }}/>
                    </TouchableOpacity>

                </View>

            </View>
            
        </View>
    )
}

export default Chat;


const chatStyle = StyleSheet.create({
    image:{
        width: 37, height: 37
    },
    ChatHeader: {
        flexDirection: 'row', 
        paddingTop: 10,
        paddingLeft: 10,
        marginTop: 30, 
    },
    ChatHeader_icon: {
      alignSelf: 'center', marginRight: 10, padding: 10
    },
    ChatHeader_user: {
      color: 'white', fontSize: 18, textTransform: 'capitalize', alignSelf: 'center', marginLeft: 8
    },
    bodyContainer: {
      flex: 1,
      padding: 15,
      backgroundColor: "black"
    },
    message:{
      color: 'white',
      backgroundColor: "#282828",
      padding: 12,
      borderRadius: 12,
      maxWidth: "50%",
      marginTop: 25
    },
    message_self_end: {
      flex: 1,
      alignSelf: "flex-end",
      backgroundColor: "#00bd9b",
      color: 'white',
    },
    message_self_start: {
      flex: 1,
      alignSelf: 'flex-start',
      backgroundColor: "#303030",
    },
    message_footer:{ 
      fontSize: 12,
      alignSelf: 'flex-end',
      fontWeight: 400,
    },
    message_text:{
      fontSize: 25,
      color: "white",
      fontWeight: "400"
    }
})