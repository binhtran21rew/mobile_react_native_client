import { useState, useEffect } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView,
StatusBar,  } from "react-native";

import { styles } from "@/assets/stylesCustom";

import { TabBarIconAntDesign, TabBarIconFontAwesome, TabBarIconMaterialIcons, TabBarIcon } from '@/components/navigation/TabBarIcon';
import {
    useGetInfoRoomQuery,
    useLogoutRoomChatMutation
} from '@/redux/slice/ChatApiSlice';
import {
    optionContent
} from '@/components/content/Content';

import OptionsModals from '@/components/modals/OptionModals';
import ModalCustom from "@/components/modals/Modal";


const Options = ({...props}) => {
    const {navigation, route} = props;
    const item = route.params.params.data;
    const { data: infoRoom } = useGetInfoRoomQuery(item.id);
    const [openModal, setOpenModal] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [isLogoutRoom, setIsLogoutRoom] = useState(false);

    const [logoutRoom, result] = useLogoutRoomChatMutation();
    
    const handleModal = (value:any) => {
        setOpenModal(value);
        setModalVisible(!modalVisible);
    }
    
    const handleLogoutRoom = () => {
        setIsLogoutRoom(true)
    }

    const handleSubmit = async () => {
        setIsLogoutRoom(false)
        await logoutRoom(item.id).unwrap();
        navigation.navigate('(tabs)')
    }

    

    const renderRoom = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                {
                    infoRoom && infoRoom.RoomChats.map((item: any, i: number) => {
                        
                        return (
                            <Text key={i} style={[styles.textStyle, {flex: 0}]}> 
                                {item.name}{infoRoom?.RoomChats.length === i+1 ? '' : ', '}
                            </Text>
                        )
                    })
                }
            </View>
        )    
    }
    
    const renderOptions = () => {
        return (
            <View style={{width: '100%', height: '100%', flex: 1}}>
                {
                optionContent.map(item => {
                    return (
                        <View key={item.id} style={{marginTop: 75, flex: 1}}>
            
                            <View style={{marginLeft: 15}}>
                                <Text style={[styles.textStyle, {fontSize: 16, opacity: 0.5}]}>{item.label}</Text>
                            </View>
                            <View style={{backgroundColor: "rgb(20,20,20)", marginTop: 12, borderRadius: 15}}>
                                {
                                    item.options.map((option, i) => {
                                        return (
                                            <View key={i} style={{ flex: 1, padding: 20}}>
                                                <TouchableOpacity
                                                    onPress={option.modals !== null ? (() =>  handleModal(option.modals)) : (() => handleLogoutRoom())}
                                                >
                                                        <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
                                                            <TabBarIconAntDesign name={option.icon} color={'white'} style={{marginRight: 25}}/>
                                                            <Text style={[styles.textStyle, {fontSize: 18}]}>{option.label}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <Text style={{width: '100%', height: 2, backgroundColor: 'white', opacity: 0.1, marginTop: 20}}></Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View> 
                    )
                })
                }
            </View>

        )
    }
    const childrenModal = (
        <View style={{
            width: '70%', 
            height: '25%', 
            backgroundColor: '#212529', 
            margin: 'auto', 
            borderRadius: 15
            }}>
            <View style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#495057",
                padding: 15
            }}>
                <Text style={{color: 'white', fontSize: 18}}>Xác nhận thoát nhóm</Text>
            </View>
            <View style={{padding: 20}}>
                <Text style={{color: 'white', fontSize: 18}}> Bạn sẽ không thể truy cập vào nhóm này nữa </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 25,  
                borderTopWidth: 1,
                borderTopColor: "#495057",}}>

                <TouchableOpacity
                   style={{padding: 12, backgroundColor: '#0d6efd', borderRadius: 8,  marginRight: 10, }}
                   onPress={handleSubmit}
                >
                    <Text  style={{color: 'white', fontSize: 18}}> Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={{padding: 12, backgroundColor: '#6c757d', borderRadius: 8,}}
                   onPress={() => setIsLogoutRoom(false)}
                >
                    <Text  style={{color: 'white', fontSize: 18}}> Close</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
    return (
        <SafeAreaView style={style.container}>
                <ModalCustom 
                    children={childrenModal}
                    setModalVisible={setIsLogoutRoom}
                    modalVisible={isLogoutRoom}
                />
            <OptionsModals type={openModal} isOpen={modalVisible} navigation={navigation} roomId={infoRoom?.id}/>

            <ScrollView style={style.scrollView}>
                <View style={{flex: 1, marginTop: 25}}>
                    <View
                        style={styles.ChatHeader_icon}
                    >
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                        >
                            <TabBarIcon name={'chevron-back'} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[style.image, {alignSelf: 'center'}]}>
                        {item.image !== null ? (
                        <Image source={{uri: item.image}} style={style.image}/>
                        ) : (
                        <TabBarIconFontAwesome name={'group'} color={"white"} style={{fontSize: 48}}/>
                        )}
                        <Text style={styles.userOnline}></Text>
                    </View>
                        {renderRoom()}

                        {renderOptions()}
 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Options;


const style = StyleSheet.create({
    text: {
        fontSize: 42,
        color: 'white'
    },
    image:{
        width: 58, height: 58
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'black',
        marginHorizontal: 20,
    },

});