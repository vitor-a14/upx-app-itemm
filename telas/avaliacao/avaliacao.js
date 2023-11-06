import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet} from "react-native"
import { AvaliacaoStyle } from "./Avaliacao.style"
import  { Slider }  from  '@miblanchard/react-native-slider' ;
import { useState } from "react";
export const Avaliacao = () => {
        
    const handlePress = () => {
        // Logica a ser executada quando o botao for pressionado
        console.log('Botao pressionado!');
    };
    const BotaoComImagem = () => {
        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={AvaliacaoStyle.botao}>
                    <Image source={require('../../assets/voltar.png')} style={AvaliacaoStyle.imagem} />
                </View>
            </TouchableOpacity>
        );
    }

    const [slide, setslide] = useState({
        slider1 : 0,
        slider2 : 0,
        slider3 : 0,
        slider4 : 0
    })
    return (
        <ImageBackground source={require('../../assets/back-ground.png')} style={AvaliacaoStyle.fundo}>

            <View style={AvaliacaoStyle.headerCanva}>
                {BotaoComImagem()}
                <DisplayFieldsSmall name={"Data"}  data={"nulo"}></DisplayFieldsSmall>
                <DisplayFieldsSmall name={"Turma"}  data={"nulo"}></DisplayFieldsSmall>
                    
            </View>
            <View style={AvaliacaoStyle.main_canva}>

                    <DisplayFieldsBig name={"Nome"} data={'nulo'}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Empresa"} data={'nulo'}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Modulo"} data={'nulo'}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Nivel"} data={'nulo'}></DisplayFieldsBig>
                
            </View>



            <View style={AvaliacaoStyle.Ponto}>

                
                <Text style={AvaliacaoStyle.Textt}>Avaliçao</Text>
                

                <Text>Habilidade Técnica: {slide.slider1?.toFixed(2)}</Text>
                <Slider maximumValue={3} onValueChange={(option)=>{
                    const [value] = option
                    setslide({slider2: slide.slider2, slider3 : slide.slider3 ,slider1 :value, slider4: slide.slider4})
                    console.log(slide)
                }} value={slide.slider1}>
                </Slider>
                <Text>Participaçao: {slide.slider2?.toFixed(2)}</Text>
                <Slider maximumValue={3} onValueChange={(option)=>{
                    const [value] = option
                    setslide({slider2: value, slider3 : slide.slider3 ,slider1 :slide.slider1, slider4: slide.slider4})
                    console.log(slide)
                }}value={slide.slider2}>

                </Slider>
                <Text>Relacionamento interpessoal: {slide.slider3?.toFixed(2)}</Text>
                <Slider maximumValue={3} onValueChange={(option)=>{
                    const [value] = option
                    setslide({slider2: slide.slider2, slider3 : value ,slider1 :slide.slider1, slider4: slide.slider4})
                    console.log(slide)
                }}value={slide.slider3}>

                </Slider>
                <Text>Cumprimento de metas: {slide.slider4?.toFixed(2)}</Text>
                <Slider maximumValue={3} onValueChange={(option)=>{
                    const [value] = option
                    setslide({slider2: slide.slider2, slider3 : slide.slider3 ,slider1 :slide.slider1, slider4: value})
                    console.log(slide)
                }}value={slide.slider4}>

                </Slider>
            </View>
                    
            
            
            
        
        </ImageBackground>
        
        )
}
const DisplayFieldsSmall = (props) => {
    return (
            <View style={AvaliacaoStyle.canvaDisplaySmall}>
                <Text>{props.name}</Text>
                <Text style={AvaliacaoStyle.textDisplay}>{props.data}</Text>
            </View>
    )
}

const DisplayFieldsBig = (props) => {
    return (
        <View style={AvaliacaoStyle.canvaDisplay}>
                <Text>{props.name}</Text>
                <Text style={AvaliacaoStyle.textDisplay}>{props.data}</Text>
            </View>
    )
}