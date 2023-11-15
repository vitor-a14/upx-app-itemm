import React, { useDebugValue, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { filterStyle } from './style_filter';
import { Picker } from '@react-native-picker/picker';
import axios from "axios"
import { DateModal } from './Modal/dateModal';
import { LoadModal } from './Modal/loadModal';
import { ButtonCertificado } from './modesAction/button.certificado';
import { ButtonAval } from './modesAction/button.aval';
import { ButtonIndicador } from './modesAction/button.indicador';
import { ButtonPresenca } from './modesAction/button.presenca';
import { configHttp } from '../../config';
import { PresencaModal } from './Modal/presencaModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';



//import RNFS from 'react-native-fs';
const iconspath = {
  certificado: require('../../assets/certificado.png'),
  indicador: require('../../assets/indicador.png'),
  avaliacao: require('../../assets/avaliacao.png'),
  presenca: require('../../assets/presenca.png')
}

export const FilterScreen = ({ route, navigation }) => {
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user")
      if (user) {
        setuser(user)
      }
      else {
        return alert('sem usuario')
      }
      await getdata();
    })();
  }, [route.params?.key]);
  const [user, setuser] = useState("")
  //modals
  const [modaldate, setmodaldate] = useState(false) //modal para o pop up de datas
  const [modalload, setmodaload] = useState({ status: false, msg: "" }) //modal para o pop up de loadscreens
  const [modalpresenca, setmodalpresenca] = useState(false) //modal para o pop up de loadscreens

  //turmas option
  const [rawData, setrawData] = useState([]);//toodos os dados da req
  const [visibleData, setVisibleData] = useState([]);//so os dados que serao mostrado e aki que é aplicado os filtros
  //filters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectName, setSelectedName] = useState(null);
  //escolhas do cliente
  const [student, setStudent] = useState('');
  const [mode, setMode] = useState(undefined)
  //
  //modes

  useEffect(() => {

    (async () => {
      const user = await AsyncStorage.getItem("user")
      if (user) {
        setuser(user)
      }
      else {
        return alert('sem usuario')
      }
      await getdata();
    })();

  }, []);

  //Use Effects

  const getdata = async () => {
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
    let { value } = res
    setrawData(value)
    setVisibleData(value)
    setmodaload({ status: false, msg: "" })
    if (selectedDate) {
      await applyfilters()
    }
  }



  //filtro para aplicar filtros
  const applyfilters = async () => {
    setmodaload({ status: true, msg: "filtrando dados" })

    let filter_itens = rawData
    if (selectedDate !== null && selectedDate !== "") {
      //fazer a logica de filtro de datas
      let presence_of_day = await checkPresence(selectedDate)
      filter_itens = filter_itens.filter((filt) => {
        for (let already_done of presence_of_day) {
          let status = false
          if (filt.cr0bb_autonumber === already_done.cr0bb_idaluno) {
            if (already_done.cr0bb_presenca === "true") {
              filt['status'] = { presenca: true }
              if (already_done.cr0bb_cumprimentodemetas === null ||
                already_done.cr0bb_presenca === null ||
                already_done.cr0bb_habilidadestecnicas === null ||
                already_done.cr0bb_participacao === null) {
                filt['status'] = { presenca: true, aval: false }
              }
              else {
                filt['status'] = { presenca: true, aval: true }
              }
              status = true
              break
            }
            else {
              filt['status'] = { presenca: false }
              status = true
              break
            }
          }
          if (!status) filt['status'] = { presenca: undefined }

        }
        return filt
      })
    }

    if (selectedOption !== null && selectedOption !== "") {
      filter_itens = filter_itens.filter((filt) => { return filt.cr0bb_turma === selectedOption })
    }

    if (selectName !== null && selectName !== ' ' && selectName !== '') {
      filter_itens = filter_itens.filter((filt) => {
        let fix_name = filt.cr0bb_nome.toLowerCase();
        let fix_name_search = selectName.toLowerCase();
        return fix_name.indexOf(fix_name_search) === 0
      })
    }

    setmodaload({ status: false, msg: "" })

    setVisibleData(filter_itens)
  }

  // Função para lidar com a seleção de uma data


  // Função para lidar com a seleção de uma opção no dropdown
  const handleOptionChange = (itemValue) => {//isso aki é o drop down da turma
    setSelectedOption(itemValue);
  };

  useEffect(() => {
    const execute_interface = async (estudante) => {
      try {
        if (!mode) {
          return
        } else {
          if (mode instanceof ButtonPresenca) {
            await mode.execute_mode_funtion(estudante, navigation, true, selectedDate)
            await applyfilters()
            return
          }
          setmodaload({ status: true, msg: 'realizando ação' })
          await mode.execute_mode_funtion(estudante, navigation)
          setmodaload({ status: false, msg: '' })
        }
      }
      catch (err) {
        console.log(err)
      }

    }
    execute_interface(student).then(() => setStudent(undefined))
  }, [mode])

  useEffect(() => {//temos que usar isso pois o set é assincrono ai usamos o useEffect para ser observador da var selectedOption, quando ela mudar é exec a func abaixo
    if (selectedOption === null) return
    applyfilters()
  }, [selectedOption]);

  useEffect(() => {//temos que usar isso pois o set é assincrono ai usamos o useEffect para ser observador da var selectedOption, quando ela mudar é exec a func abaixo
    if (selectedDate === null) return
    getdata().then(() => { applyfilters() })
  }, [selectedDate]);

  useEffect(() => {//temos que usar isso pois o set é assincrono ai usamos o useEffect para ser observador da var selectedOption, quando ela mudar é exec a func abaixo
    if (selectName === null) return
    applyfilters()
  }, [selectName]);

  const handleNameChange = (itemValue) => {
    setSelectedName(itemValue);
  };

  const modalcall = () => {
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

      <DateModal status={modaldate} func={setmodaldate} onchange={setSelectedDate} />

      <PresencaModal date={selectedDate} aluno={student} status={modalpresenca} ok={setMode} reject={setmodalpresenca}></PresencaModal>

      <View style={filterStyle.canva_filter}>
        <View style={filterStyle.display_filter}>
          <View style={filterStyle.button_dividido}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={handleOptionChange}
              style={filterStyle.button_piecker}
            >
              <Picker.Item label="Turmas" value={""} />
              {renderPickerItems(rawData)}
            </Picker>

          </View>
        </View>

        <View style={filterStyle.display_filter}>
          {/* Campo de entrada de data */}
          <TouchableOpacity
            value={selectedDate}
            style={filterStyle.button_dividido}
            onPress={modalcall}
          >
            {
              selectedDate && selectedDate !== "" ? (
                <Text>{selectedDate}</Text>

              ) : (
                <Text>{"Data"}</Text>

              )

            }
          </TouchableOpacity>
        </View>
      </View>
      {/*canva do header dois campos de cima*/}

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
              <TouchableOpacity
                key={index}
                style={[
                  filterStyle.display_results,
                  student === option ? { backgroundColor: 'rgba(89, 123, 237, 193)' } : 'rgba(226,238,252, 225)'
                ]}
                onPress={() => {
                  if (student === option) return setStudent('');
                  setStudent(option); // selecione o aluno
                }}
              >
                <Text>{option.cr0bb_nome + "\n" + option.cr0bb_rg}</Text>
                <View style={filterStyle.canva_icon}>
                  {
                    option.status?.presenca !== undefined && (
                      <Icon name="user" color={colorHandle(option.status?.presenca)} size={20} />
                    )}
                  {
                    option.status?.aval !== undefined && (
                      <Icon name='circle' color={colorHandle(option.status?.aval)}></Icon>
                    )}
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      {
        student //se tiver student aparece os botoes
        &&
        <View style={filterStyle.canva_botton_buttons} >
          <ButtonsModes src={iconspath.avaliacao} mode={() => {

            if (!student) return alert('Aluno nao pode ser avaliado!!->' + student)
            if (!student.status?.presenca) return alert('aluno nao pode ser avaliado!!!')
            setMode(new ButtonAval(selectedDate))
          }}></ButtonsModes>
          {/*func={()=>dowload(setmodaload)}*/}
          <ButtonsModes src={iconspath.certificado} mode={() => {
            setMode(new ButtonCertificado())
          }}  ></ButtonsModes>
          <ButtonsModes src={iconspath.indicador} mode={() => {
            setMode(new ButtonIndicador())
          }}></ButtonsModes>
          <ButtonsModes src={iconspath.presenca} mode={() => {
            if (selectedDate === null) return alert('é preciso informar a data para fazer a chamada')
            setmodalpresenca(true)
          }}></ButtonsModes>
        </View>
      }


    </ImageBackground>
  );
};



const ButtonsModes = (props) => {
  return (
    <View style={filterStyle.canva_hidde_button}>
      <TouchableOpacity onPress={props.mode} style={filterStyle.buttons_mode}>
        <Image source={props.src} style={filterStyle.img_buttons} />
      </TouchableOpacity>
    </View>
  )
}




async function checkPresence(someDate) {
  try {
    const [day, month, year] = someDate.split('/')
    const param_date = new Date(year, month - 1, day)
    const res = await axios.get(`http://${configHttp.url_base}/dataverse/avaliacao`)
    const data = res.data.value.filter((filt) => {
      const partes = filt.cr0bb_datapresenca.split("/");
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10);
      const ano = parseInt(partes[2], 10);
      const data = new Date(ano, mes - 1, dia); // Mês é base 0, então subtrai 1
      return data.getTime() === param_date.getTime()
    })
    return data
  }
  catch (err) {
    throw new Error('nao foi possivel fazer o filtro')
  }
}

const colorHandle = (status) => {
  if (status === true) {
    return 'green'
  }
  return "red"
}

