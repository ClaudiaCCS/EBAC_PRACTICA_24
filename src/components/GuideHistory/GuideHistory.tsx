import { useState, type FormEvent } from "react"
import type { Guide, HistoryEntry } from "../../types"
import "./GuideHistory.css"

interface GuideHistoryProps {
  guides: Guide[]
  history: HistoryEntry[]
}

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

const formatearFecha = (fecha: string): string => {
  const [year, month, day] = fecha.split("-")
  return `${day}/${month}/${year}`
}

function GuideHistory({ guides, history }: GuideHistoryProps) {

  const [numeroGuia, setNumeroGuia] = useState("")
  const [guiaEncontrada, setGuiaEncontrada] = useState<Guide | null>(null)
  const [mensaje, setMensaje] = useState(
    "Indica una guía para mostrar su historial."
  )

  // Buscar una guía
  const buscarGuia = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const busqueda = numeroGuia.trim().toLowerCase()

    if (!busqueda) {
      setGuiaEncontrada(null)
      setMensaje("Por favor, captura un número de guía.")
      return
    }

    const guia = guides.find(
      (item) => item.guia.trim().toLowerCase() === busqueda
    )

    if (!guia) {
      setGuiaEncontrada(null)
      setMensaje("Guía no encontrada.")
      return
    }

    setGuiaEncontrada(guia)
    setMensaje("")
  };

  // Obtener movimientos de la guía encontrada
  const movimientos = guiaEncontrada
    ? history
        .filter((movement) => movement.id === guiaEncontrada.id)
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
    : []

  return (
    <section className="main__buscar" id="buscar">
      <h2>Buscador de Guías</h2>

      <form className="main__buscar--formulario" onSubmit={buscarGuia}>
        <label htmlFor="buscar">Número de Guía:</label>

        <input
          type="text"
          id="buscar"
          placeholder="Indicar número de guía"
          value={numeroGuia}
          onChange={(event) => setNumeroGuia(event.target.value)}
        />

        <button type="submit" className="main__buscar--boton">
          Buscar
        </button>
      </form>

      <div className="main__buscar--tabla">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Origen</th>
              <th>Destino</th>
            </tr>
          </thead>

          <tbody>
            {guiaEncontrada && movimientos.length > 0 ? (
              movimientos.map((movement, index) => (
                <tr key={`${movement.id}-${index}`}>
                  <td>{formatearFecha(movement.fecha)}</td>

                  <td className={clasesEstado[movement.estado]}>
                    • {estados[movement.estado]}
                  </td>

                  <td>{guiaEncontrada.origen}</td>
                  <td>{guiaEncontrada.destino}</td>
                </tr>
              ))
            ) : guiaEncontrada ? (
              <tr>
                <td colSpan={4}>
                  No hay movimientos registrados para esta guía.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>

        {mensaje && (
          <p className="main__buscar--mensaje">
            {mensaje}
          </p>
        )}
      </div>
    </section>
  );
}

export default GuideHistory;
