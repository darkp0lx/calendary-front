import { types } from "../types/types"

export const openModalAction = () => {
  return {
    type: types.uiOpenModal,
    payload: true
  }
}

export const closeModalAction = () => {
  return {
    type: types.uiCloseModal,
    payload: false
  }
}