import { useState, useEffect } from "react";
import {View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import {TabBarIcon } from '@/components/navigation/TabBarIcon';
import { styles } from "@/assets/stylesCustom";

import List from '@/components/listsearch/ListSearch';
import SearchBar from "@/components/searchbar/SearchBar";
import ModalCustom from "@/components/modals/Modal";

import {
    useFindAllUserRoomQuery,
    useCreateRoomChatMutation,
} from '@/redux/slice/ChatApiSlice';

const initialState = {
    members: [],
}

const RoomChat = ({...props}) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [addUserRoom, setAddUserRoom] = useState([]);
    const [formData, setFormData] = useState(initialState);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');

    const [createRoom, createRoomResult] = useCreateRoomChatMutation();
    const {
        data: userChatList,
        refetch: reFecthGetAllUserChat
    } = useFindAllUserRoomQuery();
    
    useEffect(() => {
        const ids = addUserRoom.map(data => data.id);
        setFormData({...formData, members: ids});
    }, [addUserRoom]);

    useEffect(() => {
        if(createRoomResult.error){
            if(addUserRoom === null) return;
            setModalVisible(true)
            createRoomResult.error && setResponseStatus(createRoomResult?.error.data) 

        }
        if(createRoomResult.isSuccess){
            setModalVisible(true);
            setResponseStatus('Tạo phòng thành công');
            setFormData(initialState);
            setAddUserRoom([]);
        }


    }, [createRoomResult]);

    const render = (
        <View style={{flexDirection: 'row'}}>
        {
            addUserRoom.map((data,i) => {
            return (
                <Text key={i} style={{
                    color: 'white',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    marginHorizontal: 2,
                }}>{data?.name}</Text>

            )
            })}
        </View>
    )
    const handleSubmit = async () => {
        await createRoom(formData);
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
                <Text style={{color: 'white', fontSize: 18}}>Thông báo</Text>
            </View>
            <View style={{padding: 20}}>
                <Text style={{color: 'white', fontSize: 18}}> 
                     {responseStatus} 
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 25,  
                borderTopWidth: 1,
                borderTopColor: "#495057",}}>

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
        <View style={{
            paddingTop: 35,
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'black'
        }}>
            <ModalCustom 
                children={childrenModal}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                data={addUserRoom}
                onOk = {handleSubmit}
            />
            <View>
                <SafeAreaView style={style.root}>
                    {render}
                    <SearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        clicked={clicked}
                        setClicked={setClicked}
                    />
                    <List
                        checkbox={true}
                        searchPhrase={searchPhrase}
                        data={userChatList}
                        setClicked={setClicked}
                        addUserRoom={addUserRoom}
                        setAddUserRoom={setAddUserRoom}
                    />
                    {
                        addUserRoom.length >= 2 ? (
                            <TouchableOpacity
                            style={{
                                backgroundColor: "green",
                                justifyContent: 'center',
                                padding: 10,
                                marginVertical: 20,
                                paddingVertical: 10,
                                width: '100%'
                            }}
                            onPress={handleSubmit}
                        >
                            <Text  style={styles.appButtonText}>Submit</Text>
                        </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                            style={{
                                backgroundColor: "grey",
                                justifyContent: 'center',
                                padding: 10,
                                marginVertical: 20,
                                paddingVertical: 10,
                                width: '100%'
                            }}
                            disabled={true}
                        >
                            <Text  style={styles.appButtonText}>Submit</Text>
                            </TouchableOpacity>
                        )
                    }

                </SafeAreaView>
            </View>
        </View>
    )
}

export default RoomChat;

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