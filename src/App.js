import React from 'react'
import Nav from './components/Nav/Nav'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import './App.css'

function App(props) {
  const { location } = props
  return (
    <div className='App'>
      {/* pass props to nav ...props to make history.push to work */}
      {location.pathname === '/' ? <></> : <Nav {...props} />}
      {routes}
    </div>
  )
}

export default withRouter(App)
