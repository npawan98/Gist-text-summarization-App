import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Help from '../pages/Help'
import ScanScreen from '../pages/ScanScreen'

function Routes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/help">
                        {/* news */}
                        {/* <Home /> */}
                        <Help/>

                    </Route>

                    <Route path="/">
                        <ScanScreen />
                        {/* <App/> */}

                    </Route>

                </Switch>


            </Router>

        </div>
    )
}

export default Routes
