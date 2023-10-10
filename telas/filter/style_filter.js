import { StyleSheet } from "react-native";

export const filterStyle = StyleSheet.create({
    canva:{
        flex: 1,
    resizeMode: 'center', // ou 'contain' para ajustar a imagem ao conteúdo
    justifyContent: 'center', // Ajuste conforme necessário
    alignItems: 'center', // Ajuste conforme necessário
    },
    canva_filter:{
        display: 'flex',        
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom:10
    },
    display_filter:{
        display: "flex",
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    button_dividido:{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: 'rgba(226,238,252, 225)',
        width: "83%",
        height:40,
        borderRadius: 3
    }, 
    button_unico:{
        backgroundColor: 'rgba(226,238,252, 225)',
        width:"92%",
        height:40,
        borderRadius: 3,
        textAlign: "center"
    },
    button_piecker:{
        width:150
    },
    name_filter:{
        justifyContent: "center",
        alignItems:"center",
        width: "100%",
        marginBottom: 20
    },
    canva_result:{
        backgroundColor: 'rgba(226,238,252, 225)',
        width: "92%",
        height: "40%",
        borderRadius: 3,
    }, 
    display_results:{
        textAlign: "center",
        padding: 5,
        borderWidth: 1, // Largura da borda em pixels
        borderColor: 'white', // Cor da borda
    },
    buttons_mode:{
        width: 70, 
        height: 70, 
        borderRadius: 50, // A metade da largura ou altura para criar um botão redondo
        backgroundColor: 'rgba(89, 123, 237, 193)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    img_buttons:{
        resizeMode: "center",
        
    },
    canva_botton_buttons:{
        display: 'flex',        
        flexDirection: "row",
    },
    ScrollView_canva:{
        width:"100%",
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
    },
    canva_hidde_button:{
        
    }

})

