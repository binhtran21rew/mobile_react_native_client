import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    return await AsyncStorage.getItem('token').then(result => JSON.parse(result));
};

export const clearToken = async () => {
    return await AsyncStorage.removeItem('token');
}
