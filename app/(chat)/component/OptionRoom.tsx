import { useState, useEffect } from "react";
import { 
    Image, 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    SafeAreaView, 
    ScrollView,
    StatusBar,  
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TabBarIconAntDesign, TabBarIconFontAwesome, TabBarIconMaterialIcons, TabBarIcon } from '@/components/navigation/TabBarIcon';

import {
    useUpdateRoomNameMutation
} from '@/redux/slice/ChatApiSlice'

import { styles } from "@/assets/stylesCustom";


const OptionRoom = ({...props}) => {
    const {navigation, roomId} = props;

    const [roomInput, setRoomInput] = useState('');
    const [updateRoomName, result] =  useUpdateRoomNameMutation();

    const handleSubmit = async () => {
        const data = {
            id: roomId,
            name: roomInput
        };
        await updateRoomName(data).unwrap();
        setRoomInput('');        
        
    }
    
    return (
        <View style={styles.centeredView}>
            <View style={[styles.modalView, {width: '80%', height: '35%', backgroundColor: '#1E1E1E'}]}>
                <Text style={{fontSize: 22, fontWeight: 500, color: 'white'}}>
                    Đổi tên nhóm
                </Text>
                <TouchableOpacity 
                    onPress={() =>  props.setModalVisible(false)}
                    style={[styles.ChatHeader_icon, {left: 25, top: 25, zIndex: 1}]}

                >
                    <TabBarIcon name={'chevron-back'} color={"white"}/>
                </TouchableOpacity>
                <View style={[styles.modalViewBody, {width: '80%'}]}>
                    <TextInput 
                        value={roomInput}
                        placeholder='Enter room name'
                        style={style.input}
                        onChangeText={(value) => setRoomInput(value)}
                    />

                    <TouchableOpacity
                        style={{
                            backgroundColor: "green",
                            justifyContent: 'center',
                            padding: 10,
                            width: 100,
                            borderRadius: 25
                        }}
                        onPress={handleSubmit}
                    >
                        <Text  style={styles.appButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OptionRoom;

const style = StyleSheet.create({
    input: {
        backgroundColor: "rgba(50, 50, 59, 1)",
        color: "white",
        width: '100%',
        height: 45,
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 50,
        paddingLeft: 18,
        alignSelf: 'center'
    }

})