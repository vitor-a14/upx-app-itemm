import {Button, Modal, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { ButtonPresenca } from "../modesAction/button.presenca"
import { styleLoadScreen } from "../../load/style_load"

export const PresencaModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.status}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.close_canva}>
            <TouchableOpacity style={{borderColor: "red", borderWidth:1, borderRadius:5, padding: 5,marginBottom:"15%"}} onPress={props.reject}><Text style={{color: "red", margin:3}}>X</Text></TouchableOpacity>
          </View>
          <Text>O aluno {props.aluno?.cr0bb_nome} estava presente na aula do dia {props.date} ?</Text>

            <View style={styles.sameline}>
              
              <TouchableOpacity onPress={() => {
                props.ok(new ButtonPresenca(true))
                props.reject(false)
              }}>
                <Text>SIM</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                props.ok(new ButtonPresenca(false))
                props.reject(false)
              }}>
                <Text>NÃO</Text>
              </TouchableOpacity>
            </View>


        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  close_canva:{
    width:"100%",
    display:"flex", 
    alignItems:'flex-end',
  },
  sameline : {
    display: "flex",
    justifyContent: "space-between",
    width:'80%',
    marginTop: "10%",
    flexDirection:'row'
  },
  modalView: {
    width: "70%",
    height: "30%",
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 100,

    backgroundColor: 'white'
  },
  letter: {
    color: ("rgba(208, 140, 233, 255)")
  }
  ,

})