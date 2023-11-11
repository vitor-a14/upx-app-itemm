import { StyleSheet } from "react-native";

 export const AvaliacaoStyle = StyleSheet.create({
    main_canva:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center",
        width: "100%",
        height: "35%",
        borderRadius: 3,
    },
    canvaDisplay:{
        width:"80%",
        display:"flex",
        flexDirection:"column",
        justifyContent: 'space-between'
    },
    textDisplay:{
        textAlign: "center",
        backgroundColor:"white",
        borderRadius:20,
        width:"100%",
        padding: "3%",
        backgroundColor: 'rgba(226,238,252, 225)',
    },
    headerCanva:{
        display: 'flex',
        flexDirection: "row",
        alignItems: 'flex-end',
        width: 150,
        margin: "3%",
    },
    elemento1: {
        marginRight: 10, // Adicionar margem à direita do primeiro elemento
    },
    elemento2: {
        marginLeft: 10, // Adicionar margem à esquerda do segundo elemento
    },
    
    canvaDisplaySmall:{
        marginTop:"3%",
        marginRight:"5%",
        width:"65%",
        display:"flex",
        flexDirection:"column",
        justifyContent: 'space-between'
    },
    fundo:{
        flex: 3,
        resizeMode: 'center', // ou 'contain' para ajustar a imagem ao conteúdo
        paddingTop: '15%',

    },
    Ponto:{

        justifyContent: "center",
        width:"80%",
        backgroundColor: 'rgba(226,238,252, 225)',
        borderRadius:20,
        padding: "3%"
        
    },
    Textt:{
        marginHorizontal:"40%",
        fontSize: 14,
        flexDirection: "row",

    },
    botao:{
        backgroundColor: 'rgba(226,238,252, 225)', //estilo do botao
        padding:5,
        borderRadius:10,
        marginRight: 80

    },
    imagem:{
        width: 35,
        height:35,
    },

})