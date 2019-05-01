export function getListaProyectoIconoImg(code){

}

export function getSemaforoImg(code){
    switch (code) {
    case 'semaforo_naranja':
    return require("../resources/images/home-proyectos/semaforo_naranja.png")

    case 'semaforo_rojo':
    return require("../resources/images/home-proyectos/semaforo_rojo.png")

    case 'semaforo_verde':
    return require("../resources/images/home-proyectos/semaforo_verde.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

  export function getImagenCategoria(code){
    switch (code) {
    case 0:
    return require("../resources/images/home-proyectos/todos.png")

    case 1:
    return require("../resources/images/home-proyectos/jovenes.png")

    case 2:
    return require("../resources/images/home-proyectos/fortalecimiento.png")

    case 3:
    return require("../resources/images/home-proyectos/educacion.png")

    case 4:
    return require("../resources/images/home-proyectos/desarrollo.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getImagenCategoriaProyecto(code){
    switch (code) {
    case 1:
    return require("../resources/images/detalle-proyecto/jovenes.png")

    case 2:
    return require("../resources/images/detalle-proyecto/fortalecimiento.png")

    case 3:
    return require("../resources/images/detalle-proyecto/educacion.png")

    case 4:
    return require("../resources/images/detalle-proyecto/desarrollo.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getIconoDetalleAcordeon(code){
    switch (code) {
    case 0:
    return require("../resources/images/detalle-proyecto/icn_consiste.png")

    case 1:
    return require("../resources/images/detalle-proyecto/icn_cuesta.png")

    case 2:
    return require("../resources/images/detalle-proyecto/icn_proyecto.png")

    case 3:
    return require("../resources/images/detalle-proyecto/icn_participan.png")

    case 4:
    return require("../resources/images/detalle-proyecto/icn_indicadores.png")

    case 5:
    return require("../resources/images/detalle-proyecto/icn_imagenes.png")

    case 6:
    return require("../resources/images/detalle-proyecto/icn_datos.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getImagenIndicadoresRecursos(code){
    switch (code) {
    
    case 'autosostenibilidad':
        return require("../resources/images/indicadores/autosostenibilidad.png")

    case 'cambios_migracion':
        return require("../resources/images/indicadores/cambios_migracion.png")

    case 'cooperacion':
        return require("../resources/images/indicadores/cooperacion.png")

    case 'corresponsabilidad':
        return require("../resources/images/indicadores/corresponsabilidad.png")

    case 'emprendimiento_rural':
        return require("../resources/images/indicadores/emprendimiento_rural.png")

    case 'formacion_practica':
        return require("../resources/images/indicadores/formacion_practica.png")

    case 'fortalecimiento':
        return require("../resources/images/indicadores/fortalecimiento.png")
        
    case 'mejoramiento_ingresos':
        return require("../resources/images/indicadores/mejoramiento_ingresos.png")

    case 'participacion':
        return require("../resources/images/indicadores/participacion.png")

    case 'participacion_ciudadana':
        return require("../resources/images/indicadores/participacion_ciudadana.png")

    case 'participacion_voz':
        return require("../resources/images/indicadores/participacion_voz.png")
        
    case 'sostenibilidad':
        return require("../resources/images/indicadores/sostenibilidad.png")

    case 'uso_tierra':
        return require("../resources/images/indicadores/uso_tierra.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getIndicadorImg(codeIndicador, codeCategoria){
    switch(codeCategoria){
        case 0:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/0_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/0_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/0_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_todos_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_todos_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_todos_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_todos_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 1:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/1_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/1_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/1_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_jovenes_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_jovenes_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_jovenes_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_jovenes_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 2:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/2_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/2_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/2_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_osc_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_osc_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_osc_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_osc_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 3:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/3_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/3_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/3_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_educacion_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_educacion_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_educacion_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_educacion_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 4:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/4_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/4_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/4_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_desarrollo_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_desarrollo_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_desarrollo_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_desarrollo_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break

        default:
            return require("../resources/images/undefined.png")
    }
}

export function getImagenCategoriaIndicador(code, seleccionada){
    switch(code) {
      case 0:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_0_activo.png') :
            require('../resources/images/indicadores-globales/btn_0.png')
      case 1:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_1_activo.png') :
            require('../resources/images/indicadores-globales/btn_1.png')
      case 2:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_2_activo.png') :
            require('../resources/images/indicadores-globales/btn_2.png')
      case 3:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_3_activo.png') :
            require('../resources/images/indicadores-globales/btn_3.png')
      case 4:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_4_activo.png') :
            require('../resources/images/indicadores-globales/btn_4.png')
      default:
        return require('../resources/images/undefined.png')
    }
}

export function getIconoVallaProyecto(code){
    switch(code) {
      case 'fortalecimiento':
        return require('../resources/images/home-proyectos/valla_fortalecimiento.png')
      case 'educacion':
        return require('../resources/images/home-proyectos/valla_educacion.png')
      case 'jovenes':
        return require('../resources/images/home-proyectos/valla_jovenes.png')
      case 'desarrollo':
        return require('../resources/images/home-proyectos/valla_desarrollo.png')

      default:
        return require('../resources/images/undefined.png')
    }
}

export function getSemaforoValla(code){
    switch (code) {
    case 'semaforo_naranja':
        return require("../resources/images/home-proyectos/valla_semaforo_naranja.png")

    case 'semaforo_rojo':
        return require("../resources/images/home-proyectos/valla_semaforo_rojo.png")

    case 'semaforo_verde':
        return require("../resources/images/home-proyectos/valla_semaforo_verde.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function kFormatter(num) {
    return num > 999 ? numberWithCommas((num/1000).toFixed(2)) + 'k' : num
}

export function pFormatter(num) {
    return num.toFixed(2) + "%"
}

export function numberWithCommas(x) {
    x = x.toString()
    var pattern = /(-?\d+)(\d{3})/
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2")
    return x
}

export function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};