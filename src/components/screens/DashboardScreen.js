import React, { Component } from 'react'
import {
  View,
  Image,
  ListView,
  TouchableOpacity,
  Text as TextRN,
  TextInput,
  ScrollView,
  StyleSheet,
  NetInfo,
  Alert,
  Dimensions
} from 'react-native'
import { LinearGradient, Text } from '../'
import { styles, colors } from '../../resources/styles.js'
import {
  getSemaforoImg,
  getImagenCategoria,
  getIndicadorImg,
  getImagenCategoriaIndicador,
  kFormatter,
  pFormatter,
  numberWithCommas,
  getIconoVallaProyecto,
  getSemaforoValla
} from '../../api/utils.js'
import { updateLocalData, getLocalData, getProyecto, getProyectos, urlApiImagenes } from '../../api/db.js'
import MapView from 'react-native-maps'
import Collapsible from 'react-native-collapsible'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class DashboardScreen extends Component {

  static navigationOptions = {
    header: null
  }

  static deltaX = 0;
  static LIMIT_INDICATORS_WIDTH = 1510;
  static DELAY_INDICATORS_INTERVAL = 50;
  static DELAY_INDICATORS_TIMEOUT_END = 2000;
  static SCROLL_OFFSET_VARIANT = 2;

  constructor(props){
    super(props)

    this._scroll = null;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let { proyectos, indicadores, latitud, longitud } = props

    this.state = {
      dataSource: ds,
      proyectos: proyectos,
      proyectosConst: proyectos,
      indicadores: indicadores,
      categoriaSeleccionada: indicadores[0],
      latitud: latitud,
      longitud: longitud,
      vallaVisible: false,
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this._interval = null;
  }

  componentWillMount(){
    this.centrarMapa()
  }

  componentWillUnmount() {
    clearIntervalEventView();
    DashboardScreen.deltaX = 0;
  }

  centrarMapa(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const accuracy = position.coords.accuracy
        this.calcularDelta(lat, lon, accuracy)
      },
      (error) => this.setState({
        region: {
          latitude: 10.387206,
          longitude: -75.481724,
          latitudeDelta: 1,
          longitudeDelta: 0
        }
      })
    )
  }

  calcularDelta(lat, lon, acc){
    const unGradoLongMetros = 111.32
    const circunferencia = (40075 / 360)

    const latitudeDelta = acc * (1 / (Math.cos(lat) * circunferencia))
    const longitudeDelta = (acc / unGradoLongMetros)

    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 1,
        longitudeDelta: 0
      }
    })
  }

  handleInputChange(value) {
    this.setState({inputSearch: value})
  }

  async buscar() {
    let isConn
    await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })

    if(isConn)
      await updateLocalData(
        this.state.categoriaSeleccionada.codigocategoria,
        this.state.inputSearch,
        this.state.latitud,
        this.state.longitud
      )

    let { proyectos } = await getLocalData()

    this.setState({
      proyectos: proyectos,
      proyectosConst: proyectos
    })
  }

  mapa() {
    this.setState({
      verMapa: true
    })
  }

  lista() {
    this.setState({
      verMapa: false
    })
  }

  getMarkerImage(code){
    switch(code) {
      case 1:
        return require('../../resources/images/home-proyectos/mapa_jovenes.png')
      case 2:
        return require('../../resources/images/home-proyectos/mapa_fortalecimiento.png')
      case 3:
        return require('../../resources/images/home-proyectos/mapa_educacion.png')
      case 4:
        return require('../../resources/images/home-proyectos/mapa_desarrollo.png')
      default:
        return require('../../resources/images/undefined.png')
    }
  }

  async seleccionarCategoria(indicador){
    let isConn
    await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })

    if(isConn)
      await updateLocalData(indicador.codigocategoria, "", this.state.latitud,
        this.state.longitud)

    let { proyectos } = await getLocalData()

    this.setState({
      proyectos: proyectos,
      proyectosConst: proyectos,
      categoriaSeleccionada: indicador
    })
  }

  async verProyecto(codigoproyecto) {
    const { navigate } = this.props.navigation
    proyecto = await getProyecto(codigoproyecto, this.state.latitud, this.state.longitud)
    
    this.props.dispatch({
      type: 'SET_PROYECTO',
      payload: {
        proyecto: proyecto,
        fromMenu: false
      }
    })

    navigate('Project')
    this.cerrarValla()
  }

  async abrirValla(codigoproyecto) {
    proyecto = await getProyecto(codigoproyecto, this.state.latitud, this.state.longitud)
    
    this.props.dispatch({
      type: 'SET_PROYECTO',
      payload: {
        proyecto: proyecto
      }
    })

    this.setState({
      vallaVisible: true,
      proyecto: proyecto
    })
  }

  cerrarValla(){
    this.setState({
      vallaVisible: false
    })
  }

  setProyecto(text){
    nombre = text
  }

  markerClick(proyecto) {
    
  }

  render() {
    let getMap = (centrarMapa) => {

      if(this.state.verMapa){
        return <View style={StyleSheet.absoluteFillObject}>
            <MapView style={{flex: 1}} initialRegion={this.state.region} region={this.state.region}>
              { getMapMarkers() }
            </MapView>
            {this.state.vallaVisible ?
              <Valla
                proyecto={this.state.proyecto}
                verProyecto={(codigoProyecto) => this.verProyecto(codigoProyecto)} 
              /> : null
            }
            <TouchableOpacity
             style={{
                 alignItems:'center',
                 justifyContent:'center',
                 width:60,
                 height:60,
                 position: 'absolute',
                 bottom: 10,
                 left: 10,
                 borderRadius:100,
               }}
               onPress={() => this.centrarMapa()}
            >
             <Image
                style={{height: 60, width: 60}}
                source={require("../../resources/images/home-proyectos/btn_mapa_centrar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
      } else {
        return <ListView
            dataSource={this.state.dataSource.cloneWithRows(
              this.state.proyectos
            )}

            enableEmptySections={true}
            renderRow={(rowData) =>
              <ProyectosItem
                verProyecto={(codigoproyecto) => this.verProyecto(codigoproyecto)}
                content={rowData}
              />
            }
          />
      }
    }

    let getMapMarkers = () => {
        return this.state.proyectos.map((proyecto, i) => {
          return <MapView.Marker
            key={i}
            coordinate={{
              latitude: proyecto.latitudproyecto,
              longitude: proyecto.longitudproyecto
            }}
            title="Proyecto"
            description={proyecto.nombrecategoria}
            image={this.getMarkerImage(proyecto.codigocategoria)}
            onCalloutPress={() => this.abrirValla(proyecto.codigoproyecto)}
          >
            <MapView.Callout>
                  <View>
                      <Text>Ver detalles</Text>
                  </View>
            </MapView.Callout>
          </MapView.Marker>
        })
    }

    return (
        <View style={styles.container}>
          <Search buscar={() => this.buscar()} handleInputChange={(e) => this.handleInputChange(e)}
            mapa={() => this.mapa()} lista={() => this.lista()} verMapa={this.state.verMapa} />
          <Indicadores indicador={this.state.categoriaSeleccionada} />
          <Filtros
            indicadores={this.state.indicadores}
            seleccionarCategoria={(indicador) => this.seleccionarCategoria(indicador)}
            categoriaSeleccionada={this.state.categoriaSeleccionada.codigocategoria}
          />
          <View style={styles.listaContainer}>
            { getMap(this.centrarMapa) }
          </View>
        </View>
    )
  }
}

function Filtros(props) {
  let indicadores = props.indicadores

  return (
      <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 0.15, padding: 5}}>
          <Image
            style={{flex: 1, alignSelf: 'stretch'}}
            source={require("../../resources/images/indicadores-globales/hand.png")}
            resizeMode="contain"
          />
        </View>
        <ScrollView horizontal={true} style={{flex: 0.85}} showsHorizontalScrollIndicator={false}>
          {
            indicadores.map((indicador, i) => {
              return <TouchableOpacity 
                  key={i} style={{flex: 1, height: 40, width: null}}
                  onPress={() => props.seleccionarCategoria(indicador)}
                >
                  <Image
                    style={{flex: 1, alignSelf: 'stretch'}}
                    source={getImagenCategoriaIndicador(indicador.codigocategoria, props.categoriaSeleccionada)}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
  )
}

function ProyectosItem(props){
  let item = props.content
  let semaforo = getSemaforoImg(item.semaforoproyecto)

  return (
    <View style={styles.proyectosItem}>
      <View style={[styles.proyectosItemTitleContainer, {backgroundColor: item.colorcategoria}]}>
        <Image style={{flex: 0.1, width: undefined, height: 20}}
          source={getImagenCategoria(item.codigocategoria)} resizeMode="contain"
        />
        <Text style={[styles.proyectosItemTitle, {flex: 0.75}]}>{item.nombrecategoria}</Text>
        <Text style={[styles.proyectosItemTitle, {flex: 0.15}]}>{item.distaciaproyecto}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.85}}>
          <Text style={styles.proyectosItemName}>{item.nombreproyecto}</Text>
          <View style={styles.proyectosItemFooterContainer}>
            <Text style={styles.proyectosItemPrice}>{item.valorproyecto}</Text>
            <Text style={styles.proyectosItemPrice}>{'|'}</Text>
            <Text style={styles.proyectosItemPrice}>{item.avanceproyecto}</Text>
            <Text style={styles.proyectosItemPrice}>{'|'}</Text>
            <Image style={{width: 70, height: 50}} source={semaforo} resizeMode="contain" />
          </View>
        </View>
        <TouchableOpacity style={{flex: 0.15, justifyContent: 'center', alignItems: 'center', padding: 5}}
          onPress={() => props.verProyecto(item.codigoproyecto)}
        >
          <Image source={require('../../resources/images/home-proyectos/btn_enlace.png')} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Valla(props) {
  let proyecto = props.proyecto
  let imagenProyecto = urlApiImagenes.concat(proyecto.imagenproyecto)

  return (
    <View style={[styles.valla, {backgroundColor: proyecto.colorcategoria}]}>
      <View style={{flex: 0.65, flexDirection: 'row'}}>
        <View style={{flex: 0.2}}>
          <Image style={styles.imagenProyectoValla} source={{uri: imagenProyecto}} resizeMode='contain' />
          <Image style={{
               width:30,
               height:30,
               position: 'absolute',
               bottom: 0,
               right: 0,
               borderWidth: 2,
               borderRadius: 60,
               borderColor: 'rgba(0, 50, 125, 1)'
            }}
            source={getIconoVallaProyecto(proyecto.imagencategoria)} 
          />
        </View>
        <View style={{flex: 0.8, marginLeft: 10}}>
          <Text style={{color: '#fff', fontSize: 12}}>{proyecto.nombreproyecto}</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 10, width: 10, alignSelf: 'center'}}
              source={require('../../resources/images/home-proyectos/valla_pointer.png')}
            />
            <Text style={{color: '#fff', fontSize: 10}}>{proyecto.localidadproyecto}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.35, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
        <View style={{flex: 0.32}}>
          <Text style={{color: '#fff', fontSize: 12}}>Avance</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 20, width: 20, alignSelf: 'center'}}
              source={getSemaforoValla(proyecto.semaforoproyecto)}
            />
            <Text style={{color: '#fff', fontSize: 11}}>{proyecto.avanceproyecto}</Text>
          </View>
        </View>
        <View style={{flex: 0.32}}>
          <Text style={{color: '#fff', fontSize: 12}}>Estado</Text>
          <Text style={{color: '#fff', fontSize: 11}}>{proyecto.estadoproyecto}</Text>
        </View>
        <View style={{flex: 0.32}}>
          <Text style={{color: '#fff', fontSize: 12}}>Valor</Text>
          <Text style={{color: '#fff', fontSize: 11}}>{proyecto.valorproyecto}</Text>
        </View>
      </View>
      <TouchableOpacity style={{position: 'absolute', bottom: -30, right: 10, padding: 5}}
        onPress={() => props.verProyecto(proyecto.codigoproyecto)}>
        <Image
          source={require('../../resources/images/home-proyectos/btn_enlace.png')}
          style={{height: 45, width: 45}}
        />
      </TouchableOpacity>
    </View>
  )
}

function Search(props){
  return (
    <LinearGradient style={{flex: 0.2}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors.blueGradient}>
      <View>
        <View style={[styles.searchBox, {paddingBottom: 5, paddingTop: 10}]}>
          <Image style={{width: 40, height: 40}} source={require("../../resources/images/header/logo.png")} />
          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.09)', borderRadius: 10,}}>
            <Icon type="MaterialCommunityIcons" style={{paddingLeft: 10, paddingRight: 5}} name="magnify" size={20} color="#fff"/>
            <TextInput
              style={[styles.searchInputText, styles.textInput, styles.textRN]}
              placeholder='¿Qué proyecto buscas?'
              placeholderTextColor='#e2ebf6'
              onChangeText={(text) => props.handleInputChange(text)}
            />
          </View>
          <TouchableOpacity
              onPress={() => props.buscar()}
              style={styles.buttonBuscar}>
              <View style={[{flexDirection: 'row', paddingLeft: 5, justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={styles.textButtonForm}>
                  Buscar
                </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBox, {paddingBottom: 10}]}>
          <TouchableOpacity
              onPress={() => props.mapa()}
              style={props.verMapa ? styles.buttonFormSelected : styles.buttonForm}>
              <View 
                style={[{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }]}>
                <Image style={{width: 20, height: 20}}
                  source={require("../../resources/images/header/btn_vista_mapa.png")}
                />
                <Text style={styles.textButtonForm}>
                  MAPA
                </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.lista()}
              style={!props.verMapa ? styles.buttonFormSelected : styles.buttonForm}>
              <View style={[{flexDirection: 'row', paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}]}>
                <Image style={{width: 20, height: 20}}
                  source={require("../../resources/images/header/btn_vista_lista.png")}
                />
                <Text style={styles.textButtonForm}>
                  LISTADO
                </Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

/**
 * Clear Interval 
 * @constructor
 */
function clearIntervalEventView(){
  if(this._interval != null){
    clearInterval(this._interval);
  }
}

/**
 * init Scroll Event on Component
 * @constructor
 */
function InitScrollEvent(){
  clearIntervalEventView();
  this._interval = setInterval(() => {
    DashboardScreen.deltaX = DashboardScreen.deltaX + DashboardScreen.SCROLL_OFFSET_VARIANT;
    this._scroll.scrollTo({ x: DashboardScreen.deltaX, animated: true });
  }, DashboardScreen.DELAY_INDICATORS_INTERVAL);
}

/**
 * Reset indicators Event on finish scroll
 * @constructor
 * @param {event} event - Current Event
 */
function resetIndicadoresScrollEvent(event){
    const { width }               = Dimensions.get('window'),
          scrollOffsetX           = event.nativeEvent.contentOffset.x;
    if( scrollOffsetX + width >= DashboardScreen.LIMIT_INDICATORS_WIDTH ){
      DashboardScreen.deltaX = 0;
      clearIntervalEventView();
      setTimeout(() => {
        this._scroll.scrollTo({ x: 0, animated: true });
        InitScrollEvent();
      },DashboardScreen.DELAY_INDICATORS_TIMEOUT_END);
    }
}

/**
 * get ScrollView Dimen
 */
onContentSizeChange = (contentWidth, contentHeight) => {
  DashboardScreen.LIMIT_INDICATORS_WIDTH = contentWidth - 1;
};

function Indicadores(props) {
  let indicador = props.indicador
  let codigoCategoria = indicador.codigocategoria

  return (
      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView
          scrollEnabled={false}
          ref={(scroll) => {this._scroll=scroll;InitScrollEvent();}}
          onScroll={event=>{resetIndicadoresScrollEvent(event)}}
          onContentSizeChange={this.onContentSizeChange}
          horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(0, codigoCategoria)} resizeMode="contain" />
            <View>
              <Text style={styles.indicadorGlobalValue}>{kFormatter(indicador.totalvalorproyectos)}</Text>
               <Text style={styles.indicadorGlobalTitle}>Total invertido</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(1, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{kFormatter(indicador.totalvalorejecutadoproyectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Total ejecutado</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(2, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{pFormatter(indicador.totalavanceproyectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Avance</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(3, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{numberWithCommas(indicador.totalempleosdirectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Hombres</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(4, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{numberWithCommas(indicador.totalempleosindirectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Mujeres</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(5, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{numberWithCommas(indicador.totalhabitantesbeneficiados)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Participantes</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(6, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectos}</Text>
              <Text style={styles.indicadorGlobalTitle}>Proyectos</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(7, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosejecucion}</Text>
              <Text style={styles.indicadorGlobalTitle}>En ejecución</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(8, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosiniciar}</Text>
              <Text style={styles.indicadorGlobalTitle}>Por iniciar</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(9, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosterminados}</Text>
              <Text style={styles.indicadorGlobalTitle}>Terminados</Text>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}

const mstp = state => {
  return {
    proyectos: state.localData.proyectos,
    indicadores: state.localData.indicadores,
    latitud: state.localData.latitud,
    longitud: state.localData.longitud
  }
}

export default connect(mstp)(DashboardScreen)
