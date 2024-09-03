import { useState, useEffect } from "react";
import { 
    Image, 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView, 
} from "react-native";

import {TabBarIcon } from '@/components/navigation/TabBarIcon';

import {
    useAddUserRoomMutation,
    useFindAllUserRoomQuery
} from '@/redux/slice/ChatApiSlice'


import { styles } from "@/assets/stylesCustom";
import List from '@/components/listsearch/ListSearch';
import SearchBar from "@/components/searchbar/SearchBar";
import ModalCustom from "@/components/modals/Modal";


const OptionAddUser = ({...props}) => {
    const {navigation, roomId} = props;

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const [addUserRoom, setAddUserRoom] = useState(null);
    const {
        data: userChatList,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch: reFecthGetAllUserChat
    } = useFindAllUserRoomQuery();
    const [updateUserRoom, result] =   useAddUserRoomMutation();
    
    useEffect(() => {
        if(addUserRoom === null) return;
        setModalVisible(true)

    }, [addUserRoom]);

    const handleSubmit = async () => {
        const data = {
            roomId: roomId,
            userId: addUserRoom?.id
        };
        
        await updateUserRoom(data).unwrap();
        setAddUserRoom(null);        
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
                <Text style={{color: 'white', fontSize: 18}}>Xác nhận thêm</Text>
            </View>
            <View style={{padding: 20}}>
                <Text style={{color: 'white', fontSize: 18}}> Thêm 
                    <Text style={{textTransform: 'capitalize'}}> {addUserRoom?.name} </Text>
                vào nhóm</Text>
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
                   onPress={() => setModalVisible(false)}
                >
                    <Text  style={{color: 'white', fontSize: 18}}> Close</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
    
    return (
        <View style={styles.centeredView}>
            {addUserRoom && 
                <ModalCustom 
                    children={childrenModal}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    data={addUserRoom}
                    onOk = {handleSubmit}
                />
            }
            <View style={[styles.modalView, {width: '90%', height: '80%', backgroundColor: '#1E1E1E'}]}>
                <Text style={{fontSize: 22, fontWeight: 500, color: 'white'}}>
                    Thêm thành viên
                </Text>
                <TouchableOpacity 
                    onPress={() =>  props.setModalVisible(false)}
                    style={[styles.ChatHeader_icon, {left: 25, top: 25, zIndex: 1}]}

                >
                    <TabBarIcon name={'chevron-back'} color={"white"}/>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <SafeAreaView style={style.root}>
                        <SearchBar
                            searchPhrase={searchPhrase}
                            setSearchPhrase={setSearchPhrase}
                            clicked={clicked}
                            setClicked={setClicked}
                        />
                        <List
                            searchPhrase={searchPhrase}
                            data={userChatList}
                            setClicked={setClicked}
                            addUserRoom={addUserRoom}
                            setAddUserRoom={setAddUserRoom}
                        />
                    </SafeAreaView>
                </View>
            </View>
        </View>
    )
}

export default OptionAddUser;

const style = StyleSheet.create({
    input: {
        backgroundColor: "rgba(50, 50, 50, 0.8)",
        color: "white",
        width: '100%',
        height: 45,
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 50,
        paddingLeft: 18,
        alignSelf: 'center'
    },
    root: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
    },

})