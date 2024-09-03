import { useReducer, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    FlatList, 
    TouchableOpacity, 
    Modal,
    Pressable,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import { styles } from '../../assets/stylesCustom';


import { Todo } from '@/model/todoModel';
import { 
    addTodo,
    removeTodo,
    changeTodoStatus,
    updateTodo,
    startEditTodo, 
    endEditTodo
} from '@/hooks/todoSlice';
import { 
    useGetTodoListQuery,
    useAddTodoMutation,
    useUpdateStatusTodoMutation,
    useDeleteTodoMutation
} from '@/redux/slice/TodoApiSlice';
import TodoItemModel from '@/components/modals/TodoItemModal';



const initialState = {
    text: '',
    date: '',
    status: false,
}

export default function TodoApp({...props}) {
    const {navigation, route} = props;

    const todoList = useSelector((state:RootState ) => state.todo.todos);

    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(initialState);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);


    // RTK query =================================================
    // query: return ve mot object
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetTodoListQuery();
    // mutation: return mot array (function, object)

    const [addTodo, addTodoResult] = useAddTodoMutation();
    const [updateStatusTodo, updateStatusTodoResult] = useUpdateStatusTodoMutation();
    const [deleteTodo, deleteTodoResult] = useDeleteTodoMutation();
    // ==============================================================

    // show form edit todo ===========================================
    useEffect(() => {
        const refetchData = () => {
            refetch();
        }

        refetchData();
    }, []);
    
    
    const startEdit = (id: number) => {
        dispatch(startEditTodo(id));
    }

    //================================================================

    const handleInputTodo = (value:any, name:string) => {
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async () => {
        if(data && formData.text !== '' && formData.date !== ''){
            const formTodo = {...formData, id: data.length +1};
            await addTodo(formTodo).unwrap();
            setFormData(initialState);
        }
    }
    
    const handleChangeStatus = async (id : number, status: boolean) => {
        const dataUpdate = {...formData, id, status: !status}
        await updateStatusTodo(dataUpdate).unwrap(); 
    }

    const handleClearItem = async (id : number) => {
        await deleteTodo(id).unwrap();
    }


    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChangeDatePicker = ({type}, selectDate) => {
        if(type === "set"){
            const currentDate = selectDate;
            const momenDate = moment(currentDate).format("YYYY-MM-DD")
            setDate(currentDate);
            if(Platform.OS === "android"){
                toggleDatePicker();
                setFormData({...formData, date: momenDate});
            }
        }else{
            toggleDatePicker();
        }
    }

    const handlePickerIos = () => {
        const momenDate = moment(date).format("YYYY-MM-DD")
        setFormData({...formData, date: momenDate});
        toggleDatePicker();
    }

    const renderItem = ({...data}) => {
        const item = data.item;
        return (
            <View style={styles.listItem}>

                <View style={styles.listTitleItem}>
                    <TouchableOpacity 
                        style={styles.appButtonTextContainer}
                        onPress={() => startEdit(item.id)}
                    >
                        <Text style={styles.textItemStyle_10fz}>Date: {moment(item.date).format("YYYY-MM-DD")}</Text>
                        <Text style={styles.textStyle}>{item.text}</Text>

                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={() => handleChangeStatus(item.id, item.status)}
                        style={[styles.appButtonContainer, {backgroundColor: item.status ? 'green' : 'white'}]}
                    >
                        <Text style={[styles.appButtonText, {color: item.status ? 'white' : 'red'}]}>{item.status ? 'Complete' : 'UnComplete'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => handleClearItem(item.id)}
                        style={styles.appButtonContainer}
                    >
                        <Text style={styles.appButtonText}>Clear</Text>

                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput 
                    value={formData.text}
                    placeholder='Enter your todo...'
                    style={styles.textInput}
                    onChangeText={(value) => handleInputTodo(value, 'text')}
                    // onChangeText={(value) => 
                    //     dispatch(actionReducer.setTodoInput(value, 'text'))
                    // }
                />
                {!showPicker &&( <Pressable
                    onPress={toggleDatePicker}
                    style={styles.textInput}

                >
                    <TextInput 
                        value={formData.date.toString()}
                        placeholder='Enter date...'
                        style={{color: 'white'}}
                        // onChangeText={(value) => handleInputTodo(value, 'date')}
                        // onChangeText={(value) => 
                        //     dispatch(actionReducer.setTodoInput(value, 'date'))
                        // }
                        editable={false}
                        onPressIn={toggleDatePicker}
                    />


                </Pressable>)}
                {showPicker && (
                    <DateTimePicker 
                        mode="date"
                        display='spinner'
                        value={date}
                        onChange={onChangeDatePicker}
                        style={{
                            height: 100,
                            marginTop: -25,
                            flex: 3
                        }}
                    />
                )}
                {
                    showPicker && Platform.OS === 'ios' && (
                        <View
                            style={{
                                    position: "absolute",
                                    bottom: -30,
                                    right: 35,
                                    flexDirection: "row", 
                                    justifyContent: "center",

                                }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "grey",
                                    borderRadius: 10,
                                    padding: 10,
                                    marginTop: 50,
                                    marginRight: 20
                                }}
                                onPress={toggleDatePicker}
                            >
                                <Text  style={{
                                    width: "100%",
                                    color: "black",
                                }}>cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "green",
                                    borderRadius: 10,
                                    padding: 10,
                                    marginTop: 50,
                                    marginRight: 20
                                }}
                                onPress={handlePickerIos}
                            >
                                <Text  style={{
                                    width: "100%",
                                    color: "white",
                                }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            <View style={styles.bodyContainer}>
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "green",
                        justifyContent: 'center',
                        padding: 10,
                    }}
                    onPress={handleSubmit}
                >
                    <Text  style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>

                <TodoItemModel />

            </View>
        </View>
    );
}