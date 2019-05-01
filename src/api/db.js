import { AsyncStorage,  } from 'react-native'

const urlApi = "http://ws.somos-ue.co"
export const urlApiImagenes = "http://18.224.218.156:8080/ue"

export async function login(user, password){
  let userResponse = {
    code: undefined,
    token: undefined
  }

  try {
    var data = {
      "usuario": user,
      "contrasena": password
    }

    let response = await fetch(urlApi + "/login",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })

    userResponse.code = response.status
    userResponse.token = response.headers.map.authorization
  } catch(e) {
    console.error('Error getting login with api: ', e)
  }

  return userResponse
}

export async function getProyecto(codigoproyecto, latitud, longitud){
  let proyecto
  let { token } = await getLocalUserInfo()

  try {
    var data = {
      "codigousuario": 0,
      "codigoproyecto": codigoproyecto,
      "longitud": longitud,
      "latitud": latitud
    }

    let response = await fetch(urlApi + "/detalle-proyecto",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })

    proyecto = await response.json()
  } catch(e) {
    console.error('Error getting detalle proyecto with api: ', e)
  }

  return proyecto
}

async function getProyectos(categoria, nombre = "", latitud, longitud){
  let proyectos
  let { token } = await getLocalUserInfo()

  try {
    var data = {
      "codigousuario": 0,
      "filtroproyectos": {
        "categoriaproyecto": categoria,
        "nombreproyecto": nombre
      },
      "longitud" : longitud,
      "latitud" : latitud
    }
    let response = await fetch(urlApi + "/vista-lista",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    proyectos = await response.json()
  } catch(e) {
    console.error('Error getting proyectos with api: ', e)
    proyectos = []
  }

  return proyectos
}

export async function getIndicadoresResultados(){
  let indicadores
  let { token } = await getLocalUserInfo()

  try {
    var data = { }
    let response = await fetch(urlApi + "/indicadores-resultados",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    indicadores = await response.json()
  } catch(e) {
    console.error('Error getting indicadores resultados with api: ', e)
    indicadores = []
  }

  return indicadores
}

export async function getIndicadoresResultadosProyecto(codigoProyecto){
  let indicadores
  let { token } = await getLocalUserInfo()

  try {
    var data = { codigoproyecto: codigoProyecto }
    let response = await fetch(urlApi + "/indicadores-resultados-proyecto",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    indicadores = await response.json()
    console.log(indicadores)
  } catch(e) {
    console.error('Error getting indicadores resultados proyecto with api: ', e)
    indicadores = []
  }

  return indicadores
}

export async function getIndicadores(){
  let indicadores
  let { token } = await getLocalUserInfo()

  try {
    var data = {  
      "categoriaproyecto": -1
    }
    let response = await fetch(urlApi + "/indicadores-globales",
    {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    indicadores = await response.json()
  } catch(e) {
    indicadores = []
    console.error('Error getting indicadores with api: ', e)
  }

  return indicadores
}

async function updateLocalStorageProyectos(categoria, nombre, latitud, longitud){
  try{
    const proyectos = await getProyectos(categoria, nombre, latitud,  longitud)

    await AsyncStorage.setItem(
      '@SomosUEStorage:proyectos', JSON.stringify(proyectos)
    )
  } catch(e){
    console.error('Error updating local storage', e)
  }
}

export async function updateLocalData(categoria, nombre = "", latitud, longitud){
  await updateLocalStorageProyectos(categoria, nombre, latitud, longitud)
}

export async function getLocalData(){
  const response = {}

  try{
    const proyectos = await AsyncStorage.getItem('@SomosUEStorage:proyectos')

    response.proyectos = JSON.parse(proyectos)

    if(response.proyectos === null)
      throw new Error('Local storage error')
  } catch(e){
    console.error('Error getting local data: ', e)
  }

  return response
}

export async function guardarProyecto(proyecto){
  try{
    await AsyncStorage.setItem(
      '@SomosUEStorage:proyecto', JSON.stringify(proyecto)
    )
  } catch(e){
    console.error('Error updating local storage', e)
  }
}

export async function cargarProyecto(){
  const response = {}

  try{
    const proyecto = await AsyncStorage.getItem('@SomosUEStorage:proyecto')

    response.proyecto = JSON.parse(proyecto)

    if(response.proyecto === null)
      throw new Error('Local storage error')
  } catch(e){
    console.error('Error getting local data: ', e)
  }

  return response
}

export function updateUserInfo(userInfo){
  try{
    AsyncStorage.setItem('@SomosUEStorage:userLogged', JSON.stringify(userInfo.userLogged))
    AsyncStorage.setItem('@SomosUEStorage:token', JSON.stringify(userInfo.token))
  } catch(e){
    console.error('Error updating local user info: ', e)
  }
}

export async function removeLocalUserInfo(){
  try{
    await AsyncStorage.removeItem('@SomosUEStorage:userLogged')
    await AsyncStorage.removeItem('@SomosUEStorage:token')
  } catch(e){
    console.error('Error removing local user info: ', e)
  }
}

export async function getLocalUserInfo(){
  const response = {}

  try{
    let userLogged = await AsyncStorage.getItem('@SomosUEStorage:userLogged')
    let token = await AsyncStorage.getItem('@SomosUEStorage:token')

    response.userLogged = JSON.parse(userLogged)
    response.token = JSON.parse(token)

    if(response.userLogged === null){
      response.userLogged = false
      response.token = undefined
    }

    return response
  } catch(e){
    console.error('Error getting user from local storage', e)
  }
}