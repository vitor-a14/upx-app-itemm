import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { configHttp } from '../../config';
import { LoadModal } from '../filter/Modal/loadModal';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(226,238,252, 225)',
        borderRadius: 3,
        padding: '5%',
        marginVertical: '3%',
        padding: '5%',
        margin: '3%'
    },
    titleContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(226,238,252, 225)',
        borderRadius: 3,
        margin: 'auto',
        height: '10%',
        margin: '3%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        height: '50%',
        margin: 'auto'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgba(226,238,252, 225)',
        borderRadius: 3,
        margin: 'auto',
        height: '8%',
        margin: '3%',
        marginTop: '15%'
    },
    chartContainer: {
        alignItems: 'center',
        display: 'flex',
        padding: '5%',
        margin: '-10%'
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
        backgroundColor: 'rgba(226,238,252, 225)',
        borderRadius: 3,
        padding: '3%',
        margin: '3%',
    },
    legendContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendItem: {
        height: '5%',
        width: '5%',
        margin: '3%',
    },
    legendText: {
        width: '60%',
        textAlign: 'left',
    },
    viewStyle: {
        height: '90%',
        top: '5%'
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '110%'
    },
});

const indicators = [

];

const StudentPresence = (props) => {
    const data = [
        {
            key: props.indicators[0].label,
            value: props.indicators[0].value * 100,
            fill: props.indicators[0].color
        },
        {
            key: props.indicators[1].label,
            value: props.indicators[1].value * 100,
            fill: props.indicators[1].color
        },
        {
            key: props.indicators[2].label,
            value: props.indicators[2].value * 100,
            fill: props.indicators[2].color
        },
        {
            key: props.indicators[3].label,
            value: props.indicators[3].value * 100,
            fill: props.indicators[3].color
        }
    ];

    return (
        <View style={styles.container}>

        </View>
    );
}

const StudentProgressChart = (props) => {
    return (
        <View style={styles.container}>
            {props.indicators.map((item, index) => (
                <View key={`legend-item-${index}`} style={styles.chartContainer}>
                    <View style={styles.container}>
                        <AnimatedCircularProgress
                            size={70}
                            width={5}
                            fill={(item.value * 100).toFixed(2)}
                            tintColor={item.color}
                            backgroundColor="#3d5875">
                            {(fill) => (
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: item.color }}>
                                        {`${Math.round(fill)}%`}
                                    </Text>
                                </View>
                            )}
                        </AnimatedCircularProgress>
                    </View>
                </View>
            ))}
        </View>
    );
}

const LegendCard = (props) => {
    return (
        <View style={styles.legendCard}>
            {props.indicators.map((item) => (
                <View style={styles.legendContainer}>
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 3,
                            backgroundColor: item.color,
                        }}
                    />
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

const ButtonsProps = (props) => {
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
        { value: 0, color: '#F0C808', label: 'Relacionamento Interpessoal' },
        { value: 0, color: '#DD1C1A', label: 'Participação' },
        { value: 0, color: '#0AD3FF', label: 'Cumprimento de Metas' },
        { value: 0, color: '#F96900', label: 'Habilidade Técnica' },
    ])
    const [presença, set_presença] = useState({
        presente: undefined,
        faltas: undefined,
        s_aval: undefined
    })

    useEffect(() => {
        setmodaload({ status: true, msg: 'carregando dados' })
        getAval(student.cr0bb_autonumber).
            then((res) => {
                if (res.length === 0) {
                    alert('sem dados disponíveis');
                    navigation.navigate('FilterScreen')
                }
                set_conjunto(res)
                
                const max_nota = res.length * 2 // o maximo de nota é 2, entao se eu multiplicar por 2 os registros e o maxio que ele pode ter de nota

                const dias_presentes = res.reduce((acumulador, currentItem) => {
                    if (currentItem.cr0bb_presenca === "true") return acumulador++
                })

                const dais_s_aval = res.reduce((acumulador, currentItem) => {
                    if (currentItem.cr0bb_presenca === "true" &&
                        (
                            currentItem.cr0bb_relacionamentointerpessoal ||
                            currentItem.cr0bb_cumprimentodemetas ||
                            currentItem.cr0bb_participacao ||
                            currentItem.cr0bb_habilidadestecnicas
                        )
                    ) return acumulador++
                })

                const dias_falta = res.reduce((acumulador, currentItem) => {
                    if (currentItem.cr0bb_presenca === "false") return acumulador++
                })

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
                set_presença({
                    faltas: dias_falta,
                    presente: dias_presentes,
                    s_aval: dais_s_aval
                })
                set_notas([
                    { value: parseFloat(relacionamento / max_nota).toFixed(4), color: '#F0C808', label: 'Relacionamento Interpessoal' },
                    { value: parseFloat(participacao / max_nota).toFixed(4), color: '#DD1C1A', label: 'Participação' },
                    { value: parseFloat(metas / max_nota).toFixed(4), color: '#0AD3FF', label: 'Cumprimento de Metas' },
                    { value: parseFloat(habilidades / max_nota).toFixed(4), color: '#F96900', label: 'Habilidade Técnica' },
                ])
            })

        getAval(student.cr0bb_presenca)
        setmodaload({ status: false, msg: '' })
    }, [])

    return (
        <View>
            <ImageBackground source={require('../../assets/back-ground.png')} resizeMode="cover" style={styles.image}></ImageBackground>
            <View style={styles.viewStyle}>
                <LoadModal status={modalload.status} msg={modalload.msg}></LoadModal>
                <StudentTitle nome={student.cr0bb_nome} />
                <StudentPresence indicators={notas} />
                <StudentProgressChart indicators={notas} />
                <LegendCard indicators={notas} />
                <ButtonsProps title={'Voltar'} onPress={() => navigation.navigate('FilterScreen')}></ButtonsProps>
                <Text>{presença.faltas} e {presença.presente}</Text>
            </View>
        </View>
    )
}

/**
 * 
 * @param {string} student_id 
 * @throws {Error} Se o argumento `student_id` não for uma string.
 */

const getAval = async (student_id) => {
    let url = `http://${configHttp.url_base}/dataverse/avaliacao/${student_id}`
    let res = axios.get(url).
        then((res) => {
            return res.data
        })
        .catch((err) => {
            throw new Error("erro na chamada http")
        })
    return res
}

export default IndicatorScreen;