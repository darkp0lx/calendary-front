import React from 'react'

export const CalendarEvent = ({ event }) => {
  const { title, user } = event
  return (
    <div className="calendarEvent--container">
      <p>{title}</p>
      <strong style={{
        color: "#E9EFC0",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        {user.name}
      </strong>
    </div>
  )
}
