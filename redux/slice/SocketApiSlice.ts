import { Chat } from "@/model/chatModel";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseUrl} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from "socket.io-client";
import { getToken } from "../../utils/localstorage";
import { createEntityAdapter } from "@reduxjs/toolkit";



export const SocketApiSlice = createApi({
    reducerPath: 'socket',
    baseQuery: fetchBaseQuery({
        baseUrl,   
    }),
    endpoints: build => ({
        getUserOnline: build.query({
            queryFn: () => ({ data: []}),

            async onCacheEntryAdded(arg,{cacheDataLoaded, cacheEntryRemoved, updateCachedData}){
                try{
                    const response = await cacheDataLoaded;
                    const token = await getToken();
                    
                    const socket = io("http://192.168.1.4:4000");
                    
                    socket.emit("addNewUser", token);
                    socket.on("getOnlineUser", (res) => {
                        updateCachedData(draft => {
                            if(draft.length > 0){
                                draft.shift();
                            }
                            draft.push(res);
                        })
                    })

                    await cacheEntryRemoved;
                    socket.off("getOnlineUser");
                }catch {
                    // if cacheEntryRemoved resolves before cacheDataLoaded,
                    // cacheDataLoaded throws an error
                }
            }

        }),
    })
});

export const {
    useGetUserOnlineQuery
} = SocketApiSlice