import { ButtonSettingsMode } from "./ButtonsMode.Interface";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { configHttp } from "../../../config";


class CertificadoFileds{
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
}

export class ButtonCertificado extends ButtonSettingsMode{

    async execute_mode_funtion(student){
        console.log('====================================>', student['cr0bb_rg'], student['cr0bb_periodocontrato'], student['cr0bb_empresa']);
        await this.dowload(new CertificadoFileds(student['cr0bb_rg'], student['cr0bb_periodocontrato'], student['cr0bb_empresa']));
        
    }

    async save(uri, filename, mimetype){
        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
              const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
              const createdFileUri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype);
              await FileSystem.writeAsStringAsync(createdFileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
              
            } else {
              shareAsync(uri);
            }
          } else {
            shareAsync(uri);
          }
    }

    async dowload(certificado_fields){
        let rg = String(certificado_fields.RG).replace(/\./g, "-");//retira todos os pontos
        let filename = `${rg}.pdf`;
        //filename = filename.replace('.', '-')
        const url = `http://${configHttp.url_base}/certificados/generate/${encodeURIComponent(certificado_fields.RG)}/${encodeURIComponent(certificado_fields.empresa)}/${encodeURIComponent(certificado_fields.dataInicio)}/${encodeURIComponent(certificado_fields.dataFinal)}`
        console.log(url)
        const result =await FileSystem.downloadAsync(
          url,
          FileSystem.documentDirectory + filename
        );
        console.log(certificado_fields);
        console.log(filename)
        await this.save(result.uri, filename, result.headers["Content-Type"]);
    }
}
