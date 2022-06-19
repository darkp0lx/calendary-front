import { uid } from "../helpers/helpers"
import { types } from "../types/types"

export const eventAddNew = (event) => {
  return {
    type: types.eventAddNew,
    payload: {
      ...event,
      id: uid()
    }
  }
}

export const eventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event
  }
}

export const clearEvent = () => {
  return {
    type: types.clearEvent
  }
}

export const eventSave = (event) => {
  console.log("eventSave", event)
  return {
    type: types.eventSave,
    payload: event
  }
}

export const deleteEvent = (event) => {
  console.log("delete event", event)
  return {
    type: types.eventDelete,
    payload: event
  }
}