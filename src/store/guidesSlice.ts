
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Guide, HistoryEntry } from "../types"

interface GuidesState {
  guides: Guide[]
  history: HistoryEntry[]
}

const initialState: GuidesState = {
  guides: [],
  history: [],
}

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    addGuide: (state, action: PayloadAction<Omit<Guide, "id">>) => {
      const existe = state.guides.some(
        (guide) =>
          guide.guia.trim().toLowerCase() ===
          action.payload.guia.trim().toLowerCase()
      )

      if (existe) return

      const newId =
        state.guides.length > 0
          ? Math.max(...state.guides.map((guide) => guide.id)) + 1
          : 1

      const newGuide: Guide = {
        ...action.payload,
        id: newId,
      }

      state.guides.push(newGuide);

      const initialHistory: HistoryEntry = {
        id: newId,
        guia: newGuide.guia,
        fecha: newGuide.fecha,
        estado: 1,
      }

      state.history.push(initialHistory)
    },

    updateGuideStatus: (
      state,
      action: PayloadAction<{
        id: number
        estado: number
        fecha: string
      }>
    ) => {
      const { id, estado, fecha } = action.payload

      const guide = state.guides.find(
        (guide) => guide.id === id
      )

      if (!guide) return

      guide.estado = estado
      guide.fecha = fecha

      state.history.push({
        id,
        guia: guide.guia,
        fecha,
        estado,
      })
    },
  },
})

export const { addGuide, updateGuideStatus } =
  guidesSlice.actions

export default guidesSlice.reducer
