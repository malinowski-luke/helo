import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import Post from './components/Post/Post'
import Form from './components/Form/Form'

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/post/:post_id' component={Post} />
    <Route path='/new' component={Form} />
  </Switch>
)
