import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabBar, LoginScreen } from './'
import { getLocalUserInfo } from '../api/db.js'

const mstp = state => {
  return state
}

class Home extends Component {

  async componentDidMount(){
    let userInfo = await getLocalUserInfo()

    if(userInfo.userLogged)
      this.props.dispatch({
        type: 'SIGN_IN',
        payload: {
          userLogged: userInfo.userLogged,
          token: userInfo.token
        }
      })
  }

  render() {
 	if(!this.props.login.userLogged)
      return <LoginScreen />

  	return <TabBar />
  }

}

export default connect(mstp)(Home)
