import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import Modal from 'react-modal';
import "./Calendar.css"
import "react-datetime-picker/dist/DateTimePicker.css"
import 'react-clock/dist/Clock.css';
import "react-calendar/dist/Calendar.css"
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction, openModalAction } from '../../actions/ui';
import { clearEvent, eventAddNew, eventSave } from '../../actions/calendar';

import styled from "styled-components"
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const startDate = moment().minutes(0).seconds(0).add(1, "hours")

const EndDate = moment().minutes(30).seconds(0).add(3, "hours")

const initialState = {
  title: "Event Title",
  notes: "",
  start: startDate.toDate(),
  end: EndDate.toDate(),
  user: {
    id: "21312",
    name: "hector_dev"
  },

}
export const CalendarModal = () => {
  const { modalOpen } = useSelector(store => store.ui)
  const { activeEvent } = useSelector(store => store.calendar)
  const [formValues, setFormValues] = useState(initialState)
  const { title, notes, start, end } = formValues
  const [titleValid, setTitleValid] = useState(true)
  const dispatch = useDispatch()

  function openModal() {
    dispatch(openModalAction())
    if (activeEvent) {
      setFormValues(activeEvent)
    } else {
      setFormValues(initialState)
    }

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    dispatch(closeModalAction())
    dispatch(clearEvent())
  }

  const handleChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value })
  }
  const handleStartDate = (e) => {
    setFormValues({ ...formValues, start: e })
  }

  const handleEndDate = (e) => {
    setFormValues({ ...formValues, end: e })

  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (momentStart.isAfter(momentEnd)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'la fecha 2 debe ser mucho mayor que la uno!'
      })
    }
    if (title?.trim().length < 2) {
      setTitleValid(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'el titulo debe tener mas de dos letras'
      })
    } else {
      if (!activeEvent) {
        dispatch(eventAddNew(formValues))
        setTitleValid(true)

      } else {
        dispatch(eventSave(formValues))
        setTitleValid(true)
      }
      closeModal()
    }
  }


  useEffect(() => {
    console.log(activeEvent, "useEffect")
    if (!activeEvent) {
      setFormValues(initialState)
    } else {
      console.log(activeEvent, "useEffect")
      setFormValues(activeEvent)
    }
  }, [activeEvent, setFormValues])

  return (
    <div>
      <ButtonAddNew onClick={openModal}>
        <i className="fa-solid fa-plus"></i>&emsp;agregar un evento</ButtonAddNew>
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeOutMS={6000}
        className="modal"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label>Fecha y hora inicio</label>
            </div>
            <DateTimePicker className="form-control" onChange={handleStartDate} value={start} />
          </div>

          <div className="form-group">
            <div>
              <label>Fecha y hora fin</label>
            </div>
            <DateTimePicker className="form-control" minDate={start} onChange={handleEndDate} value={end} />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  )
}

const ButtonAddNew = styled.button`

  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  border-radius: 10px;

&:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

&:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

&:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
`
