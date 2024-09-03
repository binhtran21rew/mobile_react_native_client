import { StyleSheet,  Platform} from 'react-native';
import Colors from '../constants/Colors';

export const styles = StyleSheet.create({
    
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 10,
        paddingTop: 50,
        flex: 1,
        backgroundColor: '#000',
    },
    textInput: {
        flex: 1,
        padding: 8,
        marginRight: 10,
        width: "65%",
        color: "white",
        borderWidth: 1,
        borderColor:"red",
        borderRadius: 50
    },
    topContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle:{
        fontSize: 25,
        color: "white",
        flex: 1,
        textTransform: "capitalize",
    },
    textItemStyle_10fz:{
        fontSize: 12,
        color: "white",
        flex: 1,
        textTransform: "capitalize",
    },

    bodyContainer: {
        flex: 6,
        padding: 10,
        marginTop: 50,
        borderTopColor: "red",
        borderTopWidth: 1,
    },
    listItem: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        margin: 5
    },
    listTitleItem: {
        flex: 1,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        marginTop: 10,
    },
    appButtonText: {
        fontSize: 14,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonTextContainer: {
        flex: 1,    
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 35,
        paddingBottom: 35,
        width: '90%',
        height: '65%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    modalViewBody: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 20
    },
    textStyleModal: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    modalTextInput: {
        padding: 8,
        marginRight: 10,
        width: "65%",
        color: "black",
        borderWidth: 1,
        borderColor:"black",
        borderRadius: 50
    },
    modalButtonInput: {
        backgroundColor: "green",
        borderRadius: 10,
        justifyContent: 'center',
        width: 100,
        padding: 10,
        marginTop: 50,
        marginRight: 20
    },
    modalText:{
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20
    },

    //login page
    LoginContainer: {
        backgroundColor: '#46cdfa',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    LoginBody: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 20, 
        width:'100%', 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    FormError: {
        position: "absolute",
        bottom: 0,
        right: "25%",
        color: 'red'
    },


    // Chat Css
    userOnline: {
        position: "absolute",
        borderWidth: 5,
        borderRadius: 5,
        borderColor: "rgb(0, 219, 0)",
        height: 8,
        width: 8,
        bottom: 4,
        right: 1,
        zIndex: 2
    },



    ChatHeader_icon: {
        position: 'absolute',
        left: 0,
        top: -15,
        alignSelf: 'center',
        marginRight: 10, 
        padding: 10
    },
});
