import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { filterStyle } from './style_filter';
import { Picker } from '@react-native-picker/picker';
import axios from "axios"
import { DateModal } from './Modal/dateModal';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { LoadModal } from './Modal/loadModal';
import { ButtonCertificado } from './modesAction/button.certificado';
import { ButtonAval } from './modesAction/button.aval';
import { ButtonIndicador } from './modesAction/button.indicador';
import { ButtonPresenca } from './modesAction/button.presenca';
import { configHttp } from '../../config';

//import RNFS from 'react-native-fs';
const iconspath = {
  certificado: require('../../assets/certificado.png'),
  indicador: require('../../assets/indicador.png'),
  avaliacao: require('../../assets/avaliacao.png'),
  presenca: require('../../assets/presenca.png')
}

export const FilterScreen = () => {
  //modals
  const [modaldate, setmodaldate] = useState(false) //modal para o pop up de datas
  const [modalload, setmodaload] = useState({ status: false, msg: "" }) //modal para o pop up de loadscreens
  //turmas option
  const [rawData, setrawData] = useState([]);//toodos os dados da req
  const [visibleData, setVisibleData] = useState([]);//so os dados que serao mostrado e aki que é aplicado os filtros
  //filters
  const [selectedDate, setSelectedDate] = useState('Data');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectName, setSelectedName] = useState('');
  //escolhas do cliente
  const [student, setStudent] = useState('');
  const [mode, setMode] = useState()
  //
  //modes

  //Use Effects
  useEffect(() => {
    console.log(`O valor do contador foi alterado para: ${student}`);

  }, [student]);

  useEffect(() => {
    const getTurmas = async () => {
      setmodaload({ status: true, msg: "Carregando dados" })
      let url = `http://${configHttp.url_base}/dataverse/alunos`
      let res = await axios.get(url).then(
        (res) => {
          return res.data
        }
      )
        .catch(
          () => {
            alert('falha ao carregar os dados tente novamente')
            setmodaload({ status: false, msg: '' })
            throw new Error('nao foi possivel conseguir os dados')
          }
        )
      console.log(res)
      let { value } = res
      setrawData(value)
      //console.log(rawData)
      setVisibleData(value)
      setmodaload({ status: false, msg: "" })

    }
    getTurmas();
  }, []);

  //filtro para aplicar filtros
  const applyfilters = () => {
    let filter_itens = rawData
    if (selectedDate) {
      //fazer a logica de filtro de datas
    }

    if (selectedOption) {
      filter_itens = filter_itens.filter((filt) => { return filt.cr0bb_turma === selectedOption })
    }

    if (selectName !== '' && selectName !== ' ') {
      filter_itens = filter_itens.filter((filt) => {
        let fix_name = filt.cr0bb_nome.toLowerCase();
        let fix_name_search = selectName.toLowerCase();
        return fix_name.indexOf(fix_name_search) !== -1
      })
    }
    else {
      console.log()
    }

    setVisibleData(filter_itens)
  }

  // Função para lidar com a seleção de uma data
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Função para lidar com a seleção de uma opção no dropdown
  const handleOptionChange = (itemValue) => {//isso aki é o drop down da turma
    console.log('--->', itemValue)
    setSelectedOption(itemValue);
  };

  useEffect(() => {
    const execute_interface = async () => {
      if (!mode) {
        console.log('é null')
        return
      } else {
        await mode.execute_mode_funtion(student)
      }
    }
    execute_interface()
    setStudent(null)
  }, [mode])

  useEffect(() => {//temos que usar isso pois o set é assincrono ai usamos o useEffect para ser observador da var selectedOption, quando ela mudar é exec a func abaixo
    applyfilters()
  }, [selectedOption]);

  const handleNameChange = (itemValue) => {
    setSelectedName(itemValue);
  };

  useEffect(() => {//temos que usar isso pois o set é assincrono ai usamos o useEffect para ser observador da var selectedOption, quando ela mudar é exec a func abaixo
    applyfilters()
  }, [selectName]);

  const modalcall = () => {
    console.log('modal foi chamado')
    setmodaldate(true)
  }
  // Aqui você pode definir as opções do dropdown
  const renderPickerItems = (data) => {//faz com que nao tenha valores duplicados as turma no filtro de turmas

    const uniqueOptions = [...new Set(data.map(option => option.cr0bb_turma))];

    return uniqueOptions.map((option, index) => (
      <Picker.Item key={index} label={option} value={option} />
    ));
  }

  return (

    <ImageBackground source={require('../../assets/back-ground.png')} style={filterStyle.canva}>
      <LoadModal status={modalload.status} msg={modalload.msg}></LoadModal>

      <DateModal status={modaldate} func={setmodaldate} datefilter={setSelectedDate} />

      <View style={[filterStyle.canva_filter, { marginTop: 40 }]}>
        <View style={filterStyle.display_filter}>
          {/* Campo de entrada de dropdown tavleze mudar de flex para grid*/}
          <View style={filterStyle.button_dividido}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={handleOptionChange}
              style={filterStyle.button_piecker}
            >
              {/*default option do select enabled={false}*/}
              <Picker.Item label="Turma" value="" />
              {renderPickerItems(rawData)}
            </Picker>

          </View>
        </View>
        {/* Botão para aplicar o filtro */}

        <View style={filterStyle.display_filter}>
          {/* Campo de entrada de data */}
          <TouchableOpacity
            value={selectedDate}
            style={filterStyle.button_dividido}
            onPress={modalcall}
          >
            <Text>{selectedDate}</Text>
          </TouchableOpacity>
        </View>


      </View>
      <View style={filterStyle.name_filter}>
        <TextInput
          placeholder="Nome do Estudante"
          value={selectName}
          style={filterStyle.button_unico}
          onChangeText={(option) => {
            handleNameChange(option)
          }}
        />

      </View >

      <View style={filterStyle.ScrollView_canva}>
        <ScrollView style={filterStyle.canva_result}>
          {
            visibleData.map((option, index) => (
              <TouchableOpacity Item key={index} style={filterStyle.display_results} onPress={() => {
                setStudent(option)//seleciono o aluno
                pick(option, mode, setmodaload)
              }
              }>
                <Text>{option.cr0bb_nome + "\n" + option.cr0bb_rg}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      {
        student &&
        <View style={[filterStyle.canva_botton_buttons, { marginTop: 10 }]} >
          <ButtonsModes src={iconspath.avaliacao} mode={() => {
            setMode(new ButtonAval())

          }}></ButtonsModes>
          {/*func={()=>dowload(setmodaload)}*/}
          <ButtonsModes src={iconspath.certificado} mode={() => {
            setMode(new ButtonCertificado())

          }}  ></ButtonsModes>
          <ButtonsModes src={iconspath.indicador} mode={() => {
            setMode(new ButtonIndicador())
          }}></ButtonsModes>
          <ButtonsModes src={iconspath.presenca} mode={() => {
            setMode(new ButtonPresenca())
          }}></ButtonsModes>
        </View>
      }


    </ImageBackground>
  );
};

const pick = async (person_infos, mode, setmodalload) => {
  try {
    let event = new EventEmitter();

  }
  catch (err) {
    console.log(err)
  }
  // alert(person_infos.cr0bb_nome + "   " + person_infos.cr0bb_turma )
};


const ButtonsModes = (props) => {
  const funcs = () => {
    props.mode
  }
  return (
    <View style={filterStyle.canva_hidde_button}>
      <TouchableOpacity onPress={props.mode} style={filterStyle.buttons_mode}>
        <Image source={props.src} style={filterStyle.img_buttons} />
      </TouchableOpacity>
    </View>
  )
}







