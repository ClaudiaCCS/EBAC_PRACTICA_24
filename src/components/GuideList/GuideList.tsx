import { useState, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store"
import { updateGuideStatus } from "../../store/guidesSlice"
import type { Guide } from "../../types"
import "./GuideList.css"


const estados: Record<number, string> = {
  0: "Cancelada",
  1: "Pendiente",
  2: "En tránsito",
  3: "Entregada",
}

const clasesEstado: Record<number, string> = {
  0: "modal__status--cancelado",
  1: "modal__status--pendiente",
  2: "modal__status--transito",
  3: "modal__status--entregado",
}

const iconosEstado: Record<number, string> = {
  0: "icono_cancelada.png",
  1: "icono_pendiente.png",
  2: "icono_transito.png",
  3: "icono_entregada.png",
}

const formatearFecha = (fecha: string): string => {
  const partes = fecha.split("-")
  return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : fecha
}

const obtenerFechaActual = (): string => {
  const hoy = new Date()
  return [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-")
}

function GuideList() {

  // Acceder al Store de Redux
  const dispatch = useDispatch<AppDispatch>()

  // Obtener las guías y el historial
  const { guides, history } = useSelector(
    (state: RootState) => state.guides
  )
  const [guiaSeleccionada, setGuiaSeleccionada] = useState<Guide | null>(null)
  const [guiaHistorial, setGuiaHistorial] = useState<Guide | null>(null)
  const [nuevoEstado, setNuevoEstado] = useState<number>(1)
  const [fechaCambio, setFechaCambio] = useState("")

  const abrirModal = (guide: Guide) => {
    setGuiaHistorial(null)
    setGuiaSeleccionada(guide)
    setNuevoEstado(guide.estado === 3 ? 0 : guide.estado + 1)
    setFechaCambio(obtenerFechaActual())
  }

  const cerrarModal = () => setGuiaSeleccionada(null)

  const guardarCambios = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  if (!guiaSeleccionada || !fechaCambio) return

  // Actualizar el estado mediante Redux
  dispatch(
    updateGuideStatus({
      id: guiaSeleccionada.id,
      estado: nuevoEstado,
      fecha: fechaCambio,
    })
  )

  cerrarModal()
}

  const abrirHistorial = (guide: Guide) => {
    setGuiaSeleccionada(null)
    setGuiaHistorial(guide)
  }

  const cerrarHistorial = () => setGuiaHistorial(null)

  const movimientos = guiaHistorial
    ? history.filter((movement) => movement.id === guiaHistorial.id)
    : []

  return (
    <section className="main__lista" id="lista">
      <h2>Lista de Guías</h2>
      <div className="main__lista--contenedor">
        <div className="main__lista--tabla">
          <table>
            <thead>
              <tr>
                <th># Guía</th>
                <th>Estado actual</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Última actualización</th>
                <th>Actualizar estado</th>
                <th>Ver Historial</th>
              </tr>
            </thead>
            <tbody>
              {guides.length === 0 ? (
                <tr><td colSpan={7}>No hay guías registradas.</td></tr>
              ) : (
                guides.map((guide) => (
                  <tr key={guide.id}>
                    <td>{guide.guia}</td>
                    <td>{estados[guide.estado] ?? "Desconocido"}</td>
                    <td>{guide.origen}</td>
                    <td>{guide.destino}</td>
                    <td>{formatearFecha(guide.fecha)}</td>
                    <td>
                      <button type="button" className="main__lista--actualizar"
                        aria-label={`Actualizar estado de ${guide.guia}`}
                        onClick={() => abrirModal(guide)}>🔄</button>
                    </td>
                    <td>
                      <button type="button" className="main__lista--historial"
                        aria-label={`Ver historial de ${guide.guia}`}
                        onClick={() => abrirHistorial(guide)}>📋</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button type="button" className="main__lista--vermas">Ver más</button>
      </div>

      {guiaSeleccionada && (
        <div className="modal__overlay">
          <div className="modal__contenedor" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
            <div className="modal__titulo">
              <div className="modal__titulo--guia">
                <img src="/img/icono_paquete.png" className="modal__icono" alt="" />
                <h2 id="titulo-modal">Actualizar estado</h2>
              </div>
              <button type="button" className="modal__cerrar" onClick={cerrarModal} aria-label="Cerrar ventana">✕</button>
            </div>
            <div className="modal__detalle">
              <div className="modal__detalle--guia">
                <div className="modal__detalle--campo"><p>Guía: <span>{guiaSeleccionada.guia}</span></p></div>
                <div className="modal__detalle--campo"><p>Origen: <span>{guiaSeleccionada.origen}</span></p></div>
                <div className="modal__detalle--campo"><p>Destinatario: <span>{guiaSeleccionada.destinatario}</span></p></div>
              </div>
              <div className="modal__detalle--status">
                <div className="modal__detalle--campo"><p>Destino: <span>{guiaSeleccionada.destino}</span></p></div>
                <div className="modal__detalle--campostatus">
                  <p>Estado actual:</p>
                  <img src={`/img/${iconosEstado[guiaSeleccionada.estado] ?? "icono_pendiente.png"}`} className="modal__icono" alt="" />
                  <p>{estados[guiaSeleccionada.estado] ?? "Desconocido"}</p>
                </div>
              </div>
            </div>
            <div className="modal__cambio">
              <div className="modal__cambio--titulo">
                <img src="/img/icono_cambio.png" className="modal__icono" alt="" />
                <p>Nuevo estado</p>
              </div>
              <form className="modal__cambio--opcion" onSubmit={guardarCambios}>
                <div className="modal__cambio--campo">
                  <label htmlFor="estado_cambio" className="modal__cambio--label">Estado:</label>
                  <select id="estado_cambio" name="estado_cambio" value={nuevoEstado}
                    onChange={(event) => setNuevoEstado(Number(event.target.value))}>
                    <option value={0}>Cancelar</option>
                    <option value={1}>Pendiente</option>
                    <option value={2}>En tránsito</option>
                    <option value={3}>Entregado</option>
                  </select>
                </div>
                <div className="modal__cambio--campo">
                  <label htmlFor="fecha_cambio" className="modal__cambio--label">Fecha de actualización:</label>
                  <input type="date" className="modal__cambio--input" id="fecha_cambio"
                    name="fecha_cambio" value={fechaCambio}
                    onChange={(event) => setFechaCambio(event.target.value)} required />
                </div>
                <button type="submit" className="modal__cambio--submit">Guardar cambios</button>
              </form>
            </div>
            <div className="modal__footer">
              <button type="button" className="modal__footer--cerrar" onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {guiaHistorial && (
        <div className="modal__overlay">
          <div className="modal__contenedor" role="dialog" aria-modal="true" aria-labelledby="titulo-historial">
            <div className="modal__titulo">
              <div className="modal__titulo--guia">
                <img src="/img/icono_historial.png" className="modal__icono" alt="" />
                <h2 id="titulo-historial">Historial de guía</h2>
              </div>
              <button type="button" className="modal__cerrar" onClick={cerrarHistorial} aria-label="Cerrar ventana">✕</button>
            </div>
            <div className="modal__detalle">
              <div className="modal__detalle--guia">
                <div className="modal__detalle--campo"><p>Guía: <span>{guiaHistorial.guia}</span></p></div>
                <div className="modal__detalle--campo"><p>Origen: <span>{guiaHistorial.origen}</span></p></div>
                <div className="modal__detalle--campo"><p>Destinatario: <span>{guiaHistorial.destinatario}</span></p></div>
              </div>
              <div className="modal__detalle--status">
                <div className="modal__detalle--campo"><p>Destino: <span>{guiaHistorial.destino}</span></p></div>
                <div className="modal__detalle--campostatus">
                  <p>Estado actual:</p>
                  <img src={`/img/${iconosEstado[guiaHistorial.estado] ?? "icono_pendiente.png"}`} className="modal__icono" alt="" />
                  <p>{estados[guiaHistorial.estado] ?? "Desconocido"}</p>
                </div>
              </div>
            </div>
            <div className="modal__estados">
              <div className="modal__estados--titulo">
                <img src="/img/icono_historial.png" className="modal__icono" alt="" />
                <p>Movimientos de la guía</p>
              </div>
              <div className="modal__estados--tabla">
                <table>
                  <thead><tr><th>Fecha</th><th>Estado</th></tr></thead>
                  <tbody>
                    {movimientos.length === 0 ? (
                      <tr><td colSpan={2}>No hay movimientos registrados.</td></tr>
                    ) : (
                      movimientos.map((movement, index) => (
                        <tr key={`${movement.id}-${index}`}>
                          <td>{formatearFecha(movement.fecha)}</td>
                          <td className={clasesEstado[movement.estado] ?? ""}>
                            • {estados[movement.estado] ?? "Desconocido"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal__footer">
              <button type="button" className="modal__footer--cerrar" onClick={cerrarHistorial}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GuideList
