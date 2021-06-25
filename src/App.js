import React from 'react'
import Dashboard from './pages/Dashboard'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import DashboardFree from './pages/DashboardFree'
import ForgotPassword from './Auth/ForgotPassword'
import QueryPage from './pages/QueryPage'
import { AuthProvider } from './Context/AuthContext'
import { ContentContextProvider } from './Context/ContentContext'
import PrivateRoute from "./Auth/PrivateRoute"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import TestOut from './pages/TestOut'
import CssBaseline from '@material-ui/core/CssBaseline';



function App() {  

  return (
    <div >
      <Router>
        <AuthProvider>
          <ContentContextProvider>
            <Switch>

              <PrivateRoute exact path="/" component={Dashboard}  />
              <PrivateRoute exact path="/querypage" component={QueryPage} />
              <Route path="/start" component={DashboardFree} />
              <Route path="/test" component={TestOut} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <CssBaseline />

            </Switch>
          </ContentContextProvider>
        </AuthProvider>
      </Router>
    </div>

  )
}

export default App
