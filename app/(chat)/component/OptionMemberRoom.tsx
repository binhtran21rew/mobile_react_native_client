import { useState, useEffect } from "react";
import { 
    Image, 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,  
    SafeAreaView,
    ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TabBarIconAntDesign, TabBarIconFontAwesome, TabBarIconMaterialIcons, TabBarIcon } from '@/components/navigation/TabBarIcon';

import {
    useGetInfoRoomQuery
} from '@/redux/slice/ChatApiSlice';
import { styles } from "@/assets/stylesCustom";
import {
    imageDefault,
    iamgeGroupDefault
  } from "@/constants/constant"

const OptionMemberRoom = ({...props}) => {
    const {navigation, roomId} = props;

    const { data: infoRoom } = useGetInfoRoomQuery(roomId);
    
    const renderRoom = () => {
        return (
            <View style={{marginTop: 10}}>
                {
                    infoRoom && infoRoom.RoomChats.map((item: any, i: number) => {
                        
                        return (
                              <View key={i} style={style.item}>
                                <View  style={[style.image, {margin: 10}]}>
                                    <Image source={{uri: item.image !== null ? item.image : imageDefault}} style={style.image}/>
                                </View>
                                <Text style={style.title}>{item.name}</Text>
                            </View>
                        )
                    })
                }
            </View>

            
        )    
    }
    return (
        <View style={styles.centeredView}>
            <View style={[styles.modalView, {width: '100%', height:'100%', paddingTop: 50, backgroundColor: '#1E1E1E'}]}>
                <Text style={{fontSize: 22, fontWeight: 500, color: 'white'}}>
                   Thành viên nhóm
                </Text>
                <TouchableOpacity 
                    onPress={() =>  props.setModalVisible(false)}
                    style={[styles.ChatHeader_icon, {left: 25, top: 40, zIndex: 1}]}

                >
                    <TabBarIcon name={'chevron-back'} color={"white"}/>
                </TouchableOpacity>

                <View style={{flex: 1, width: '100%', height: '100%', padding: 20}}>     
                    <ScrollView>
                        {renderRoom()}

                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default OptionMemberRoom;

const style = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        margin: 10
    },
    image:{
        width: 46, height: 46
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
        color: "white",
    },

})