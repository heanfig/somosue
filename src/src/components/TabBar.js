import React, { Component } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux'
import {
  TouchableOpacity,
  View,
  NetInfo,
  Image,
  Text,
  Alert
} from 'react-native'
import {
  DashboardScreen,
  AppNavigator,
  SomosTabBar,
  LinearGradient,
  Indicadores
} from './'
import { styles, colors } from '../resources/styles.js'
import { updateLocalData, getLocalData, getIndicadores, getIndicadoresResultados, removeLocalUserInfo } from '../api/db.js'

class TabBar extends Component{

  constructor(props){
    super(props)
    this.proyectos = undefined
    this.indicadores = undefined
  }

  async componentDidMount(){
        const lat = 10.4
        const lon = -75.5  
        const accuracy = 1

        let isConn
        await NetInfo.isConnected.fetch().then(isConnected => {
          isConn = isConnected
        })
        if(isConn)
          await updateLocalData(0, undefined, lat, lon)

        let { proyectos } = await getLocalData()
        let indicadores = await getIndicadores()
        let indicadoresResultados = await getIndicadoresResultados()

        if(proyectos) {
          this.props.dispatch({
            type: 'SET_GEOLOCATION',
            payload: {
              proyectos: proyectos,
              indicadores: indicadores,
              indicadoresEstrategicos: indicadoresResultados,
              latitud: lat,
              longitud: lon,
              accuracy: accuracy
            }
          })
        }
  }

  showAlertLogout(){
    Alert.alert(
      null,
      '¿Está seguro que desea cerrar la sesión?',
      [
        {
          text: 'NO',
          onPress: () => this.tabView.goToPage(0),
        },
        {text: 'SI', onPress: () => this.logout()},
      ]
    );
  }

  async logout(){
    await removeLocalUserInfo()

    this.props.dispatch({
      type: 'SIGN_OUT',
      payload: {}
    })

    return null
  }

  onChangeTab(tab) {
    if(tab.i == 0){
      this.props.dispatch({
        type: 'SET_DATA',
        payload: {
          fromMenu: true
        }
      })
    }
    if(tab.i == 2)
      this.showAlertLogout()
  }

  render() {
    if(!this.props.localData.proyectos && !this.props.localData.longitud){
      return (
        <LinearGradient colors={colors.blueGradient} style={styles.backgroundApp}>
          <View style={styles.loadingDataView}>
            <Image style={{flex: 1, height: 100, width: 100}}
              source={require('../resources/images/header/logo.png')}
              resizeMode={'contain'}
          />
          </View>
        </LinearGradient>
      )
    } else {
      return (
        <ScrollableTabView
          renderTabBar={() => <SomosTabBar />}
          ref={(tabView) => { this.tabView = tabView }}
          tabBarPosition='bottom'
          prerenderingSiblingsNumber={Infinity}
          onChangeTab={(tab) => this.onChangeTab(tab)}
          >
            <AppNavigator tabLabel='DASHBOARD' />
            <Indicadores tabLabel='INDICADORES' />
            <LinearGradient colors={colors.blueGradient} style={styles.backgroundApp} tabLabel='LOGOUT'></LinearGradient>
        </ScrollableTabView>
      )
    }
  }
}

const mstp = state => {
  return state
}

export default connect(mstp)(TabBar)
