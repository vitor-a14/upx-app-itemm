import { Component } from "react";
import { PresençaModal } from "../Modal/presençaModal";
import { IButtonsMode } from "./IButtonsMode";

export class ButtonPresenca extends IButtonsMode{
    async execute_mode_funtion(student, navigation){
        console.log('entrou')
        //so vai chamar outra tela e passar o student como parametro
        const result = await new Promise((resolve) => {
            <PresençaModal msg="Você deseja confirmar a presença?" onConfirm={resolve} />
          });
        console.log('saiu')


    }
}