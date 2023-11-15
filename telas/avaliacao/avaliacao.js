import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet} from "react-native"
import { AvaliacaoStyle } from "./Avaliacao.style"
import  { Slider }  from  '@miblanchard/react-native-slider' ;
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { configHttp } from "../../config";
import { LoadModal } from "../filter/Modal/loadModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Avaliacao = ({navigation, route}) => {
    const [slide, setslide] = useState({
        slider1 : 0,
        slider2 : 0,
        slider3 : 0,
        slider4 : 0
    })
    const [student, setStudent] = useState({
        student: undefined,
        date : undefined
    })
    const [load_modal, set_modal] = useState(false)
    let date_of_aval = undefined
    
    useEffect(() => {
        const { student, date } = route.params;
    
        const fetcDhata = async () => {
            try {
                const res = await getAval(student, date); // Passe student e date como parâmetros para getAval
                const { cr0bb_participacao, cr0bb_cumprimentodemetas, cr0bb_relacionamentointerpessoal, cr0bb_habilidadestecnicas } = res;
    
                
                setStudent({ student: student, date: date });
                setslide({slider1: cr0bb_habilidadestecnicas??0, slider2: cr0bb_participacao??0, slider3: cr0bb_relacionamentointerpessoal??0, slider4: cr0bb_cumprimentodemetas??0})
            } catch (error) {
                console.error('Erro ao obter avaliação:', error);
            }
        };
    
        if (student) {
            fetcDhata();
        } else {
            alert("Nenhum aluno");
        }
    }, [route.params]);
    
    const getAval = async (student, date) => { // Aceita student e date como parâmetros
        const { data: { value } } = await axios.get(`http://${configHttp.url_base}/dataverse/avaliacao`);
        const myaval = value.find((filt) => {
            if (filt.cr0bb_idaluno === student.cr0bb_autonumber && filt.cr0bb_datapresenca === date) {
                return filt;
            }
        });
        return myaval;
    };

    const handlePress = () => {
        // Logica a ser executada quando o botao for pressionado
        navigation.navigate("FilterScreen")
    };
    const BotaoComImagem = () => {
        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={AvaliacaoStyle.botao}>
                    <Icon name="rotate-left" size={20} style={{padding: "10%"}}></Icon>
                </View>
            </TouchableOpacity>
        );
    }
    

    const registerRequest = async() =>{
        set_modal(true)
        
        const myaval = await getAval(student.student, student.date)
     

        await axios.put(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            "id": myaval.cr0bb_avaliacaoid,
            "field":"cr0bb_participacao",
            "data":String(slide.slider2)
        }).catch((err)=>{
            alert(err)
        })
        await axios.put(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            "id":myaval.cr0bb_avaliacaoid,
            "field":"cr0bb_cumprimentodemetas",
            "data": String(slide.slider4)
        }).catch((err)=>{
            alert(err)
        })
        await axios.put(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            "id":myaval.cr0bb_avaliacaoid,
            "field":"cr0bb_habilidadestecnicas",
            "data": String(slide.slider1)
        }).catch((err)=>{
            alert(err)
        })
        await axios.put(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            "id":myaval.cr0bb_avaliacaoid,
            "field":"cr0bb_relacionamentointerpessoal",
            "data": String(slide.slider3)
        }).catch((err)=>{
            alert(err)
        })
        await axios.put(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            "id":myaval.cr0bb_avaliacaoid,
            "field":"cr0bb_avaliador",
            "data": String(await AsyncStorage.getItem("user"))
        }).catch((err)=>{
            alert(err)
        })
        set_modal(false)
        navigation.navigate("FilterScreen",{ key: Math.random() })
    }
    return (
        <ImageBackground source={require('../../assets/back-ground.png')} style={AvaliacaoStyle.fundo}>
            <LoadModal msg="gravando dados" status={load_modal}></LoadModal>
            <View style={AvaliacaoStyle.headerCanva}>
                {BotaoComImagem()}
                <DisplayFieldsSmall name={"Data"}  data={student.date}></DisplayFieldsSmall>
                <DisplayFieldsSmall name={"Turma"}  data={student.student?.cr0bb_turma}></DisplayFieldsSmall>
                    
            </View>
            <View style={AvaliacaoStyle.main_canva}>

                    <DisplayFieldsBig name={"Nome"} data={student.student?.cr0bb_nome}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Empresa"} data={student.student?.cr0bb_empresa}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Modulo"} data={student.student?.cr0bb_modelo}></DisplayFieldsBig>
                    <DisplayFieldsBig name={"Nivel"} data={student.student?.cr0bb_modelo}></DisplayFieldsBig>
                
            </View>


        <View style={{display:"flex", justifyContent:"flex-start", alignItems: "center",}}>
            <View style={AvaliacaoStyle.Ponto}>                

                <Text>Habilidade Técnica: {slide.slider1}</Text>
                <Slider maximumValue={2} onValueChange={(option)=>{
                    const [value] = option
                    setslide({...slide, slider1: value.toFixed(2)})
                    
                }} value={slide.slider1}>
                </Slider>
                <Text>Participaçao: {slide.slider2}</Text>
                <Slider maximumValue={2} onValueChange={(option)=>{
                    const [value] = option
                    setslide({...slide, slider2: value.toFixed(2)})
                    
                }}value={slide.slider2}>

                </Slider>
                <Text>Relacionamento interpessoal: {slide.slider3}</Text>
                <Slider maximumValue={2} onValueChange={(option)=>{
                    const [value] = option
                    setslide({...slide, slider3: value.toFixed(2)})
                    
                }}value={slide.slider3}>

                </Slider>
                <Text>Cumprimento de metas: {slide.slider4}</Text>
                <Slider maximumValue={2} onValueChange={(option)=>{
                    const [value] = option
                    setslide({...slide, slider4: value.toFixed(2)})
                    
                }}value={slide.slider4}>

                </Slider>
                <TouchableOpacity style={{display:"flex", justifyContent: "center", alignItems:"center", width:"100%", padding:'3%', borderColor: "white", borderRadius: 3, borderWidth: 1}}
                onPress={async ()=>await registerRequest()}>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>
                    
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

