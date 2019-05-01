/* @flow */

import React, { Component } from 'react'
import { Text as TextRN } from 'react-native'

export default class Text extends Component {
  render() {
    return (
      <TextRN style={[{fontFamily: 'Montserrat-Regular'}, this.props.style]}>
        {this.props.children}
      </TextRN>
    )
  }
}
