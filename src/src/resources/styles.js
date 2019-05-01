import {
  StyleSheet
} from 'react-native'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export const HEADER_MAX_HEIGHT = 200;
export const HEADER_MIN_HEIGHT = 60;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const colors = {
  blueGradient: ['#5648bf', '#283676'],
  darkBlueGradient: ['#0f7373', '#0a5050'],
  redOKr: '#cc6666',
  whiteOKr: '#f9f9f9',
  greenOKr: '#20a8a8',
  yellowOKr: '#fae132',
  redBGOKr: '#c85050',
  darkGreen: '#0c7070',
  darkGray: '#6E6E6E',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerForm: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  textRN: {
    fontFamily: 'Montserrat-Light'
  },
  responsiveImg: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  textInput: {
    fontSize: 16
  },
  backgroundApp: {
    flex: 1,
  },
  loadingDataView: {
    height: window.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26
  },
  searchBox: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  searchInputText: {
    flex: 1,
    color: '#ffffff',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  searchTitle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTitleText: {
    color: colors.whiteOKr,
    textAlign: 'center',
    borderRadius: 10,
    borderColor: colors.whiteOKr,
    borderWidth: 1,
    padding: 10,
    fontSize: 11,
  },
  proyectosItem: {
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  proyectosItemTitleContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  proyectosItemFooterContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  proyectosItemTitle: {
    color: '#e2ebf6',
    fontSize: 14,
    fontWeight: 'bold'
  },
  proyectosItemName: {
    padding: 10,
    fontSize: 14,
    color: '#707b92'
  },
  proyectosItemPrice: {
    padding: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Light'
  },
  nav:{
    backgroundColor: colors.darkGreen,
  },
  navTitleText: {
    color: colors.whiteOKr,
    fontSize: 16
  },
  navButton: {
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 10,
    marginLeft: 5
  },
  buttonFormSelected: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginLeft: 5
  },
  buttonBuscar: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 174, 208, 1)',
    borderRadius: 10,
    marginLeft: 5
  },
  textButtonForm: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    color: '#e2ebf6'
  },
  listaContainer: {
    flex: 0.6,
    backgroundColor: '#e2ebf6',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  indicadorGlobal: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicadorGlobalIcono: {
    height: 40,
    width: 40
  },
  indicadorGlobalBoton: {
    height: undefined,
    width: undefined,
  },
  indicadorGlobalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#464646',
    paddingLeft: 15
  },
  indicadorGlobalTitle: {
    fontSize: 14,
    color: '#A2A2A2',
    paddingLeft: 15
  },
  vallaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#A2A2A2'
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  headerProyecto: {
    flexDirection: 'column',
    paddingBottom: 5,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriaProyectoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#707b92',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#707b92',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  categoriaProyecto: {
    fontSize: 12,
    color: '#707b92',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#707b92',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  categoriaProyectoH: {
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
  nombreProyectoH: {
    color:'#fff',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  titleAccordion: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  headerAccordion: {
    backgroundColor: '#fff',
  },
  headerTextAccordion: {
    textAlign: 'center',
    fontSize: 18,
  },
  contentAccordion: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderColor: '#d9d9d9',
    borderWidth: 1 
  },
  activeAccordion: {
    
  },
  inactiveAccordion: {
    
  },
  imagenProyecto: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    bottom: -40
  },
  imagenProyectoValla: {
    width: 60,
    height: 60,
    borderRadius: 180
  },
  contenidoCentrado: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  contadorValor: {
    fontFamily: 'Montserrat-Light',
    color: '#8c8c8c',
    fontSize: 36
  },
  avanceProyecto: {
    color: 'rgba(46, 190, 84, 1)',
    fontSize: 52,
    marginLeft: 5,
    alignSelf: 'flex-end'
  },
  textResultadosTitulo: {
    fontSize: 11,
  },
  textResultados: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
  },
  datosRelevantesText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#227fc6',
  },
  datosRelevantesText: {
    fontFamily: 'Monserrat-Light',
    fontSize: 16,
    marginLeft: 10
  },
  valla: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:window.width,
    height:150,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20
  },
  containerLogin: {
    flex: 1,
    padding: 60,
  },
  imagenLogin: {
    flex: 1,
    height: 350,
    width: 350,
  },
  textInputLogin: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'MontserratAlternates-Light',
  },
  buttonLogin: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10
  },
  textButtonLogin: {
    alignItems:'center',
    justifyContent:'center',
    fontSize: 16,
    color: '#5648bf',
    fontFamily: 'MontserratAlternates-Regular',
  },
  imagenLoginPowered: {
    flex: 1,
    height: 180,
    width: 150
  },
  inputWithIcon: {
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: colors.whiteOKr,
    borderWidth: 1
  },
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    
  },
  bar: {
    marginTop: 28,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
})
