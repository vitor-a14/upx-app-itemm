import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
    canva: {
        flex: 1,
        backgroundColor: 'rgba(89, 123, 237, 193)',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        padding: "2%",
        color:'black',
        width:"70%",
        height:"70%",
    },
    buttons:{
        backgroundColor: 'blue',
        width:"30%",
        padding:"3%",
        margin:"2%",
        flexDirection:"row",
        borderRadius:3,
        display:'flex',
        justifyContent:'center',
        alignItems:"center"

    },
    text:{
        color: 'white'
    },
    same_line:{
        display:'flex',
        flexDirection:'row'
    },
    icon:{
        padding: 4,
        width:'8%',
        height:"70%",
    },
    center:{
        display: 'flex',
        justifyContent:'center',
        alignItems:"center"
    }

})