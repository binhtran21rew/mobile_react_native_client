import { useReducer, useState, useContext, useEffect } from 'react';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Modal,
    Platform,
    Pressable
} from 'react-native';
import {initialState} from '@/constants/ReducerAction'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'


import { styles } from '@/assets/stylesCustom';
import { 
    useGetTodoIdItemQuery,
    useUpdateTodoMutation,
} from '@/redux/slice/TodoApiSlice';
import { 
    endEditTodo
} from '@/hooks/todoSlice';



const TodoItemModel = ({...props}) => {
    const dispatch = useAppDispatch();
    
    const idTodo = useSelector((state:RootState) => state.todo.todoId);
    const [formEdit, setFormEdit] = useState(initialState);
    const [modalVisible, setModalVisible] = useState(false);
    const [idEdit, setIdEdit] = useState(Number);
    const [updateTodo, updateTodoResult] = useUpdateTodoMutation();
    const {
        data:itemTodoUpdate
    } = useGetTodoIdItemQuery(idTodo);

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    

    useEffect(() => {
        
        if(itemTodoUpdate && idTodo > 0 ){
            setModalVisible(true)
            setFormEdit(itemTodoUpdate)
            setIdEdit(itemTodoUpdate.id)
            
        }else{
            setModalVisible(false)
            setFormEdit(initialState)
        }
    }, [itemTodoUpdate, idTodo]);


    const handleFormEdit = (value : any, name: string) => {
        setFormEdit({...formEdit, [name]: value});
    }

    const handleUpdate = async () => {
        const dataUpdate = {...formEdit, id: idEdit}
        await updateTodo(dataUpdate).unwrap();
        dispatch(endEditTodo(0));
    }

    const endEdit = (id: number) => {
        dispatch(endEditTodo(id));
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
                setFormEdit({...formEdit, date: momenDate});
            }
        }else{
            toggleDatePicker();
        }
    }

    const handlePickerIos = () => {
        const momenDate = moment(date).format("YYYY-MM-DD")
        setFormEdit({...formEdit, date: momenDate});
        toggleDatePicker();
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalViewBody}>
                        <Text style={styles.modalText}>Text</Text>
                        <TextInput 
                            value={formEdit.text}
                            placeholder='Enter your todo...'
                            style={styles.modalTextInput}
                            onChangeText={(value) => 
                                handleFormEdit(value, 'text')
                            }
                        />
                        <Text style={styles.modalText}>Date</Text>
                        {/* <TextInput 
                            value={moment(formEdit.date).format("YYYY-MM-DD")}
                            placeholder='Enter date...'
                            style={styles.modalTextInput}

                            onChangeText={(value) => 
                                handleFormEdit(value, 'date')
                            }
                        /> */}
                {!showPicker &&( <Pressable
                    onPress={toggleDatePicker}
                    style={styles.modalTextInput}

                >
                    <TextInput 
                        value={moment(formEdit.date).format("YYYY-MM-DD")}
                        placeholder='Enter date...'
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
                            height: 75,
                            width: '100%',
                            // marginTop: -25,
                            backgroundColor: 'black',
                            opacity: 0.8
                        }}
                    />
                )}
                {
                    showPicker && Platform.OS === 'ios' && (
                        <View
                            style={{
                                    flexDirection: "row", 
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

                        <View style={{flexDirection: 'row'}}> 
                            <TouchableOpacity 
                                onPress={handleUpdate}
                                style={styles.modalButtonInput}
                            >
                                <Text style={styles.appButtonText}>Update</Text>

                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => endEdit(idTodo)}
                                style={[styles.modalButtonInput, {backgroundColor: 'red'}]}
                            >
                                <Text style={styles.appButtonText}>Cancel</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TodoItemModel;