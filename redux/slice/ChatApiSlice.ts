import { Chat } from "@/model/chatModel";
import { Room } from '@/model/roomModel';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseUrl} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from "socket.io-client";
import { getToken } from "../../utils/localstorage";



export const ChatApiSlice = createApi({
    reducerPath: 'chatApi',
    tagTypes: ['Chats', 'Room'],
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
        getAllUserChat: build.query<Chat[], number>({
            query: (id) => 'chat/findUserChat/' + id,
            providesTags: (result) => {
                if(result){
                    
                    const final = [
                        ...result.map(({id}) => ({type: 'Chats' as const, 'userId': id})),
                        {type: 'Chats' as const, id: 'LIST'}
                    ]
                    return final;
                }
                const final = [{type: 'Chats' as const, id: 'LIST'}]
                return final;
            }
        }),
        getAllUserRoomChat: build.query<Chat[], number>({
            query: (id) => 'chat/findUserMessageRoom/' + id,
            providesTags: (result) => {
                if(result){

                    const final = [
                        ...result.map(({id}) => ({type: 'Chats' as const, 'roomId': id})),
                        {type: 'Chats' as const, id: 'ROOMLIST'}
                    ]
                    return final;
                }
                const final = [{type: 'Chats' as const, id: 'ROOMLIST'}]
                return final;
            }
        }),
        getAllRoomChat: build.query<[], void>({
            query: () => 'chat/getRoomChats',
            providesTags: (result) => {
                if(result){

                    const final = [
                        ...result.map(({id}) => ({type: 'Room' as const, 'roomId': id})),
                        {type: 'Room' as const, id: 'ROOMLIST'}
                    ]
                    return final;
                }
                const final = [{type: 'Room' as const, id: 'ROOMLIST'}]
                return final;
            }
        }),
        getInfoRoom: build.query<[], number>({
            query: (id) => 'chat/findroomChat/' + id,
            providesTags: (result) => {
                const final = [{type: 'Room' as const, id: 'ROOMLIST'}]
                return final;
            }
        }),
        sendMessageUser: build.mutation<Chat, Omit<Chat, 'id' | 'roomId'>>({
            query(body){
                return {
                    url: 'chat/createMessage',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Chats', id: 'LIST'}]
        }),
        sendMessageRoom: build.mutation<Chat, Omit<Chat, 'id' | 'members'>>({
            query(body){
                return {
                    url: 'chat/sendMessageRoom',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Chats', 'roomId': body.roomId}]
        }),
        updateRoomName: build.mutation<Room, Omit<Room, 'image'>>({
            query(body){
                return {
                    url: 'chat/updateRoomChat',
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Room', 'roomId': body.id}]
        }),
        createRoomChat: build.mutation({
            query(body){
                return {
                    url: 'chat/createRoomMessage',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Room' as const, id: 'ROOMLIST'}]
        }),
        addUserRoom: build.mutation({
            query(body){
                return {
                    url: 'chat/addUserRoom',
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Room', id: 'ROOMLIST'}]
        }),
        findAllUserRoom: build.query<[], void>({
            query: () => 'chat/findAllUserRoom',
            providesTags: (result) => {
                if(result){
                    const final = [
                        ...result.map((item: any) => ({type: 'Room' as const, 'roomId': item.id})),
                        {type: 'Room' as const, id: 'ROOMLIST'}
                    ]
                    return final;
                }
                const final = [{type: 'Room' as const, id: 'ROOMLIST'}]
                return final;
            }
        }),
        logoutRoomChat: build.mutation({
            query(id: number){
                return {
                    url: `chat/userLogoutRoom/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Room', id: 'ROOMLIST'}]
        })
    })
});

export const {
    useGetAllUserChatQuery,
    useSendMessageUserMutation,
    useGetAllRoomChatQuery,
    useGetAllUserRoomChatQuery,
    useSendMessageRoomMutation,
    useGetInfoRoomQuery,
    useUpdateRoomNameMutation,
    useAddUserRoomMutation,
    useFindAllUserRoomQuery,
    useLogoutRoomChatMutation,
    useCreateRoomChatMutation,
} = ChatApiSlice