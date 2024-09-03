import { Todo } from "@/model/todoModel"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {baseUrl} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getToken } from "../../utils/localstorage";

export const TodoApiSlice = createApi({
    reducerPath: "todoApi", //ten field cua redux state 
    tagTypes: ['Todos', 'itemTodo'], // nhung kieu tag cho phep dung trong todoApi
    keepUnusedDataFor: 30, // setup time caching theo giay
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (header) => {
            const token = await getToken();
        
            header.set('Content-Type', 'application/json');
            if(token){
                header.set('Authorization', `${token}`)
            }
        },    
        
    }),
    endpoints: build => ({
        
        //query dung cho get, return ve mot object de handle value
        //mutation dung cho post, put, delete, return ve mot array de handle value

        //Generic type theo thu tu la kieu du lieu tra ve va argument
        getTodoList: build.query<Todo[], void>({
            query: () => 'todos/getAll',
            /**
             * providsTags co the la array hoac callback return array
             * Neu co bat ky mot invalidatesTag nao match voi providesTag nay
             * thi se lam cho getTodoList chay lai
             * va cap nhat lai danh sach cac todos
             */
            providesTags(result){

                /**
                 * Callback return mang final:
                 *  final: {
                 *    type: "Todos",         *type phai giong tagTypes khai bao o tren
                 *    id: string
                 * }[]
                 * 
                 * them * as const * vao de khai bao type la Read Only, khong the mutate
                 * neu bo as const khi di chuot vao final se thay khac
                 */
                if(result){
                    const final = [
                        ...result.map(({id}) => ({type: 'Todos' as const, id})), 
                        {type: 'Todos' as const, id: 'LIST'}
                    ]
                    return final;
                }
                const final = [{type: 'Todos' as const, id: 'LIST'}]
                return final;
            }

        }),
        addTodo: build.mutation<Todo, Todo>({
            query(body) {
                return  {
                    url: 'todos/create',
                    method: 'POST',
                    body
                }
            },
            /**
             *  invalidatesTags cung cap cac tag de bao hieu cho nhung method nao co providesTags
             *  match voi no se bi goi lai
             */
            invalidatesTags: (result, error, body) => [{type: 'Todos', id: 'LIST'}]
        }),
        getTodoIdItem: build.query<Todo, number>({
            query: (id) => `todos/getTodo/${id}`,
            providesTags(result){
                const final = [{type: 'itemTodo' as const, id: result?.id}]
                return final;
            }
        }),
        updateTodo: build.mutation<string, Todo>({
            query(body){
                return{
                    url: `/todos/update`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Todos', id: body.id},{type: 'itemTodo', id: body.id}],

        }),
        updateStatusTodo: build.mutation<Todo, Todo>({
            query(body){
                return{
                    url: '/todos/updateStatus',
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Todos', id: body.id}],
        }),
        deleteTodo: build.mutation<Todo, number>({
            query(id){
                return{
                    url: `/todos/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, body) => [{type: 'Todos', id: body}],
        })
    })


})

export const { 
    useGetTodoListQuery,
    useAddTodoMutation, 
    useGetTodoIdItemQuery, 
    useUpdateTodoMutation, 
    useUpdateStatusTodoMutation,
    useDeleteTodoMutation
}  = TodoApiSlice;