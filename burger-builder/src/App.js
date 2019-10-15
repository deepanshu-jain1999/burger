import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {

        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Switch>
            );
        }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapPropsToState = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToState = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapPropsToState, mapDispatchToState)(App);
