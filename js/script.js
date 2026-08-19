//SELECTORES

//Formulario
const guiaInput = document.getElementById('num_guia');
const origenInput = document.getElementById('origen');
const destinoInput = document.getElementById('destino');
const destinatarioInput = document.getElementById('destinatario');
const fechaInput = document.getElementById('fecha_creacion');
const estadoInput = document.getElementById('estado_inicial');
const formulario = document.getElementById('main__formulario');
const bodyTable = document.querySelector('.main__lista--tabla tbody');

//Estados de Guías

const guiasPendientes = document.querySelector('.main__estado--pendientes');
const guiasTransito = document.querySelector('.main__estado--transito');
const guiasEntregadas = document.querySelector('.main__estado--entregadas');
const guiasTotales = document.querySelector('.main__estado--totalguias');
const guiasCanceladas = document.querySelector('.main__estado--canceladas');

const porcPendientes = document.querySelector('.main__estado--porcpendiente');
const porcTransito = document.querySelector('.main__estado--porctransito');
const porcEntregadas = document.querySelector('.main__estado--porcentregadas');
const porcCanceladas = document.querySelector('.main__estado--porccanceladas');

//Buscador de Guías
const buscarButton = document.querySelector('.main__buscar--boton');
const buscarMensaje = document.querySelector('.main__buscar--mensaje');
const bodyBuscarTable = document.querySelector('.main__buscar--tabla tbody');

let totales = [];


//Creando objetos para la guía y status de la guía
const guiaObj = {
    guia: '',
    origen: '',
    destino: '',
    destinatario: '',
    fecha: '',
    estado: '',
    id:''
}

const statusObj = {
    id: '',
    guia: '',
    fecha: '',
    estado: ''
}

//CLASES

//Creando clase de Notificaciones
class Notificacion {
    constructor({texto, tipo}) {
        this.texto = texto
        this.tipo = tipo

        this.mostrar()
    }


    mostrar() {
        //Crear un DIV con la notificación para mostrarla

        const alerta = document.createElement('P');
        alerta.classList.add('main__formulario--alerta');
        this.tipo === 'error' ? alerta.classList.add('main__formulario--error') : alerta.classList.add('main__formulario--exito');
        alerta.textContent = this.texto;

        //Eliminar alertas para no duplicar
        const alertaPrevia = document.querySelector('.main__formulario--alerta');
        if(alertaPrevia) {
            alertaPrevia.remove();
        }

        formulario.firstElementChild.before(alerta);

        //Quitar la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

//Creando clase de Guias

class AdminGuias {
    constructor() {
        this.guias = listaGuias;
    }

    agregar(guia) {
        this.guias = [...this.guias, guia];
        listaGuias = this.guias;
        contador++;
    }
}
    
//EVENTOS

document.addEventListener('DOMContentLoaded', function() {
    estableceFecha();
    cargarTabla();
});

formulario.addEventListener('submit', submitGuia);

buscarButton.addEventListener('click', buscarGuia);


//FUNCIONES
//Función en donde se carga la tabla con los datos iniciales
function cargarTabla() {
    limpiarTabla();
    total_canceladas = 0;
    total_pendientes = 0;
    total_entregadas = 0;
    total_transito = 0;
    listaGuias.forEach ( miguia => {
        const { guia, origen, destino, destinatario, fecha, estado, id } = miguia;
        const row = document.createElement('tr');
        const mistatus = status[estado];
        row.innerHTML = `
            <td>${guia}</td>
            <td>${mistatus}</td>
            <td>${origen}</td>
            <td>${destino}</td>
            <td>${fecha}</td>
            <td><a href="#" class = "main__lista--cambiar" data-id = '${id}'>&#128260</a></td>
            <td><a href="#" class = "main__lista--revisar" data-id = '${id}'>&#129534</a></td>
        `;
        bodyTable.appendChild(row);

        switch (Number(estado)) {
            case 0:
                total_canceladas++;
                break;

            case 1:
                total_pendientes++;
                break;

            case 2:
                total_transito++;
                break;
            
            case 3:
                total_entregadas++;
                break;
        }

    });

    guiasPendientes.textContent = total_pendientes;
    guiasTransito.textContent = total_transito;
    guiasEntregadas.textContent = total_entregadas;
    guiasCanceladas.textContent = total_canceladas;
    const granTotal = total_pendientes + total_transito + total_entregadas + total_canceladas;
    guiasTotales.textContent = granTotal;
    totales = [total_canceladas, total_pendientes, total_transito, total_entregadas];
    porcPendientes.textContent = ((total_pendientes * 100)/granTotal).toFixed(2) + " %";
    porcTransito.textContent = ((total_transito * 100)/granTotal).toFixed(2) + " %";
    porcEntregadas.textContent = ((total_entregadas * 100)/granTotal).toFixed(2) + " %";
    porcCanceladas.textContent = ((total_canceladas * 100)/granTotal).toFixed(2) + " %";

    dibujaGrafica();

    const guiaDetalles = document.querySelectorAll('.main__lista--revisar');

    if (guiaDetalles) {
        guiaDetalles.forEach(function(guia) {
            guia.addEventListener('click', mostrarDetalles); 
        });
    }

    const guiaCambiar = document.querySelectorAll('.main__lista--cambiar');

    if (guiaCambiar) {
        guiaCambiar.forEach(function(guia) {
            guia.addEventListener('click', cambiarStatus);
        });
    }
}

//Función que realiza el submit al formulario
const guias = new AdminGuias();

function submitGuia(e) {
    e.preventDefault();
    leerDatos();
    if (comprobarGuia()) {
        guias.agregar({...guiaObj});
        cargarTabla();
        agregarStatus(guiaObj);
        new Notificacion({
            texto: "Registro creado correctamente",
            tipo: "exito"
        });
        formulario.reset();
        estableceFecha();
    }
}

//Función en donde se leen los datos del formulario
function leerDatos() {
    guiaObj.guia = guiaInput.value;
    guiaObj.origen = origenInput.value;
    guiaObj.destino = destinoInput.value;
    guiaObj.destinatario = destinatarioInput.value;
    guiaObj.fecha = fechaInput.value;
    guiaObj.estado = estadoInput.value;
    guiaObj.id = contador+1;

}

function comprobarGuia() {
    
    if ((guiaObj.guia).trim() === '') {
        new Notificacion({
            texto: "Debes agregar una Guía",
            tipo: "error"
        });
        return false;
    }
    const existe = listaGuias.some( miguia => miguia.guia === guiaObj.guia);
    
    if (existe) {
        new Notificacion({
            texto: "La guía " + guiaObj.guia + " ya existe.",
            tipo: "error"
        });
        return false;
    }

    if((guiaObj.origen).trim() === '') {
        new Notificacion({
            texto: "Debes agregar un origen",
            tipo: "error"
        });
        return false;
    }

    if((guiaObj.destino).trim() === '') {
        new Notificacion({
            texto: "Debes agregar un destino",
            tipo: "error"
        });
        return false;
    }

    if((guiaObj.destinatario).trim() === '') {
        new Notificacion({
            texto: "Debes agregar un destinatario",
            tipo: "error"
        })
        return false;
    }

    return true;
}

function limpiarTabla() {
    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }
}

function estableceFecha() {
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.value = hoy;
}

function mostrarDetalles(e) {
    e.preventDefault();
    const indice = Number(e.target.getAttribute('data-id')) - 1;
    const status_guia = status[Number(listaGuias[indice].estado)];
    let img_status = '';
    switch (Number(listaGuias[indice].estado)) {
        case 0:
            img_status = 'icono_cancelada';
            break; 
           
        case 1:
            img_status = 'icono_pendiente';
            break;

        case 2:
            img_status = 'icono_transito';
            break;

        case 3:
            img_status = 'icono_entregada';
            break;
    }

    const overlay = document.createElement('DIV');
    overlay.classList.add('modal__overlay');
    overlay.style.top = window.scrollY + "px";
    const modal = document.createElement('DIV');
    modal.classList.add('modal__contenedor');

    const titulo = document.createElement('DIV');
    titulo.classList.add('modal__titulo');
    titulo.innerHTML = `
        <div class = "modal__titulo--guia">
            <img src = "../img/icono_paquete.png" class = "modal__icono"/>
            <h2>Detalle de la guía</h2>
        </div>
        <div class = "modal__titulo--cerrar">
            <img src = "../img/icono_cerrar.png" class = "modal__icono modal__cerrar"/>
        </div>
    `;
    
    const detalle = document.createElement('DIV');
    detalle.classList.add('modal__detalle');
    detalle.innerHTML = `
        <div class = "modal__detalle--guia">
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_guia.png" class = "modal__icono"/>
                <p>Guía:  <span>${listaGuias[indice].guia}</span><p>
            </div>
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_localizacion.png" class = "modal__icono"/>
                <p>Origen:  <span>${listaGuias[indice].origen}</span><p>
            </div>
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_destinatario.png" class = "modal__icono"/>
                <p>Destinatario:  <span>${listaGuias[indice].destinatario}</span><p>
            </div>
        </div>
        <div class = "modal__detalle--status">
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_localizacion.png" class = "modal__icono"/>
                <p>Destino:  <span>${listaGuias[indice].destino}</span><p>
            </div>
            <div class = "modal__detalle--campostatus">
                <p>Status actual:</p>
                <img src = "../img/${img_status}.png" class = "modal__icono"/>
                <p>${status_guia}<p>
            </div>
        </div>


    `;

    const estados = document.createElement('DIV');
    estados.classList.add('modal__estados');
    const titulo_estados = document.createElement('DIV');
    titulo_estados.classList.add('modal__estados--titulo');
    titulo_estados.innerHTML = `
        <img src = "../img/icono_historial.png" class = "modal__icono"/>
        <p>Historial de guía</p>
    `;

    const tabla_estados = document.createElement('TABLE');
    const thead_estados = document.createElement('THEAD');
    thead_estados.innerHTML = `
        <th>Fecha</th>
        <th>Estado</th>
    `;
    const tbody_estados = document.createElement('TBODY');

    statusGuias.forEach(statusguia => {
        if ((indice + 1) === Number(statusguia.id)) {
            const fila = document.createElement('TR');
            const status_detalle = status[Number(statusguia.estado)];
            let color_clase = '';
            switch (Number(statusguia.estado)) {
                case 0:
                    color_clase = "modal__status--cancelado";
                    break;

                case 1:
                    color_clase = "modal__status--pendiente";
                    break;

                case 2:
                    color_clase = "modal__status--transito";
                    break;

                case 3:
                    color_clase = "modal__status--entregado";
                    break;

            }
            fila.innerHTML = `
                <td>${statusguia.fecha}</td>
                <td class = "${color_clase}">&bull; ${status_detalle}</td>
            `;
            tbody_estados.appendChild(fila);
        }
    });

    tabla_estados.appendChild(thead_estados);
    tabla_estados.appendChild(tbody_estados);

    estados.appendChild(titulo_estados);
    estados.appendChild(tabla_estados);

    const modal_footer = document.createElement('DIV');
    modal_footer.classList.add('modal__footer');
    const btncerrar = document.createElement('BUTTON');
    btncerrar.classList.add('modal__footer--cerrar');
    btncerrar.classList.add('modal__cerrar');
    btncerrar.textContent = "Cerrar";
  
    modal_footer.appendChild(btncerrar);

    modal.appendChild(titulo);
    modal.appendChild(detalle);
    modal.appendChild(estados);
    modal.appendChild(modal_footer);
    
    overlay.appendChild(modal);

    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.classList.contains('modal__cerrar')) {
            overlay.remove();
        }
    });

    document.querySelector('body').appendChild(overlay);
    
}

function cambiarStatus(e) {
    e.preventDefault();
    const indice = Number(e.target.getAttribute('data-id')) - 1;
    const status_guia = status[Number(listaGuias[indice].estado)];
    let img_status = '';
    switch (Number(listaGuias[indice].estado)) {
        case 0:
            img_status = 'icono_cancelada';
            break; 

        case 1:
            img_status = 'icono_pendiente';
            break;

        case 2:
            img_status = 'icono_transito';
            break;

        case 3:
            img_status = 'icono_entregada';
            break;
    }


    const overlay = document.createElement('DIV');
    overlay.classList.add('modal__overlay');
    overlay.style.top = window.scrollY + "px";
    const modal = document.createElement('DIV');
    modal.classList.add('modal__contenedor');

    const titulo = document.createElement('DIV');
    titulo.classList.add('modal__titulo');
    titulo.innerHTML = `
        <div class = "modal__titulo--guia">
            <img src = "../img/icono_paquete.png" class = "modal__icono"/>
            <h2>Detalle de la guía</h2>
        </div>
        <div class = "modal__titulo--cerrar">
            <img src = "../img/icono_cerrar.png" class = "modal__icono modal__cerrar"/>
        </div>
    `;

     const detalle = document.createElement('DIV');
    detalle.classList.add('modal__detalle');
    detalle.innerHTML = `
        <div class = "modal__detalle--guia">
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_guia.png" class = "modal__icono"/>
                <p>Guía:  <span>${listaGuias[indice].guia}</span><p>
            </div>
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_localizacion.png" class = "modal__icono"/>
                <p>Origen:  <span>${listaGuias[indice].origen}</span><p>
            </div>
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_destinatario.png" class = "modal__icono"/>
                <p>Destinatario:  <span>${listaGuias[indice].destinatario}</span><p>
            </div>
        </div>
        <div class = "modal__detalle--status">
            <div class = "modal__detalle--campo">
                <img src = "../img/icono_localizacion.png" class = "modal__icono"/>
                <p>Destino:  <span>${listaGuias[indice].destino}</span><p>
            </div>
            <div class = "modal__detalle--campostatus">
                <p>Status actual:</p>
                <img src = "../img/${img_status}.png" class = "modal__icono"/>
                <p>${status_guia}<p>
            </div>
        </div>


    `;

    const cambio = document.createElement('DIV');
    cambio.classList.add('modal__cambio');
    const titulo_cambio = document.createElement('DIV');
    titulo_cambio.classList.add('modal__cambio--titulo');
    titulo_cambio.innerHTML = `
        <img src = "../img/icono_cambio.png" class = "modal__icono"/>
        <p>Nuevo Status</p>
    `;

    const opcion_cambio = document.createElement('DIV');
    const hoy = new Date().toISOString().split('T')[0];
    opcion_cambio.classList.add('modal__cambio--opcion');
    opcion_cambio.innerHTML = `
        <div class = "modal__cambio--status main__formulario">
            <div class="modal__cambio--campo">
                <label for="estado_cambio" class="modal__cambio--label">Status:</label>
                <select name="estado_cambio" id = "estado_cambio">
                    <option value = "0">Cancelar</option>
                    <option value = "1">Pendiente</option>
                    <option value = "2">En Tránsito</option>
                    <option value = "3">Entregado</option>
                </select>
            </div>
            <div class = "modal__cambio--campo">
                <label for = "fecha_cambio" class = "modal__cambio--label">Fecha de Actualización: </label>
                <input
                    type = "date"
                    class = "modal__cambio--input"
                    id = "fecha_cambio"
                    name = "fecha_cambio"
                    placeholder = "Fecha de Actualización"
                    value = "${hoy}"
                >
            </div>
            <button class = "modal__cambio--submit">Guardar Cambios</button>
        </div>
    `;
    

    cambio.appendChild(titulo_cambio);
    cambio.appendChild(opcion_cambio);

    const modal_footer = document.createElement('DIV');
    modal_footer.classList.add('modal__footer');
    
    const btncerrar = document.createElement('BUTTON');
    btncerrar.classList.add('modal__footer--cerrar');
    btncerrar.classList.add('modal__cerrar');
    btncerrar.textContent = "Cerrar";

    modal_footer.appendChild(btncerrar);

    modal.appendChild(titulo);
    modal.appendChild(detalle);
    modal.appendChild(cambio);
    modal.appendChild(modal_footer);

    opcion_cambio.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal__cambio--submit')) {
            e.preventDefault();
            comprobarCambios(indice);
            statusGuias = [...statusGuias, {...statusObj}];
            listaGuias[indice].estado = statusObj.estado;
            cargarTabla();
            overlay.remove();
        }
    });

    titulo.addEventListener('click', function(e) {
        if(e.target.classList.contains('modal__cerrar')) {
            e.preventDefault();
            overlay.remove();
        }
    });

    btncerrar.addEventListener('click', function(e) {
        e.preventDefault();
        overlay.remove();
    });

    overlay.appendChild(modal);

    document.querySelector('body').appendChild(overlay);

    const selectStatus = document.getElementById('estado_cambio');
    if (selectStatus) {
        if (Number(listaGuias[indice].estado) === 3) {
            selectStatus.value = 0;
        } else {
            selectStatus.value = Number(listaGuias[indice].estado) + 1;
        }
    }

}

function comprobarCambios(indice) {
    const statusCambio = document.getElementById('estado_cambio');
    const fechaCambio = document.getElementById('fecha_cambio');

    statusObj.id = listaGuias[indice].id;
    statusObj.guia = listaGuias[indice].guia;
    if (fechaCambio) {
        const fecha = String(fechaCambio.value);
        statusObj.fecha = formatearFecha(fecha);
    }
    if (statusCambio) {
        statusObj.estado = statusCambio.value;
    }

}

function dibujaGrafica() {
    
    let graficoExistente = Chart.getChart('graficaGuias');

    if (graficoExistente) {
        graficoExistente.destroy();
    }

    const ctx = document.getElementById('graficaGuias').getContext('2d');

const nuevoGrafico = new Chart(ctx, {
    type: 'pie',

    data: {
        labels: [
            'Canceladas',
            'Pendientes',
            'En tránsito',
            'Entregadas'          
        ],

        datasets: [{
            data: totales,

            backgroundColor: [
                '#E05252',
                '#FC9A07',
                '#0B83C9',
                '#22A06B'
            ],

            borderWidth: 2,
            borderColor: '#FFFFFF'
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

}

function formatearFecha(fecha) {
    const anio = fecha.substring(0,4);
    const mes = fecha.slice(5,7);
    const dia = fecha.slice(8,10);
    const fecha_formateada = `${dia}/${mes}/${anio}`;
    return fecha_formateada;
}

function agregarStatus(guia) {
    statusObj.id = guia.id;
    statusObj.guia = guia.guia;
    statusObj.fecha = formatearFecha(guia.fecha);
    statusObj.estado = guia.estado;
    statusGuias = [...statusGuias, {...statusObj}];
}

function buscarGuia(e) {
    e.preventDefault();
    limpiarTablaBuscar();
    const buscarInput = document.querySelector('.main__buscar--input');
    let indice = -1;

    if ((buscarInput.value).trim()!== "" && (buscarInput.value).trim()!== null) {
        indice = listaGuias.findIndex(guia => guia.guia === (buscarInput.value).trim());
        if (indice >= 0) {
            statusGuias.forEach (statusguia => {
                if ((indice + 1) === Number(statusguia.id)) {
                    const fila = document.createElement('TR');
                    const status_detalle = status[Number(statusguia.estado)];
                    fila.innerHTML = `
                        <td>${statusguia.fecha}</td>
                        <td>${status_detalle}</td>
                        <td>${listaGuias[indice].origen}</td>
                        <td>${listaGuias[indice].destino}</td>
                    `;
                    bodyBuscarTable.appendChild(fila);
                }
            });
            buscarMensaje.textContent = "";
        } else {
            buscarMensaje.textContent = "Guía no encontrada";
        }
    } else {
        buscarMensaje.textContent = "Por favor captura un número de Guía";
    }

}

function limpiarTablaBuscar() {
    while (bodyBuscarTable.firstChild) {
        bodyBuscarTable.removeChild(bodyBuscarTable.firstChild);
    }
}