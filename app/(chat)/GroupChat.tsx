import { Image, Text, View, TouchableOpacity, StyleSheet, Dimensions  } from "react-native";
import { styles } from "@/assets/stylesCustom";
import { useState, useEffect } from "react";
import moment from 'moment'
import { TabBarIconAntDesign, TabBarIconFontAwesome, TabBarIconMaterialIcons, TabBarIcon } from '@/components/navigation/TabBarIcon';



import {
    imageDefault
  } from "@/constants/constant"
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  useGetAllUserRoomChatQuery,
  useSendMessageRoomMutation
} from "@/redux/slice/ChatApiSlice";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const initialState = {
  text: '',
  userId: null,
  roomId: null,
}


const GroupChat = ({...props}) => {
  const {navigation, route} = props;
  const item = route.params.params.data;

  const [formData, setFormData] = useState(initialState);
  const {data: listUserChat} = useGetAllUserRoomChatQuery(item.id)
  const [sendMessage, sendMessageResult] = useSendMessageRoomMutation();
  
  const handleInput = (value:any, name:string) => {
    setFormData({...formData, text: value, roomId: item.id});
  }

  const handleSendMessage = async () => {
    if(formData.text.replace(/\s/g, '').length){
      const data = await sendMessage(formData);
      setFormData(initialState);    
    }
  }

  const renderItem = ({...data}) => {
    const items = data.item;   
      
    return (
      items && items.MessageRecipient.map((data: any, i:number) => {
          return (
          <View
            key={i}
            style={data.Message.UserId !== item.RoomChats[0].RoomChat.UserId ? [chatStyle.message, chatStyle.message_self_start] : [chatStyle.message, chatStyle.message_self_end]}
          >
              <Text style={data.Message.UserId !== item.RoomChats[0].RoomChat.UserId ? [chatStyle.userSend] : [{display: 'none'}]}> {data.Message.User.name}</Text>
              <View>
                  <Text style={chatStyle.message_text}>{data.Message.text}</Text>
                  <Text style={data.Message.UserId === item.id ? [chatStyle.message_footer, {color: 'white'}] 
                  : [chatStyle.message_footer]}>{moment(data.Message.createdAt).calendar()}</Text>
              </View>
          </View>
          )
        })
        

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

          <TouchableOpacity 
            onPress={() => navigation.navigate('(chat)', {data: item, screen: 'options'})}
            style={{flexDirection: 'row'}}
          >
            <View style={[chatStyle.image, {alignSelf: 'center'}]}>
                {item.image !== null ? (
                  <Image source={{uri: item.image}} style={chatStyle.image}/>
                ) : (
                  <TabBarIconFontAwesome name={'group'} color={"white"}/>
                )}
                <Text style={styles.userOnline}></Text>
            </View>
            <Text style={chatStyle.ChatHeader_user}>{item.name}
              <TabBarIconMaterialIcons name="arrow-drop-down" color={'white'} style={{position: 'absolute', right: -35}}/>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={chatStyle.bodyContainer}>
          <FlatList 
              data={listUserChat}
              renderItem={renderItem}
              
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


export default GroupChat;

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
    marginTop: 35
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
  },
  userSend: {
    position: 'absolute',
    top: -25,
    left: 8,
    color:'white',
    fontSize: 15,
    textTransform: 'capitalize',
  },


  icon_options:{
    padding: 15, fontSize: 22
  },
  text_options:{
    fontSize: 22,
    color: "white",
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 10,
  }
})