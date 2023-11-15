import { View, Image, TouchableOpacity, Text  } from "react-native"
import { homeStyle } from "./style_home"
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = ({route,navigation}) =>{

    const handleDepartamentoPessoalPress = () => {
    // Lógica para a tela "Departamento Pessoal"
    };

    const handleSetorPedagogicoPress = () => {
    // Lógica para a tela "Setor Pedagógico"
    };

    const handleSetorSocialPress = async () => {
        
        navigation.navigate('FilterScreen'); // Navegue para a tela "SetorSocial"
    };

    return (
        <View style={homeStyle.canva}>  
            <Image source={require("../../assets/logo-itemm.png")} style={homeStyle.image_canva}></Image>
            <ButtonsProps title={'Departamento Pessoal'}></ButtonsProps>
            <ButtonsProps title={'Setor Social'} onPress={handleSetorSocialPress}></ButtonsProps>
            <ButtonsProps title={'Setor Pedagógico'}></ButtonsProps>
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