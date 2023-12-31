
import { configHttp } from "../../../config";
import { IButtonsMode } from "./IButtonsMode";
import axios from "axios";

export class ButtonPresenca extends IButtonsMode{
    presence //boolean true = presente

    constructor(presence){
        super()
        this.presence = presence
    }

    async execute_mode_funtion(student, navigation, status, date){
        const teste = this.presence
        if(!student ||  !date) return alert('erro na chamada'+!student + status + date + student.cr0bb_presenca )
        
        await axios.post(`http://${configHttp.url_base}/dataverse/avaliacao`,{
            cr0bb_presenca: Boolean(teste),
            cr0bb_datapresenca: String(date),
            cr0bb_participacao: undefined,
            cr0bb_relacionamentointerpessoal:undefined,
            cr0bb_cumprimentodemetas:undefined,
            cr0bb_habilidadestecnicas:undefined,
            cr0bb_idaluno: student.cr0bb_autonumber,
            cr0bb_avaliador : undefined
        })
 }
}