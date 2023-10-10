import { View, Text, Image } from "react-native"
import { styleLoadScreen } from "./style_load"


export const LoadScreen = () =>{
    return(
        <View style={styleLoadScreen.container}>
            <Image source={require('../../assets/logo-itemm.png')} style={styleLoadScreen.image}></Image>
        </View>
    )
}