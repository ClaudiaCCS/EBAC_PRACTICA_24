

import { useState, useEffect, type FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { addGuide } from "../../store/guidesSlice"
import type { Guide } from "../../types"
import "./GuideForm.css"


function GuideForm() {
  const dispatch = useDispatch<AppDispatch>()

  const guides = useSelector(
    (state: RootState) => state.guides.guides
  )

  const [mensaje, setMensaje] = useState("")
  const [tipoMensaje, setTipoMensaje] = useState<"error" | "exito" | "">("")

  useEffect(() => {
  if (!mensaje) return;

  const temporizador = setTimeout(() => {
    setMensaje("");
    setTipoMensaje("");
  }, 5000);

  return () => clearTimeout(temporizador);
}, [mensaje]);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const hoy = new Date()
  const fechaActual = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-")

  // Función que recibe el envío del formulario
  const submitGuia = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMensaje("")
    setTipoMensaje("")

    const formulario = event.currentTarget
    const datos = new FormData(formulario)

    const nuevaGuia: Omit<Guide, "id"> = {
      guia: String(datos.get("num_guia")).trim(),
      origen: String(datos.get("origen")).trim(),
      destino: String(datos.get("destino")).trim(),
      destinatario: String(datos.get("destinatario")).trim(),
      fecha: String(datos.get("fecha_creacion")),
      estado: 1,
    }

    // Validar los campos
    if (
      !nuevaGuia.guia ||
      !nuevaGuia.origen ||
      !nuevaGuia.destino ||
      !nuevaGuia.destinatario ||
      !nuevaGuia.fecha
    ) {
      setMensaje("Todos los campos son obligatorios.")
      setTipoMensaje("error")
      return
    }

    // Validar si la guía ya existe
    const existe = guides.some(
      (guide) =>
        guide.guia.trim().toLowerCase() ===
        nuevaGuia.guia.toLowerCase()
    )

    if (existe) {
      setMensaje(`La guía ${nuevaGuia.guia} ya existe.`)
      setTipoMensaje("error")
      return
    }

    // Enviar la acción a Redux
    dispatch(addGuide(nuevaGuia))

    setMensaje("¡Registro creado correctamente!")
    setTipoMensaje("exito")
    formulario.reset()
  }

  return (
    <section className="main__registro" id="registro">
      <h2>Registro de guías</h2>

      <div className="main__registro--contenedor">
        <div className="main__registro--formulario">
          <form id="main__formulario" onSubmit={submitGuia}>
            {mensaje && (
              <p className={`main__formulario--alerta main__formulario--${tipoMensaje}`}>
                {mensaje}
              </p>
            )}

            <div className="main__registro--campo">
              <label htmlFor="num_guia">Número de Guía:</label>
              <input
                type="text"
                id="num_guia"
                name="num_guia"
                placeholder="Número de Guía"
                required
              />
            </div>

            <div className="main__registro--campo">
              <label htmlFor="origen">Origen:</label>
              <input
                type="text"
                id="origen"
                name="origen"
                placeholder="Indicar el Origen"
                required
              />
            </div>

            <div className="main__registro--campo">
              <label htmlFor="destino">Destino:</label>
              <input
                type="text"
                id="destino"
                name="destino"
                placeholder="Indicar el Destino"
                required
              />
            </div>

            <div className="main__registro--campo">
              <label htmlFor="destinatario">Destinatario:</label>
              <input
                type="text"
                id="destinatario"
                name="destinatario"
                placeholder="Indicar el Destinatario"
                required
              />
            </div>

            <div className="main__registro--campo">
              <label htmlFor="fecha_creacion">
                Fecha de Creación:
              </label>
              <input
                type="date"
                id="fecha_creacion"
                name="fecha_creacion"
                defaultValue={fechaActual}
                required
              />
            </div>

            <div className="main__registro--campo">
              <label htmlFor="estado_inicial">
                Estado Inicial:
              </label>
              <select
                name="estado_inicial"
                id="estado_inicial"
                disabled
                defaultValue="1"
              >
                <option value="0">-- Seleccione --</option>
                <option value="1">Pendiente</option>
                <option value="2">En Tránsito</option>
                <option value="3">Entregado</option>
              </select>
            </div>

            <input
              type="submit"
              className="main__registro--submit"
              value="Registrar Guía"
            />
          </form>
        </div>

        <div className="main__registro--img">
          <img src="/img/registro.png" alt="Registro de guías" />
        </div>
      </div>
    </section>
  )
}

export default GuideForm
