import { IButtonsMode } from "./IButtonsMode";

export class ButtonIndicador extends IButtonsMode{
    execute_mode_funtion(student, navigation){
        //so vai chamar outra tela e passar o student como parametro
        //alert('indicador ainda nao tem funçao para isso')
        navigation.navigate('IndicatorScreen',{student:student})       
        console.log(student)
    }
}