import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
    canva:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(89, 123, 237, 193)'
    },
    button_style:{
        marginTop: 10,
        borderRadius : 3,
        width: '80%', // Ajuste o tamanho desejado em porcentagem
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text:{
        color: 'rgba(89, 123, 237, 193)'
    },
    image_canva:{
        marginTop : 50,
        marginBottom : 70
    }
    
})