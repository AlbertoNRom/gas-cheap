import type { GasStation, PriorityType } from "@/types"

// Tamaño de lote para scroll infinito
export const BATCH_SIZE = 12

export type State = {
  priority: PriorityType
  gasStations: GasStation[]
  loading: boolean
  error: string | null
  visibleCount: number
}

export type Action =
  | { type: "SET_PRIORITY"; payload: PriorityType }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: GasStation[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "RESET_VISIBLE" }
  | { type: "INCREASE_VISIBLE" }

export const initialState: State = {
  priority: "price",
  gasStations: [],
  loading: false,
  error: null,
  visibleCount: BATCH_SIZE,
}

export const reducer = (state: State, action: Action): State => {
  const handlers = {
    SET_PRIORITY: (s: State, a: { type: "SET_PRIORITY"; payload: PriorityType }) => ({
      ...s,
      priority: a.payload,
    }),
    FETCH_START: (s: State) => ({
      ...s,
      loading: true,
      error: null,
    }),
    FETCH_SUCCESS: (s: State, a: { type: "FETCH_SUCCESS"; payload: GasStation[] }) => ({
      ...s,
      loading: false,
      gasStations: a.payload,
      visibleCount: BATCH_SIZE,
    }),
    FETCH_ERROR: (s: State, a: { type: "FETCH_ERROR"; payload: string }) => ({
      ...s,
      loading: false,
      error: a.payload,
    }),
    RESET_VISIBLE: (s: State) => ({
      ...s,
      visibleCount: BATCH_SIZE,
    }),
    INCREASE_VISIBLE: (s: State) => ({
      ...s,
      visibleCount: Math.min(s.visibleCount + BATCH_SIZE, s.gasStations.length),
    }),
  } satisfies {
    SET_PRIORITY: (s: State, a: { type: "SET_PRIORITY"; payload: PriorityType }) => State
    FETCH_START: (s: State, a?: { type: "FETCH_START" }) => State
    FETCH_SUCCESS: (s: State, a: { type: "FETCH_SUCCESS"; payload: GasStation[] }) => State
    FETCH_ERROR: (s: State, a: { type: "FETCH_ERROR"; payload: string }) => State
    RESET_VISIBLE: (s: State, a?: { type: "RESET_VISIBLE" }) => State
    INCREASE_VISIBLE: (s: State, a?: { type: "INCREASE_VISIBLE" }) => State
  }

  const handler = handlers[action.type as keyof typeof handlers] as (s: State, a: any) => State
  return handler ? handler(state, action as any) : state
}