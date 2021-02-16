import React from "react";
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {store} from "./store";
import {PageContent} from "./component/PageContent";
import {Routes} from "./type/routes";
import {ApiDocumentation, FanLocationInterview} from "./routes";

export class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Router>
                <PageContent>
                    <Switch>
                        <Route path={Routes.HOME} exact={true} component={FanLocationInterview}/>
                        <Route path={Routes.API_DOCUMENTATION} exact={true} component={ApiDocumentation}/>

                        <Route path='*'>404</Route>
                    </Switch>
                </PageContent>
            </Router>
        </Provider>
    }
}
