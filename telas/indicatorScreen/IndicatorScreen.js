import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { ProgressCircle } from 'react-native-svg-charts';
import { Text, TouchableOpacity } from 'react-native';

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

const nomeAluno = 'NOME';

const indicators = [
    { value: 0.5, color: '#F0C808', label: 'Relacionamento Interpessoal' },  
    { value: 0.2, color: '#DD1C1A', label: 'Participação' },  
    { value: 0.15, color: '#0AD3FF', label: 'Cumprimento de Metas' }, 
    { value: 0.1, color: '#F96900', label: 'Habilidade Técnica' },  
];

const StudentPieChart = () => {
    const data = [
        {
          key: indicators[0].label,
          value: indicators[0].value * 100,
          svg: { fill: indicators[0].color },
        },
        {
          key: indicators[1].label,
          value: indicators[1].value * 100,
          svg: { fill: indicators[1].color },
        },
        {
          key: indicators[2].label,
          value: indicators[2].value * 100,
          svg: { fill: indicators[2].color },
        },
        {
            key: indicators[3].label,
            value: indicators[3].value * 100,
            svg: { fill: indicators[3].color },
        }
      ];
    
      return (
        <View style={styles.container}>
          <PieChart
            style={{ height: 200, width: 200 }}
            data={data}
            innerRadius={'30%'}
            outerRadius={'70%'}
          >
          </PieChart>
        </View>
      );
}

const StudentProgressChart = () => {
    return (
        <View style={styles.container}>
            {indicators.map((item, index) => (
            <View key={`progress-ring-${index}`} style={styles.chartContainer}>
                <ProgressCircle
                    style={styles.chart}
                    progress={item.value}
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
  
const StudentTitle = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{nomeAluno}</Text>
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

const IndicatorScreen = ({ route }) => {
    const navigation = route.params.navigation;

    return (
        <View style={styles.viewStyle}>
            <StudentTitle />
            <StudentPieChart />
            <StudentProgressChart />
            <LegendCard />
            <ButtonsProps title={'Voltar'} onPress={() => navigation.goBack()}></ButtonsProps>
        </View>
    )
}

export default IndicatorScreen;