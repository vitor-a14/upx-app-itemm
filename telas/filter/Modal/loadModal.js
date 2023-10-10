import { LoadScreen } from "../../load/load_screen"
import { Modal,Text , View, StyleSheet, Image} from "react-native"

export const LoadModal = (props) =>{
    return(    
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.status}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.letter}>{props.msg}</Text>
                <Image source={require("../../../assets/load_.gif")}  resizeMode="center"></Image>
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
    modalView: {
      width: "70%",
      height: "50%",
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 100,

      backgroundColor: 'white'
    },
    letter:{
        color : ("rgba(208, 140, 233, 255)")
    }
})