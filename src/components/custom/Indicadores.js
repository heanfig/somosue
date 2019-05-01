import React, { Component } from 'react'
import {
  View,
  Image,
  ListView,
  Text as TextRN,
  ScrollView,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { LinearGradient, Text } from '../'
import { styles, colors } from '../../resources/styles.js'
import {
  getIndicadorImg,
  getImagenCategoriaIndicador,
  getImagenIndicadoresRecursos
} from '../../api/utils.js'
import Collapsible from 'react-native-collapsible'
import { connect } from 'react-redux'


class Indicadores extends Component {

  constructor(props) {
    super(props);

    let { indicadoresEstrategicos } = props
  
    this.state = {
      indicadoresEstrategicos: indicadoresEstrategicos
    };
  }

  indicadores() {
    return this.state.indicadoresEstrategicos.map((indicador, i) => {
      return (
        <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
          <View  style={{flex: 0.2, marginRight: 10}}>
            <Image style={{flex: 1, width: undefined, height: undefined}}
              source={getImagenIndicadoresRecursos(indicador.logomobile)}
              resizeMode="cover"
           />
           </View>
           <View style={{flex: 0.8}}>
             <Text style={{fontSize: 12, color: '#227fc6'}}>{indicador.indicador}</Text>
             <Text style={{fontSize: 12, fontFamily: 'Montserrat-Light', color: '#283676'}}>{indicador.descripcion}</Text>
           </View>
        </View>
        )
    })
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View style={{ marginBottom: 30 }}>
          <ImageBackground
            source={require('../../resources/images/detalle-proyecto/banner.jpg')}
            style={[styles.headerProyecto, {height: 200, padding: 20}]}
          >
            <Image style={{
               alignItems:'center',
               justifyContent:'center',
               width: 60,
               height: 60,
               position: 'absolute',
               borderRadius: 100,
               bottom: -25
              }}
              source={require('../../resources/images/detalle-proyecto/perfil.jpg')}
            />
            <Text style={[styles.nombreProyectoH, {fontFamily: 'Montserrat-Light'}]}>
              Indicadores de la Línea Temática de Cooperación de la Unión Europea para las Organizaciones de la Sociedad Civil en Colombia (desde 2017)
            </Text>
          </ImageBackground>
        </View>
        <ScrollView style={{flex: 1, marginBottom: 10}}>{ this.indicadores() }</ScrollView>
      </View>
    )
  }
}


const mstp = state => {
  return {
    indicadoresEstrategicos: state.localData.indicadoresEstrategicos
  }
}

export default connect(mstp)(Indicadores)
