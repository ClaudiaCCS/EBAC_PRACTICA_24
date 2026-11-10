import type { Guide } from "../../types";
import "./StatusPanel.css";

interface StatusPanelProps {
  guides: Guide[];
}

function StatusPanel({ guides }: StatusPanelProps) {
  // Total de guías registradas
  const totalGuias = guides.length;

  // Cantidad de guías por estado
  const canceladas = guides.filter((guide) => guide.estado === 0).length;
  const pendientes = guides.filter((guide) => guide.estado === 1).length;
  const transito = guides.filter((guide) => guide.estado === 2).length;
  const entregadas = guides.filter((guide) => guide.estado === 3).length;

  // Calcular porcentajes
  const calcularPorcentaje = (cantidad: number): string => {
    return totalGuias === 0
      ? "0.00"
      : ((cantidad / totalGuias) * 100).toFixed(2);
  };

  const porcentajeCanceladas = calcularPorcentaje(canceladas);
  const porcentajePendientes = calcularPorcentaje(pendientes);
  const porcentajeTransito = calcularPorcentaje(transito);
  const porcentajeEntregadas = calcularPorcentaje(entregadas);

  // Calcular los grados de la gráfica circular
  const gradosCanceladas = (canceladas / (totalGuias || 1)) * 360;
  const gradosPendientes = (pendientes / (totalGuias || 1)) * 360;
  const gradosTransito = (transito / (totalGuias || 1)) * 360;

  const graficaPastel = {
    background: totalGuias === 0
    ? "#d9dfe7"
    : `conic-gradient(
        #e74c3c 0deg ${gradosCanceladas}deg,
        #f1c40f ${gradosCanceladas}deg ${gradosCanceladas + gradosPendientes}deg,
        #3498db ${gradosCanceladas + gradosPendientes}deg ${gradosCanceladas + gradosPendientes + gradosTransito}deg,
        #2ecc71 ${gradosCanceladas + gradosPendientes + gradosTransito}deg 360deg
      )`,
  }

  return (
    <section className="main__estado" id="estado">
      <h2>Estado General</h2>

      <div className="main__estado--general">
        {/* Gráfica circular */}
        <div className="main__estado--grafica">
          <div className="main__estado--lagrafica">
            <div
              className="main__estado--pastel"
              role="img"
              aria-label={`Gráfica de estados: ${porcentajeCanceladas}% canceladas, ${porcentajePendientes}% pendientes, ${porcentajeTransito}% en tránsito y ${porcentajeEntregadas}% entregadas`}
              style={graficaPastel}
            />
            <div className="main__estado--leyenda">
              <span><i className="canceladas" /> Canceladas</span>
              <span><i className="pendientes" /> Pendientes</span>
              <span><i className="transito" /> En tránsito</span>
              <span><i className="entregadas" /> Entregadas</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de estados */}
        <div className="main__estado--tguias">
          <div className="main__estado--todasguias">
            <div className="main__estado--guias">
              {/* Pendientes */}
              <div className="main__estado--contenedor">
                <div className="main__estado--img">
                  <img src="/img/icono_pendiente.png" alt="" />
                </div>
                <div className="main__estado--texto">
                  <p className="main__estado--titulo">PENDIENTES</p>
                  <div className="main__estado--conttexto">
                    <p className="main__estado--numero pendientes">{pendientes}</p>
                    <p className="main__estado--porcentaje pendientes">
                      {porcentajePendientes} %
                    </p>
                  </div>
                </div>
              </div>

              {/* Entregadas */}
              <div className="main__estado--contenedor">
                <div className="main__estado--img">
                  <img src="/img/icono_entregada.png" alt="" />
                </div>
                <div className="main__estado--texto">
                  <p className="main__estado--titulo">ENTREGADAS</p>
                  <div className="main__estado--conttexto">
                    <p className="main__estado--numero entregadas">{entregadas}</p>
                    <p className="main__estado--porcentaje entregadas">
                      {porcentajeEntregadas} %
                    </p>
                  </div>
                </div>
              </div>

              {/* En tránsito */}
              <div className="main__estado--contenedor">
                <div className="main__estado--img">
                  <img src="/img/icono_transito.png" alt="" />
                </div>
                <div className="main__estado--texto">
                  <p className="main__estado--titulo">EN TRÁNSITO</p>
                  <div className="main__estado--conttexto">
                    <p className="main__estado--numero transito">{transito}</p>
                    <p className="main__estado--porcentaje transito">
                      {porcentajeTransito} %
                    </p>
                  </div>
                </div>
              </div>

              {/* Canceladas */}
              <div className="main__estado--contenedor">
                <div className="main__estado--img">
                  <img src="/img/icono_cancelada.png" alt="" />
                </div>
                <div className="main__estado--texto">
                  <p className="main__estado--titulo">CANCELADAS</p>
                  <div className="main__estado--conttexto">
                    <p className="main__estado--numero canceladas">{canceladas}</p>
                    <p className="main__estado--porcentaje canceladas">
                      {porcentajeCanceladas} %
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total de guías */}
            <div className="main__estado--totales">
              <div className="main__estado--contenedor">
                <div className="main__estado--img">
                  <img src="/img/icono_de_paquete.png" alt="" />
                </div>
                <div className="main__estado--texto">
                  <p className="main__estado--titulo">TOTAL GUÍAS</p>
                  <p className="main__estado--numero">{totalGuias}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}

export default StatusPanel;
