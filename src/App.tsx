import React from "react";
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {store} from "./store";
import {Routes} from "./type/routes";
import {FanLocationInterview, Homepage, Map, Result} from "./routes";

export class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Router>
                <Switch>
                    <Route path={Routes.HOME} exact={true} component={Homepage}/>
                    <Route path={Routes.FAN_LOCATION_INTERVIEW} exact={true} component={FanLocationInterview}/>
                    <Route path={Routes.MAP} exact={true} component={Map}/>
                    <Route path={Routes.RESULT} exact={true} component={Result}/>

                    <Route path={'/map'} exact={true}>
                        <Redirect to={Routes.MAP}/>
                    </Route>

                    <Route path='*'>404</Route>
                </Switch>
            </Router>
        </Provider>
    }
}
