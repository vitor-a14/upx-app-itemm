import { IButtonsMode } from "./IButtonsMode";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { configHttp } from "../../../config";
import { CertificadoFileds } from "./CertificadoObjs/CertificadoField";
import { validCertificado } from "./CertificadoObjs/ValidCertificado";



export class ButtonCertificado extends IButtonsMode{
    validCertificado = new validCertificado()
    async execute_mode_funtion(student){
        let valid = await this.validCertificado.valid(student['cr0bb_autonumber'], student['cr0bb_periodocontrato'])
        if(!valid) return alert('não é possivel ainda gerar certificado para o aluno ' + student['cr0bb_nome']);
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
        const result =await FileSystem.downloadAsync(
          url,
          FileSystem.documentDirectory + filename
        );
        await this.save(result.uri, filename, result.headers["Content-Type"]);
    }
}
