
export interface Guide {
  id: number;
  guia: string;
  origen: string;
  destino: string;
  destinatario: string;
  fecha: string;
  estado: number;
}

export interface HistoryEntry {
  id: number;
  guia: string;
  fecha: string;
  estado: number;
}
