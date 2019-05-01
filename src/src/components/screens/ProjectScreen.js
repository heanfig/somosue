import React, {Component} from 'react'
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Collapsible from 'react-native-collapsible'
import Accordion from 'react-native-collapsible/Accordion'
import { connect } from 'react-redux'
import { styles } from '../../resources/styles.js'
import {
  getIconoDetalleAcordeon,
  getImagenCategoriaProyecto,
  getImagenIndicadoresRecursos,
  formatMoney
} from '../../api/utils.js'
import {
  getIndicadoresResultadosProyecto, urlApiImagenes
} from '../../api/db.js'
import { Text } from '../'
const timer = require('react-native-timer')


const CONTENT = []

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProjectScreen extends Component {

  constructor(props) {
    super(props);

    let { proyecto } = props
    let imagenes = proyecto.imagenesproyecto
    let fromMenu = props.fromMenu

    this.state = {
      imagenes: imagenes,
      proyecto: proyecto,
      activeSections: [],
      contadorDia: 0,
      contadorHora: 0,
      contadorMinuto: 0,
      contadorSegundo: 0,
      indicadores: undefined,
      fromMenu: fromMenu,
      scrollY: new Animated.Value(0)
    }

    CONTENT.splice(0, CONTENT.length)
    CONTENT.push({
      tab: 0,
      title: '¿En qué consiste?',
      content: proyecto.objetoproyecto,
    })
    CONTENT.push({
      tab: 1,
      title: '¿Cuánto cuesta?',
      subtitle: 'Valor global del proyecto',
      content: proyecto.valorproyecto,
      aporteue: proyecto.aporteue,
      aportecontrapartida: proyecto.aportecontrapartida
    })
    CONTENT.push({
      tab: 2,
      title: '¿Cómo va el proyecto?',
      content: proyecto.objetoproyecto,
      subtitle: 'Tiempo para la entrega',
      avanceproyecto: proyecto.avanceproyecto,
      resultados: proyecto.indicadoresresultadosproyecto
    })
    CONTENT.push({
      tab: 3,
      title: '¿Quiénes participan?',
      content: proyecto.contratistasproyecto,
      subtitle: 'Coordinador y Co-beneficiario'
    })
    CONTENT.push({
      tab: 4,
      title: 'Indicadores estratégicos',
    })
    CONTENT.push({
      tab: 5,
      title: 'Imágenes',
      content: proyecto.objetoproyecto,
    })
    CONTENT.push({
      tab: 6,
      title: 'Datos relevantes',
      content: proyecto.objetoproyecto,
    })
  }

  componentDidMount() {
    let fechaFin = proyecto.fechafinproyecto
    // Set the date we're counting down to
    let fecha = fechaFin.substring(0, 19)
    let countDownDate = new Date(fecha).getTime()
    // Update the count down every 1 second

    this.setState({},
      () => timer.setInterval(this, 'contadorInterval', () => {
        // Get todays date and time
        var now = new Date().getTime()
        // Find the distance between now and the count down date
        
        var distance = countDownDate - now

        // If the count down is over, timer set 00:00:00
        if (distance < 0) {
          timer.clearInterval('contadorInterval')
          days = hours = minutes = seconds = 0
        } else {
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24))
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          var seconds = Math.floor((distance % (1000 * 60)) / 1000)
        }

        // Output the result in an element with id="demo"
        this.updateContador(days, hours, minutes, seconds)
      }, 1000)
    )

    this.obtenerIndicadores()
  }

  componentWillUnmount() {
     timer.clearInterval('contadorInterval')
  }

  updateContador(days, hours, minutes, seconds) {
    this.setState({
      contadorDia: days,
      contadorHora: hours,
      contadorMinuto: minutes,
      contadorSegundo: seconds
    })
  }

  async obtenerIndicadores(){
    let indicadores = await getIndicadoresResultadosProyecto(this.state.proyecto.codigoproyecto)
    this.setState({
      indicadores: indicadores
    })
  }

  componentWillReceiveProps(nextProps){
    if (this.props.fromMenu !== nextProps.fromMenu){
      this.setState({
        fromMenu: nextProps.fromMenu
      })
    }
  }

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    })
  }

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.headerAccordion, isActive ? styles.activeAccordion : styles.inactiveAccordion]}
        transition="backgroundColor"
      >
        <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center',
          alignItems: 'center', borderColor: '#d9d9d9', borderWidth: 1}}
        >
          <Image style={{flex: 0.1, width: undefined, height: 50}}
              source={getIconoDetalleAcordeon(section.tab)} resizeMode="contain"
           />
          <Text style={[styles.headerTextAccordion, {flex: 0.8}]}>{section.title}</Text>
          <Image style={{flex: 0.1, width: undefined, height: 20}}
              source={require("../../resources/images/detalle-proyecto/dropdown_arrow.png")} resizeMode="contain"
           />
         </View>
      </Animatable.View>
    )
  }

  renderContent(section, _, isActive, state) {
    let getContent = section => {
      if(section.tab == 1)
        return (
          <View>
            <Text>{section.subtitle}</Text>
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{flex: 0.2, width: undefined, height: 80}}
                  source={require("../../resources/images/detalle-proyecto/icn_valor_global.png")} resizeMode="contain"
               />
              <Text style={{flex: 0.8, fontSize: 22, marginLeft: 10}}>{section.content}</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, marginLeft: 10}}>Aporte UE</Text>
                <Image style={{width: 30, height: 30, marginLeft: 10}}
                    source={require("../../resources/images/detalle-proyecto/ue.png")} resizeMode="contain"
                 />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22}}>€{formatMoney(section.aporteue)}</Text>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, marginLeft: 10}}>Aporte Contrapartida</Text>
                <Image style={{width: 30, height: 30, marginLeft: 10}}
                    source={require("../../resources/images/detalle-proyecto/customer.png")} resizeMode="contain"
                 />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22}}>€{formatMoney(section.aportecontrapartida)}</Text>
              </View>
            </View>
          </View>
        )
      if(section.tab == 2)
        return (
          <View>
            <Text>{section.subtitle}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
              <View style={styles.contenidoCentrado}>
                <Text style={styles.contadorValor}>{state.contadorDia}</Text>
                <Text style={{color: '#8c8c8c', fontSize: 12}}>Días</Text>
              </View>
                <Text style={[styles.contadorValor, {alignSelf: 'flex-start'}]}>:</Text>
              <View style={styles.contenidoCentrado}>
                <Text style={styles.contadorValor}>{state.contadorHora}</Text>
                <Text style={{color: '#8c8c8c', fontSize: 12}}>Horas</Text>
              </View>
              <Text style={[styles.contadorValor, {alignSelf: 'flex-start'}]}>:</Text>
              <View style={styles.contenidoCentrado}>
                <Text style={styles.contadorValor}>{state.contadorMinuto}</Text>
                <Text style={{color: '#8c8c8c', fontSize: 12}}>Minutos</Text>
              </View>
              <Text style={[styles.contadorValor, {alignSelf: 'flex-start'}]}>:</Text>
              <View style={styles.contenidoCentrado}>
                <Text style={styles.contadorValor}>{state.contadorSegundo}</Text>
                <Text style={{color: '#8c8c8c', fontSize: 12}}>Segundos</Text>
              </View>
            </View>
            <View>
              { resultados(section)}
            </View>
            <Text style={{marginTop: 10}}>Estado</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{width: 50, height: 50, alignSelf: 'flex-end', marginBottom: 10}}
                source={require('../../resources/images/detalle-proyecto/icn_avance.png')}
              />
              <Text style={styles.avanceProyecto}>{parseFloat(section.avanceproyecto).toFixed(2)}</Text>
              <Text style={{alignSelf: 'flex-end', fontSize: 14, color: 'rgba(46, 190, 84, 1)', marginBottom: 10}}>%</Text>
            </View>
          </View>
        )
      if(section.tab == 3){

        return <View>
          <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{flex: 0.2, marginRight: 10, width: undefined, height: 100, borderRadius: 50}}
                source={require("../../resources/images/detalle-proyecto/perfil.jpg")} resizeMode="contain"
            />
            <Text style={{flex: 0.8}}>{section.subtitle}</Text>
          </View>
          <View>{ contratistas(section) }</View>
        </View>
      }
      if(section.tab == 4){
        if(this.state.indicadores) return <View>{ indicadores(section) }</View>
        else return null
      }
      if(section.tab == 5){
        return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            this.state.imagenes.map((imagen, i) => {
              let urlImagen = urlApiImagenes.concat(imagen.strubicacion)
              return <View key={i} style={{flex: 1, height: 300, width: 400}}>
                <Image style={styles.responsiveImg} source={{uri: urlImagen}}
                  resizeMode="contain"
                />
                </View>
            })
          }
        </ScrollView>
      }
      if(section.tab == 6){
        return <View>
          <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{flex: 0.2, width: undefined, height: 80}}
                source={require("../../resources/images/detalle-proyecto/icn_lineatematica.png")} resizeMode="contain"
             />
            <View style={{flex: 0.8}}>
              <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>{this.state.proyecto.nombrecategoria}</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>{this.state.proyecto.objetoproyecto}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{flex: 0.2, width: undefined, height: 80}}
                source={require("../../resources/images/detalle-proyecto/icn_duracion.png")} resizeMode="contain"
             />
             <View style={{flex: 0.8}}>
              <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>Duración</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>Desde {this.state.proyecto.fechainicioproyecto.substring(0,10)}</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>Hasta {this.state.proyecto.fechafinproyecto.substring(0,10)}</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>{this.state.proyecto.duracionproyecto} días</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{flex: 0.2, width: undefined, height: 80}}
                source={require("../../resources/images/detalle-proyecto/icn_estado.png")} resizeMode="contain"
             />
            <View style={{flex: 0.8}}>
              <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>Estado</Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>Proyecto actualmente en: {this.state.proyecto.estadoproyecto}</Text>
            </View>
          </View>
        </View>
      }
      else
        return <Text style={{fontFamily: 'Montserrat-Light'}}>{section.content}</Text>
    }

    let contratistas = section => {
      let contratistas = []
      contratistas = section.content.slice()
      return contratistas.map((contratista, i) => {
        return (
            <View key={i}>
              <Text style={{marginBottom: 10}}>{contratista.nombreobra}</Text>
              <Text style={{marginBottom: 10}}>{contratista.nombrecontrato}</Text>
              <Text style={{marginBottom: 10}}>{contratista.nombrecontratista}</Text>
            </View>
          )
      })
    }

    let indicadores = section => {
      return this.state.indicadores.map((indicador, i) => {
        return (
          <View key={i} style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{flex: 0.2, marginRight: 10}}>
            <Image style={{flex: 1, width: undefined, height: undefined}}
                source={getImagenIndicadoresRecursos(indicador.logomobile)}
                resizeMode="cover"
            />
          </View>
            <View style={{flex: 0.8}}>
              <Text style={{fontSize: 12, color: '#227fc6'}}>{indicador.indicador}</Text>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat-Light', color: '#283676'}}>
                {indicador.descripcion}
              </Text>
            </View>
          </View>
          )
      })
    }

    let resultados = section => {
      let resultados = []
      resultados = section.resultados.slice()
      return resultados.map((resultado, i) => {
        return (
            <View key={i} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../resources/images/detalle-proyecto/icn_resultados.png')}
                  style={{height: 15, width: 15, marginRight: 10, alignSelf: 'center'}} resizeMode='contain'
                />
                <Text>Resultado {i+1}:</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 0.3}}>
                  <Text style={styles.textResultadosTitulo}>Resultado</Text>
                  <Text style={styles.textResultados}>{resultado.nombre}</Text>
                </View>
                <View style={{flex: 0.3}}>
                  <Text style={styles.textResultadosTitulo}>Peso ponderado</Text>
                  <Text style={styles.textResultados}>{resultado.peso}</Text>
                </View>
                <View style={{flex: 0.3}}>
                  <Text style={styles.textResultadosTitulo}>Avance ponderado</Text>
                  <Text style={styles.textResultados}>{resultado.porcentaje}</Text>
                </View>
              </View>
            </View>
          )
      })
    }

    return (
      <Animatable.View
        duration={400}
        style={[styles.contentAccordion, isActive ? styles.activeAccordion : styles.inactiveAccordion]}
        transition="backgroundColor"
      >
      { getContent(section) }
      </Animatable.View>
    )
  }

  _renderScrollViewContent() {
    const { activeSections } = this.state

    return (
      <View style={styles.scrollViewContent}>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={this.renderHeader}
          renderContent={(section, _, isActive) => this.renderContent(section, _, isActive, this.state)}
          duration={400}
          onChange={this.setSections}
        />
      </View>
    );
  }

  render() {
    if(this.state.fromMenu){
      this.props.navigation.goBack()
    }

    return (
      <View style={styles.fill}>
        <Header
          nombreproyecto={this.state.proyecto.nombreproyecto}
          imagenproyecto={this.state.proyecto.imagenproyecto}
          nombrecategoria={this.state.proyecto.nombrecategoria}
          imagencategoria={this.state.proyecto.imagencategoria}
          codigocategoria={this.state.proyecto.codigocategoria}
          colorcategoria={this.state.proyecto.colorcategoria}
          scrollY={this.state.scrollY}
          goBack={() => this.props.navigation.goBack()}
        />
        <ScrollView
            style={[styles.fill, {marginTop: 50}]}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
      </View>
    );
  }
}

function Header(props){
  const headerHeight = props.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const imageOpacity = props.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = props.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  const textTranslate = props.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });

  let imagenProyecto = {uri: urlApiImagenes.concat(props.imagenproyecto)}
  return (
      <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Animated.Image
              style={[
                styles.backgroundImage,
                {transform: [{translateY: imageTranslate}]},
              ]}
              source={require('../../resources/images/detalle-proyecto/banner.jpg')}
          />
          <Animated.Image style={{
              alignSelf: 'center', marginTop: 30, width: 40, height: 40,
              opacity: imageOpacity, transform: [{translateY: imageTranslate}],
            }}
            source={getImagenCategoriaProyecto(props.codigocategoria)}
          />
          <View style={styles.bar}>
            <Text style={[styles.categoriaProyectoH,
                {fontSize: 20, color: props.colorcategoria}
              ]}
            >
              {props.nombrecategoria}
            </Text>
            <Animated.View style={{transform: [{translateY: textTranslate}],}}>
              <Text style={styles.nombreProyectoH}>{props.nombreproyecto}</Text>
            </Animated.View>
          </View>
          <Animated.Image style={{
              alignSelf: 'center', width: 80, height: 80, borderRadius: 50, marginTop: 35,
              opacity: imageOpacity, transform: [{translateY: imageTranslate}],
            }}
            source={imagenProyecto}
          />
          <TouchableOpacity
           style={{
               alignItems:'center',
               justifyContent:'center',
               width: 50,
               height: 50,
               position: 'absolute',
               top: 5
             }}
             onPress={() => props.goBack()}
          >
           <Image
              style={{height: 30, width: 30}}
              source={require("../../resources/images/detalle-proyecto/left_arrow.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
      </Animated.View>
  )
}

const mstp = state => {
  return {
    proyecto: state.localData.proyecto,
    fromMenu: state.localData.fromMenu
  }
}

export default connect(mstp)(ProjectScreen)