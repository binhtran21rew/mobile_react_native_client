import React, { useEffect, useRef } from "react";
import {TouchableOpacity, Text, View, StyleSheet, Animated} from 'react-native';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
const CheckBox = ({...props}) => {
    const {item, onPress, listChecked, containerStyle, textStyle, checkBoxStyle} = props;
    
    const animateWidth = useRef(new Animated.Value(0)).current;
    const startAnimation = () => {
        const tovalue = listChecked.find((data:any) => data.id === item.id)  ? 0 : 30;
        Animated.timing(animateWidth, {
            toValue: tovalue,
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    



    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity 
                onPress={() => {
                    // startAnimation();
                    onPress();
                }}
                style={[styles.checkbox_wrapper]}
                >
                <View style={[styles.checkbox, listChecked.map((data:any) => data.id === item.id ? [styles.checkboxSelected, checkBoxStyle] : [])]}>
                    {/* <Animated.View style={{width: animateWidth}}>
                        <TabBarIcon name="checkmark" color={'white'}/>
                    </Animated.View> */}
                </View>
                <Text style={[styles.checkboxText, textStyle]}>{item?.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox_wrapper: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
    },
    checkbox:{
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 50,
        width: 30, height: 30,
    },
    checkboxSelected: {
        backgroundColor: 'green'
    },
    checkboxText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10
    }
});