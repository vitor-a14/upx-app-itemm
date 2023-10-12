import { View, Image, TouchableOpacity, Text  } from "react-native"
import { homeStyle } from "./style_home"
import { useNavigation } from "@react-navigation/native";


export const HomeScreen = () =>{
    const navigation = useNavigation(); // Obtenha o objeto de navegação

    const handleDepartamentoPessoalPress = () => {
    // Lógica para a tela "Departamento Pessoal"
    };

    const handleSetorPedagogicoPress = () => {
    // Lógica para a tela "Setor Pedagógico"
    };

    const handleSetorSocialPress = () => {
        navigation.navigate('FilterScreen'); // Navegue para a tela "SetorSocial"
    };

    const handleIndicatorScreenPress = () => {
        navigation.navigate("IndicatorScreen", {navigation});
    };

    return (
        <View style={homeStyle.canva}>  
            <Image source={require("../../assets/logo-itemm.png")} style={homeStyle.image_canva}></Image>

            <ButtonsProps title={'Departamento Pessoal'}></ButtonsProps>
            <ButtonsProps title={'Setor Social'} onPress={handleSetorSocialPress}></ButtonsProps>
            <ButtonsProps title={'Setor Pedagógico'}></ButtonsProps>

            <ButtonsProps title={'TESTE - IndicatorScreen'} onPress={handleIndicatorScreenPress}></ButtonsProps>
        </View>
    )
}

const ButtonsProps = (props) =>{
    return (
        <TouchableOpacity style={homeStyle.button_style} onPress={props.onPress}>
            <Text style={homeStyle.button_text}>{props.title}</Text>
        </TouchableOpacity>
    )
}