import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { ProgressCircle } from 'react-native-svg-charts';
import { Text, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { configHttp } from '../../config';
import { LoadModal } from '../filter/Modal/loadModal';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07A0C3',
        borderRadius: 26,
        padding: 15,
        margin: 15,
    },
    titleContainer: {
        justifyContent: 'center',
        backgroundColor: '#07A0C3',
        borderRadius: 26,
        margin: 'auto',
        height: '10%',
        margin: 15
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        height: '50%',
        margin: 'auto'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#07A0C3',
        borderRadius: 26,
        margin: 'auto',
        height: '8%',
        margin: 15,
        marginTop: 82
    },
    chartContainer: {
        alignItems: 'center',
        padding: 5,
    },
    chart: {
        height: 80,
        width: 80,
    },
    progressChartLegend: {
        fontWeight: 'bold',
        top: '-10%',
        left: '30%'
    },
    legendCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#07A0C3',
        borderRadius: 26,
        padding: 16,
        margin: 15,
    },
    legendContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendItem: {
        height: 20,
        width: 20,
        margin: 10,
    },
    legendText: {
        width: '60%',
        textAlign: 'left',
    },
    viewStyle: {
        height: '90%',
        top: '5%'
    }
});


const indicators = [
   
];

const StudentPieChart = (props) => {
    
    const data = [
        {
          key: props.indicators[0].label,
          value: props.indicators[0].value * 100,
          svg: { fill: props.indicators[0].color },
        },
        {
          key: props.indicators[1].label,
          value: props.indicators[1].value * 100,
          svg: { fill: props.indicators[1].color },
        },
        {
          key: props.indicators[2].label,
          value: props.indicators[2].value * 100,
          svg: { fill: props.indicators[2].color },
        },
        {
            key: props.indicators[3].label,
            value: props.indicators[3].value * 100,
            svg: { fill: props.indicators[3].color },
        }
      ];
      console.log(data)
      return (
        <View style={styles.container}>
          <PieChart
            style={{ height: "200%", width: "200%" }}
            data={data}
            innerRadius={'30%'}
            outerRadius={'70%'}
          >
          </PieChart>
        </View>
      );
}

const StudentProgressChart = (props) => {
    return (
        <View style={styles.container}>
            {props.indicators.map((item, index) => (
            <View  key={`legend-item-${index}`} style={styles.chartContainer}>
                <ProgressCircle
                    style={styles.chart}
                    progress={parseFloat(item.value)}
                    progressColor={item.color}
                    backgroundColor={'#ECECEC'}
                    strokeWidth={12}
                    cornerRadius={6}
                >
                </ProgressCircle>
                <Text style={styles.progressChartLegend}>
                    {item.value * 100 + '%'}
                </Text>
            </View>
            ))}
        </View>
    );
}

const LegendCard = () => {
    return (
        <View style={styles.legendCard}>
            {indicators.map((item) => (
                <View style={styles.legendContainer}>
                    <ProgressCircle style={styles.legendItem} progress={1} progressColor={item.color} strokeWidth={40}/>
                    <Text style={styles.legendText}> {item.label} </Text>
                </View>
            ))}
        </View>
    );
}
  
const StudentTitle = (props) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.nome}</Text>
        </View>
    );
}

const ButtonsProps = (props) =>{
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const IndicatorScreen = ({ route, navigation }) => {
    const student = route.params.student;
    const [conjunto_notas, set_conjunto] = useState([])
    const [modalload, setmodaload] = useState({ status: false, msg: "" }) //modal para o pop up de loadscreens
    const [notas, set_notas] = useState([
        {value: 0, color: '#F0C808', label: 'Relacionamento Interpessoal' },  
        {value: 0, color: '#DD1C1A', label: 'Participação' },  
        {value: 0, color: '#0AD3FF', label: 'Cumprimento de Metas' }, 
        {value: 0, color: '#F96900', label: 'Habilidade Técnica' },  
    ])

    useEffect(()=>{
        setmodaload({status:true, msg:'carregando dados'})
        getAval(student.cr0bb_autonumber).
        then((res)=>{
            if(res.length === 0){
                alert('sem dados disponíveis');
                navigation.navigate('FilterScreen')
            }
            set_conjunto(res)
            const max_nota = res.length * 2 // o maximo de nota é 2, entao se eu multiplicar por 2 os registros e o maxio que ele pode ter de nota
            console.log(max_nota)
            const metas = res.reduce((acumulador, currentItem) => {
                return acumulador + Number(currentItem.cr0bb_cumprimentodemetas);
              }, 0);
            const relacionamento = res.reduce((acumulador, currentItem) => {
                return acumulador + Number(currentItem.cr0bb_relacionamentointerpessoal);
            }, 0);
            const habilidades = res.reduce((acumulador, currentItem) => {
                return acumulador + Number(currentItem.cr0bb_habilidadestecnicas);
            }, 0);
            const participacao = res.reduce((acumulador, currentItem) => {
                return acumulador + Number(currentItem.cr0bb_participacao);
            }, 0);

            console.log( metas, relacionamento, habilidades, participacao)
            set_notas([
                {value: parseFloat(relacionamento/max_nota).toFixed(4), color: '#F0C808', label: 'Relacionamento Interpessoal' },  
                {value:  parseFloat(participacao/max_nota).toFixed(4), color: '#DD1C1A', label: 'Participação' },  
                {value:  parseFloat(metas/max_nota).toFixed(4), color: '#0AD3FF', label: 'Cumprimento de Metas' }, 
                {value:  parseFloat(habilidades/max_nota).toFixed(4), color: '#F96900', label: 'Habilidade Técnica' }, 
            ])
            console.log(notas)
        })
        setmodaload({status:false, msg:''})
        }, [])


    return (
        <View style={styles.viewStyle}>
            <LoadModal status={modalload.status} msg={modalload.msg}></LoadModal>
            <StudentTitle nome={student.cr0bb_nome}/>
            <StudentPieChart  indicators={notas} />
            <StudentProgressChart indicators={notas}/>
            <LegendCard />
            <ButtonsProps title={'Voltar'} onPress={() => navigation.navigate('Home')}></ButtonsProps>
        </View>
    )
}

/**
 * 
 * @param {string} student_id 
 * @throws {Error} Se o argumento `student_id` não for uma string.
 */

const getAval = async (student_id)=>{
    console.log('pegando valores', student_id)
    let url = `http://${configHttp.url_base}/dataverse/avaliacao/${student_id}`
    let res = axios.get(url).
    then((res)=>{

        return res.data
    })
    .catch((err)=>{
        throw new Error("erro na chamada http")
    })
    return res
}

export default IndicatorScreen;