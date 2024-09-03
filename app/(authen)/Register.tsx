import { useReducer, useState, useContext, useEffect } from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, } from "react-native"


import { styles } from "@/assets/stylesCustom";
import { 
    useRegisterMutation
} from '@/redux/slice/UserApiSlice';
const initialState = {
    name: '',
    email: '',
    password: '',
    image: null
}

const Register = ({...props}) => {
    const {navigation, route} = props;

    const [formData, setFormData] = useState(initialState);


    const [register, registerResult] =  useRegisterMutation();

    const handleInput = (value:any, name:string) => {
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async () => {
        await register(formData).unwrap();
        setFormData(initialState);
    }
    
    
    return (
        <View style={styles.LoginContainer}>
            <View style={[styles.LoginBody, {backgroundColor: 'white'}]}>
                <Text style={{fontSize: 25}}>Register</Text>
                <View style={styles.LoginBody}>
                    <Text style={[styles.textStyle, {color: 'black', fontSize: 18}]}>Name</Text>
                    <TextInput 
                        value={formData.name}
                        style={styles.modalTextInput}
                        onChangeText={(value) => 
                            handleInput(value, 'name')
                        }
                    />
                </View>

                <View style={styles.LoginBody}>
                    <Text style={[styles.textStyle, {color: 'black', fontSize: 18}]}>Email</Text>
                    <TextInput 
                        value={formData.email}
                        style={styles.modalTextInput}
                        onChangeText={(value) => 
                            handleInput(value, 'email')
                        }
                    />
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
                </View>
                

                <TouchableOpacity 
                    style={[styles.modalButtonInput, {margin: 10, width: '50%'}]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.appButtonText}>Register</Text>

                </TouchableOpacity>
                <Text 
                    onPress={() => {
                        navigation.navigate('login')
                    }}
                >Login here</Text>
            </View>
        </View>
    )
}

export default Register;