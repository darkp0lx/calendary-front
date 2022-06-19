import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'
import CalendarScreen from '../calendar/CalendarScreen'

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginScreen />} />
      <Route exact path="/register" element={<RegisterScreen />} />
      <Route exact path="/" element={<CalendarScreen />} />
      <Route
        path="*"
        element={<Navigate replace to="/" />}
      />
    </Routes>
  )
}

export default AppRouter