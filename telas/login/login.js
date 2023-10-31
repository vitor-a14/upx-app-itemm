import { View, Image, TextInput, TouchableOpacity, Text} from "react-native"
import { LoginStyles } from "./login.style"
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"
import { useState } from "react";
import { LoadModal } from "../filter/Modal/loadModal";

export const Login =({navigation}) =>{
    const [modalload, setmodaload] = useState({ status: false, msg: "" }) //modal para o pop up de loadscreens

    const [person, setperson] = useState({
        user:'',
        password:''
    })
    const handleInput = (fieldName, text) => {
        setperson({
          ...person,
          [fieldName]: text
        });
      };

    return(

        <View style={LoginStyles.canva}>
        <Image source={require("../../assets/logo-itemm.png")} />
        <LoadModal status={modalload.status} msg={modalload.msg}></LoadModal>

        <View
          style={[
            LoginStyles.same_line,
            LoginStyles.center,
            { marginTop: '5%', backgroundColor: 'white', borderRadius: 3 }
          ]}
        >
          <Icon name="user" color={'gray'} size={20} style={[LoginStyles.icon, LoginStyles.center]} />
          <TextInput
            placeholder="Usuario"
            style={LoginStyles.input}
            onChangeText={(text) => handleInput('user', text)} // Use onChangeText e especifique o campo
            value={person.user} // Defina o valor do campo de texto
          />
        </View>
  
        <View
          style={[
            LoginStyles.same_line,
            LoginStyles.center,
            { marginTop: '5%', marginBottom: '5%', backgroundColor: 'white', borderRadius: 3 }
          ]}
        >
          <Icon name="key" color={'gray'} size={20} style={[LoginStyles.icon, LoginStyles.center]} />
          <TextInput
            placeholder="Senha"
            style={LoginStyles.input}
            onChangeText={(text) => handleInput('password', text)} // Use onChangeText e especifique o campo
            value={person.password} // Defina o valor do campo de texto
          />
        </View>
            <View style={LoginStyles.same_line}>
                <TouchableOpacity style={LoginStyles.buttons} onPress={()=>{makeRequest(person.user, person.password, navigation, setmodaload)}}><Text style={LoginStyles.text}>Enviar</Text></TouchableOpacity>
                <TouchableOpacity style={LoginStyles.buttons}><Text style={LoginStyles.text}>Cadastrar</Text></TouchableOpacity>
            </View>
      </View>
    )
}
const makeRequest = async (user, pass, navigator, setmodal) => {
    try{
        setmodal({status: true, msg:'Processando os dados'})
        let res = await axios.post("http://192.168.100.10:3000/dataverse/login/", {
            user: user,
            password: pass
        })
        console.log('achou o user' + res.data)
        navigator.navigate('Home')
    }
    catch(err){
        alert(`Falha ao login: ${err.response.data.message}`)
    }
    setmodal({status: false, msg:''})
}