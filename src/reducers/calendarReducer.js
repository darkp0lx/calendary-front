//make a reducer for UI

import { types } from "../types/types"

const initialState = {
  events: [],
  activeEvent: null
};
export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case types.clearEvent: {
      return {
        ...state,
        activeEvent: null
      }
    }
    case types.eventSave: {
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ?
            action.payload : event
        )
      }
    }
    case types.eventDelete: {
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id),
        activeEvent: null
      }
    }

    default:
      return state
  }
}