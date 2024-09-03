import { User } from "@/model/userModel"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseUrl} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from "socket.io-client";

import { getToken } from "../../utils/localstorage";

export const UserApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl,

        prepareHeaders: async (header) => {
            const token = await getToken()
            header.set('Content-Type', 'application/json');
            if(token){
                header.set('Authorization', `${token}`)
            }
        },    
    }),
    endpoints: build => ({
        register: build.mutation<User, User>({
            query(body){
                return  {
                    url: 'auth/register',
                    method: 'POST',
                    body
                }
            }
        }),
        login: build.mutation<User, User>({
            query(body){
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body
                }
            },

        }),
        getAllUser: build.query<User[], void>({
            query: () => 'auth/users'
        }),
        getUser: build.query<User, void>({
            query: () => 'auth/getUserId'
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetAllUserQuery,
    useGetUserQuery,
} = UserApiSlice