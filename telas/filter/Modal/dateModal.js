import { View, Modal, TouchableOpacity, Text, StyleSheet} from "react-native"
import DatePicker from 'react-native-modern-datepicker';

export const DateModal = (props) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.status}
   
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.postion_close_btn}>          
                <TouchableOpacity onPress={() => props.func(false)} style={styles.close_button}>
              <Text style={StyleSheet.create({
                color: "red"
              })}>X</Text>
            </TouchableOpacity>
            </View>
  
            <DatePicker
                style={
                    styles.datapieck
                }
                onSelectedChange={(value)=> {
                    props.datefilter(value)
                    props.func(false)}
                }
            ></DatePicker>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    },
    modalView: {
        width: "95%",
        height: "60%",
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
            borderRadius:5,
      borderWidth: 1, // Largura da borda em pixels
      borderColor: 'black', // Cor da borda
    },
    datapieck:{
        width:'100%',
        height:'80%',

    },
    close_button:{
        display: "flex",
        width:"10%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius:5,
        borderWidth: 1, // Largura da borda em pixels
        borderColor: 'red', // Cor da borda
    },
    postion_close_btn:{
        width:"100%",
        height:'10%',
        display: 'flex',
        alignItems: "flex-end",
        justifyContent: "flex-end",
    }
  });