/* @flow */

import React, { Component } from 'react'
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  Text as TextRN,
  NetInfo,
  Image,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import {
  Text
} from '../'
import { styles, colors } from '../../resources/styles.js'
import {
  login,
  getLocalData
} from '../../api/db.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class LoginScreen extends Component {

  async login(){
    let isConn
    await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })

    if(isConn){
      const userResponse = await login(this.user, this.password)

      if(userResponse.code == 200){
        let token = userResponse.token

        if(token) {
          this.props.dispatch(
            {
              type: 'SIGN_IN',
              payload: {
                userLogged: true,
                token: token
              }
            }
          )
        } else {
          Alert.alert('Error', 'Usuario o contraseña incorrecta')
        }
      } else {
        Alert.alert('Error', 'No existe el usuario')
      }
    } else {
      Alert.alert('Error', 'Debe estar conectado a internet')
    }
  }

  setUser(text) {
    this.user = text
  }

  setPassword(text) {
    this.password = text
  }

  render() {

    return (
      <ImageBackground
        source={require('../../resources/images/login/bg.jpg')}
        style={styles.backgroundApp}
      >
        <View style={styles.containerLogin}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 80, marginBottom: 10}}>
            <Image style={styles.imagenLogin} resizeMode="contain"
              source={require("../../resources/images/login/logo.png")}
            />
          </View>
          <View style={[styles.inputWithIcon, {marginBottom: 10}]}>
            <Icon type="MaterialCommunityIcons" style={{padding: 15}} name="account" size={20} color="#fff"/>
            <TextInput
              placeholder='Usuario'
              onChangeText={(text) => this.setUser(text)}
              placeholderTextColor='#e2ebf6'
              style={styles.textInputLogin}
            />
          </View>
          <View style={[styles.inputWithIcon, {marginBottom: 10}]}>
            <Icon type="MaterialCommunityIcons" style={{padding: 15}} name="lock-outline" size={20} color="#fff"/>
            <TextInput
              placeholder='Contraseña'
              onChangeText={(text) => this.setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor='#e2ebf6'
              style={styles.textInputLogin}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.login()}
            style={styles.buttonLogin}>
            <View style={[{flexDirection: 'row', padding: 2, justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={styles.textButtonLogin}>
                  Login
                </Text>
              </View>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Image style={styles.imagenLoginPowered} resizeMode="contain"
              source={require("../../resources/images/login/powered.png")}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mstp = state => {
  return state
}

export default connect(mstp)(LoginScreen)
