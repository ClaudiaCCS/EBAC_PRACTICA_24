

import { useState } from "react";
import type { Guide, HistoryEntry } from "./types";

import "./App.css";
import Footer from "./components/Footer/Footer";
import GuideForm from "./components/GuideForm/GuideForm";
import GuideHistory from "./components/GuideHistory/GuideHistory";
import GuideList from "./components/GuideList/GuideList";
import Header from "./components/Header/Header";
import StatusPanel from "./components/StatusPanel/StatusPanel";

function App() {

  const [guides, setGuides] = useState<Guide[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  
const handleAddGuide = (newGuide: Omit<Guide, "id">): boolean => {

  // Validar que el número de guía no esté repetido
  const existe = guides.some(
    (guide) => guide.guia.toLowerCase() === newGuide.guia.trim().toLowerCase()
  );

  if (existe) {
    return false;
  }

  // Generar un nuevo identificador
  const newId = guides.length > 0
    ? Math.max(...guides.map((guide) => guide.id)) + 1
    : 1;

  // Crear el objeto completo de la guía
  const guideToAdd: Guide = {
    ...newGuide,
    id: newId,
  };

  // Agregar la guía al estado
  setGuides((previousGuides) => [...previousGuides, guideToAdd]);

  // Crear el primer movimiento del historial
  const initialHistory: HistoryEntry = {
    id: newId,
    guia: newGuide.guia,
    fecha: newGuide.fecha,
    estado: 1,
  };

  setHistory((previousHistory) => [
    ...previousHistory,
    initialHistory,
  ]);

  return true;
}


const handleUpdateGuide = (
  id: number,
  estado: number,
  fecha: string
): void => {

  setGuides((previousGuides) =>
    previousGuides.map((guide) =>
      guide.id === id
        ? { ...guide, estado, fecha }
        : guide
    )
  )

  setHistory((previousHistory) => [
    ...previousHistory,
    {
      id,
      guia: guides.find((guide) => guide.id === id)?.guia ?? "",
      fecha,
      estado,
    },
  ])
}



  return (
    <div className="app">
      <Header />
      <main>
        <GuideForm onAddGuide={handleAddGuide} />
        <StatusPanel guides={guides} />
        <GuideList
          guides={guides}
          history={history}
          onUpdateGuide={handleUpdateGuide}
        />
        <GuideHistory
          guides={guides}
          history={history}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
