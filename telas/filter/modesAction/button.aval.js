import { IButtonsMode } from "./IButtonsMode";

export class ButtonAval extends IButtonsMode{
    data

    constructor(data){
        super()
        this.data = data
    }

    execute_mode_funtion(student, navigation){
        //so vai chamar outra tela e passar o student como parametro
        //alert('avaliação ainda nao foi desenvolvida')
        navigation.navigate("Avaliacao", {student: student, date: this.data})
        //console.log(student)
    }
}