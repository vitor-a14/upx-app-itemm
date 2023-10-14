import axios from "axios"
import { configHttp } from "../../../../config"

export class validCertificado{
    async valid(student_id, periodo_contrato) {
        console.log('to aki poha');
      
        let [start_date, end_date] = String(periodo_contrato).split(' ');
        console.log(start_date, end_date);
      
        let presence_days = await this.getPresenceDays(student_id);
        let total_classes = await this.getClassDays(start_date, end_date);
      
        console.log('\n\n\n\n\n soma total ' + Number(presence_days) / Number(total_classes));
      
        if (parseFloat(Number(presence_days) / Number(total_classes)).toFixed(4) * 100 < 75) {
          return false;
        }
        return true; //caso for maior que 75, então quer dizer que pode gerar relatório
      }
    
    
      async getPresenceDays(student_id){
        console.log('foi para baixo', student_id)
        let url = `http://${configHttp.url_base}/dataverse/avaliacao/${student_id}`
        console.log('-<'+url)
        let res = axios.get(url).then(
            (res)=>{
            let presence = res.data.map((filt)=>{
                if(filt.cr0bb_presenca === 'true') return filt
            })
            console.log('\n\n\n\n\ number de presença'+ presence.length)
            return presence.length
            }
        )
        .catch((err)=>{
            console.log(err)
        })
        return res
    }
    formatDate(date_string){
        const parts = date_string.split('/');
        const formattedStartDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedStartDate
    }

    async getClassDays(startDate, endDate) {
      console.log('dias ', startDate, endDate)
      const oneDay = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
      let currentDate = new Date(this.formatDate(startDate));
      const stopDate = new Date(this.formatDate(endDate));
      let workingDays = 0;
      console.log('dias ', currentDate, stopDate)

      while (currentDate <= stopDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          // Se não for domingo (0) nem sábado (6), incrementa os dias úteis
          workingDays++;
        }
    
        // Avança para o próximo dia
        currentDate.setTime(currentDate.getTime() + oneDay);
      }
      console.log(`\n\n\n\n\n dias validos`+workingDays)
      return workingDays;
    }

}