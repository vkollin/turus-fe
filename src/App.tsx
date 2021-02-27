import React from "react";
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {store} from "./store";
import {Routes} from "./type/routes";
import {FanLocationInterview, Homepage} from "./routes";
import {PageWrapper} from "./component/PageWrapper";
import {Footer} from "./component/Footer";

export class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Router>
                <PageWrapper>
                    <Switch>
                        <Route path={Routes.HOME} exact={true} component={Homepage}/>
                        <Route path={Routes.FAN_LOCATION_INTERVIEW} exact={true} component={FanLocationInterview}/>

                        <Route path='*'>404</Route>
                    </Switch>
                    <Footer/>
                </PageWrapper>
            </Router>
        </Provider>
    }
}
