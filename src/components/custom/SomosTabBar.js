import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} from 'react-native'
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import createReactClass  from 'create-react-class';
import {
  Button,
  LinearGradient
} from '../'
import { colors } from '../../resources/styles.js'

const SomosTabBar = createReactClass({

  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    }
  },

  renderTabOption(name, page) {
  },

  getImage(optionMenu, active){
    switch (optionMenu) {
      case 'LOGOUT':
      return require('../../resources/images/menu/btn_cerrar_sesion.png')

      case 'DASHBOARD':
      return active ? require('../../resources/images/menu/btn_explorar_activo.png') :
        require('../../resources/images/menu/btn_explorar.png')

      case 'INDICADORES':
      return active ? require('../../resources/images/menu/btn_indicadores_activo.png') :
        require('../../resources/images/menu/btn_indicadores.png')

      default:
        return require('../../resources/images/undefined.png')
    }
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (
      <Button
        style={styles.flexOne}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
      >
          <Image
            source={this.getImage(name, isTabActive)}
            style={styles.tabImg}
            resizeMode="contain"
          />
      </Button>
    )
  },

  render() {
    const containerWidth = this.props.containerWidth
    const numberOfTabs = this.props.tabs.length
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: '#f9f9f9',
      bottom: 0,
    }


    return (
      <View
        colors={colors.darkBlueGradient}
        style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page
          const renderTab = this.props.renderTab || this.renderTab
          return renderTab(name, page, isTabActive, this.props.goToPage)
        })}
        <Animated.View style={[tabUnderlineStyle, this.props.underlineStyle, ]} />
      </View>
    )
  },
})

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabImg: {
    flex:1,
    height: undefined,
    width: undefined
  },
  tabName: {
    fontSize: 8,
    color: '#f9f9f9'
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  },
})

module.exports = SomosTabBar
