import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Container from './components/common/container'
import NavBar from './components/ui/NavBar'
import routes from './routes'
import { QualitiesProvider, useQualities } from './hooks/useQualities'

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key}/>
    })
}

function App () {
    return (
        <div className='App'>
            <NavBar routes={routes}/>
            <QualitiesProvider>
                <Container>
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect to='/'/>
                    </Switch>
                </Container>
            </QualitiesProvider>
            <ToastContainer/>
        </div>
    )
}

export default App
