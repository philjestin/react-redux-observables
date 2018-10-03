
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Store
import configureStore from './configureStore';

// Pages
import APOD from './APOD';

const store = configureStore();

const Router = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={renderProps => (
      <>
        <Component {...renderProps} />
      </>
    )}
  />
);

Router.propTypes = {
  component: PropTypes.func.isRequired,
};

const Container = () => (
  <Provider store={store}>
    <>
      <BrowserRouter>
        <Switch>
          <Router path="/" component={APOD} />
        </Switch>
      </BrowserRouter>
    </>
  </Provider>
);

ReactDOM.render(<Container />, document.getElementById('index'));
