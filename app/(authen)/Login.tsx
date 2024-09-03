import { useReducer, useState, useContext, useEffect } from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, clearToken } from "@/utils/localstorage";
import { styles } from "@/assets/stylesCustom";


import { 
    useLoginMutation,
} from '@/redux/slice/UserApiSlice';
const initialState = {
    name: '',
    email: '',
    password: '',
    image: null
}

const Login = ({...props}) => {
    const {navigation, route} = props;
    const [formData, setFormData] = useState(initialState);


    const [login, loginResult] =  useLoginMutation();
    const [error, setError] = useState('');

    const handleInput = (value:any, name:string) => {
        setFormData({...formData, [name]: value});
    }
    
    const handleSubmit = async () => {
        
        try{
            await AsyncStorage.removeItem('token');

            await login(formData).unwrap();
            setFormData(initialState);
        }catch(e){
            console.log(e);
            
        }
    }

    useEffect(() => {
        const storeData = async () => {
            try{
                
                if(loginResult.isError){

                }
                if(loginResult.isSuccess){
                    const jsonValue = JSON.stringify(loginResult.data);
                    await AsyncStorage.setItem('token', jsonValue);
                    navigation.replace('(tabs)');    
                }
            }catch(e){
            }
        }
        storeData();
    }, [loginResult]);

    return (
        <View style={styles.LoginContainer}>
            <View style={[styles.LoginBody, {backgroundColor: 'white'}]}>
                <Text style={{fontSize: 25}}>Login</Text>
                <View style={styles.LoginBody}>
                    <Text style={[styles.textStyle, {color: 'black', fontSize: 18}]}>Email</Text>
                    <TextInput 
                        value={formData.email}
                        style={styles.modalTextInput}
                        onChangeText={(value) => 
                            handleInput(value, 'email')
                        }
                    />
                    <Text style={styles.FormError}>
                        {/* {loginResult.error && loginResult?.error.data.includes("Email") && loginResult.error.data} */}
                    </Text>
                </View>

                <View style={styles.LoginBody}>
                    <Text style={[styles.textStyle, {color: 'black', fontSize: 18}]}>Password</Text>
                    <TextInput 
                        value={formData.password}
                        style={styles.modalTextInput}
                        onChangeText={(value) => 
                            handleInput(value, 'password')
                        }
                    />
                    <Text style={styles.FormError}>
                        {/* {loginResult.error && loginResult?.error.data.includes("Password") && loginResult.error.data} */}
                    </Text>
                </View>
                

                <TouchableOpacity 
                    style={[styles.modalButtonInput, {margin: 10, width: '50%'}]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.appButtonText}>login</Text>

                </TouchableOpacity>
                <Text 
                    onPress={() => {
                        navigation.navigate('register')
                    }}
                >Register here</Text>
            </View>
        </View>
    )
}

export default Login