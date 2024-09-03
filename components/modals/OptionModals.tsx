import { useState, useEffect } from 'react';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';


import { styles } from '@/assets/stylesCustom';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Modal,
    Platform,
    Pressable
} from 'react-native';
import {
    CHANGE_ROOM_NAME ,
    ADD_MEMBERS,
    MEMBERS
} from "@/constants/constant";
import OptionRoom from '@/app/(chat)/component/OptionRoom';
import OptionAddUser from '@/app/(chat)/component/OptionAddUser';
import ModalCustom from "@/components/modals/Modal";
import OptionMemberRoom from '@/app/(chat)/component/OptionMemberRoom';

const OptionsModals = ({...props}) => {

    const {type, isOpen, navigation, roomId} = props;
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        setModalVisible(true)
    }, [isOpen]);

    switch (type) {
        case CHANGE_ROOM_NAME: 
            return (
                <ModalCustom  
                children={
                    <OptionRoom setModalVisible={setModalVisible} navigation={navigation} roomId={roomId}/>    
                }
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}

                />
            )
        
        case ADD_MEMBERS:
            return (
                <ModalCustom  
                    children={
                        <OptionAddUser setModalVisible={setModalVisible} navigation={navigation} roomId={roomId}/>
                    }
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}

                    
                />
            )
        
        case MEMBERS: 
            return (
                <ModalCustom  
                children={
                    <OptionMemberRoom setModalVisible={setModalVisible} navigation={navigation} roomId={roomId}/>
                }
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}                
            />
            )
        
        default: 
            break;
        
    }
}

export default OptionsModals;