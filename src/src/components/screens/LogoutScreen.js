/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeLocalUserInfo } from '../../api/db.js'

class LogoutScreen extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return null
  }
}

const mstp = state => {
  return state
}

export default connect(mstp)(LogoutScreen)
