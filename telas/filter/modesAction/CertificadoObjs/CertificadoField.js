export class CertificadoFileds{
    RG
    dataInicio
    dataFinal
    empresa
    
    constructor(rg, contrato , empresa){
        this.RG = rg
        let date_array = String(contrato).split(' ')
        this.dataInicio = date_array[0]
        this.dataFinal = date_array[1]
        this.empresa = empresa
        console.log(this.dataFinal, this.dataInicio, this.RG)
    }

    canbeGenerate(){
      let validdays = this.getValidDays()
      
    }
}
