import { useReducer } from "react"
import type { Action, State } from "@/components/reducers/gasStationFinder"
import { initialState, reducer } from "@/components/reducers/gasStationFinder"

export function useGasStationFinderReducer(): [State, React.Dispatch<Action>] {
	return useReducer(reducer, initialState)
}
