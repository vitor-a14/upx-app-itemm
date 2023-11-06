import { useState } from "react";
import { LoadModal } from "../filter/Modal/loadModal"
import { LoginStyles } from "./login.style"
import { View, Image, TextInput, TouchableOpacity, Text} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"
import { configHttp } from "../../config";
export const Cadastro = ({navigation})=>{

    const [person, setperson] = useState({
        user: undefined,
        password: undefined
    })


    function handeInsertuser(data){
        setperson({...person,user: data})
    }
    function handleInsertPass(data){
        setperson({...person,password: data})
    }
    
    return(

        <View style={LoginStyles.canva}>
        <Image source={require("../../assets/logo-itemm.png")} />
        <Text style={{color: "white"}}>Cadastro:</Text>
        {
        //<LoadModal status={modalload.status} msg={modalload.msg}></LoadModal>
        }

        <View
          style={[
            LoginStyles.same_line,
            LoginStyles.center,
            { marginTop: '5%', backgroundColor: 'white', borderRadius: 3 }
          ]}
        >
          <Icon name="user" color={'gray'} size={20} style={[LoginStyles.icon, LoginStyles.center]} />
          <TextInput
            placeholder="Nome do usuario"
            style={LoginStyles.input}
            onChangeText={(text) => handeInsertuser(text)} // Use onChangeText e especifique o campo
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
            onChangeText={(text) => handleInsertPass( text)} // Use onChangeText e especifique o campo
            value={person.password} // Defina o valor do campo de texto
          />
        </View>
            <View style={LoginStyles.same_line}>
                <TouchableOpacity style={LoginStyles.buttons} onPress={()=>makereq(person, navigation)}><Text style={LoginStyles.text}>Enviar</Text></TouchableOpacity>
            </View>
      </View>
    )


}

const makereq = async(data, nav) =>{
    console.log('manou')
    const req = await axios.post(`http://${configHttp.url_base}/dataverse/login/cadastro`,{
        cr0bb_usuario : data.user,
        cr0bb_senha : data.password
    }).then(()=>{
        console.log('foi')
        alert("cadastrado com sucesso!!!
    ]
    
    ")
        nav.navigate('Login')
    })
    .catch((err)=>{
        console.log(err.response.data.message)
        alert(err.response.data.message + "\nuse outro usuario ou outra senha")
        
    })
    console.log(req)

}