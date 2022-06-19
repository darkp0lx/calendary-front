import React, { useEffect, useState } from 'react'
import { NavBar } from '../ui/NavBar'
import { Calendar, momentLocalizer } from "react-big-calendar"
import styled from "styled-components"
import { openModalAction } from "../../actions/ui"

import moment from "moment"
import "moment/locale/es"

import "./Calendar.css"

import "react-big-calendar/lib/css/react-big-calendar.css"
import { messages } from "../../helpers/calendar-messages-es"
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useSelector, useDispatch } from 'react-redux'
import { clearEvent, deleteEvent, eventAddNew, eventSetActive } from '../../actions/calendar'
import { uid } from '../../helpers/helpers'
const localizer = momentLocalizer(moment)


moment.locale("es")

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month")
  const { events } = useSelector(store => store.calendar)
  const { activeEvent } = useSelector(store => store.calendar)
  const dispatch = useDispatch()

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#4E944F',
      height: '75px',
      color: "white"
    }
    return {
      style
    }
  }


  const onDoubleClick = (event) => {
    console.log("event double click", event)
    dispatch(openModalAction())

  }

  const onSelect = (event) => {
    console.log("seleccionado", event)
    dispatch(eventSetActive(event))

  }
  const onViewChange = (e) => {
    console.log("cambio de vista", e)
    setLastView(e)
    localStorage.setItem("lastView", e)
  }

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(activeEvent))
  }




  const onSelectSlot = (e) => {
    console.log("seleccionado slot", e)
    dispatch(clearEvent())
    const start = e.start
    const end = e.end
    const title = "Evento"
    const notes = "Notas"
    const user = {
      id: "21312",
      name: "hector_dev"
    }
    dispatch(eventAddNew({
      start: start,
      end: end,
      title: title,
      notes: notes,
      user: user,
    }))
    // dispatch(eventSetActive())

    dispatch(openModalAction())
  }
  return (
    <div>
      <NavBar />
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
      />
      <CalendarModal />
      {activeEvent &&
        <ButtonDelete onClick={handleDeleteEvent}>
          <i className="fa-solid fa-trash"></i>
          &emsp;delete
        </ButtonDelete>

      }
    </div>
  )
}

export default CalendarScreen

const ButtonDelete = styled.div`
align-items: center;
appearance: none;
background-color: red;
border-radius: 4px;
border-width: 0;
box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
box-sizing: border-box;
color: white;
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
left: 20px;
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