import { IButtonsMode } from "./IButtonsMode";

export class ButtonAval extends IButtonsMode{
    execute_mode_funtion(student, navigation){
        //so vai chamar outra tela e passar o student como parametro
        //alert('avaliação ainda nao foi desenvolvida')
        navigation.navigate("Avaliacao")
        console.log(student)
    }
}