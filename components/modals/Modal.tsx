import { useState, useEffect } from 'react';
import { 
    Modal,
} from 'react-native';
import {  
    Text, 
    View, 
    TouchableOpacity, 
} from "react-native";

const ModalCustom = ({...props}) => {
    const {children, setModalVisible, modalVisible, data, onOk} = props;
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            {children} 
        </Modal>
    )
}

export default ModalCustom;