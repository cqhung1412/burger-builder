import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import AuxWithClass from './hoc/Auxiliary/AuxWithClass/AuxWithClass';
import QRCodeHandler from './containers/QRCode/QRCodeHandler';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path='/builder' component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/qrcode' component={QRCodeHandler} />
          <Redirect exact from='/' to='/builder' />
          <Route render={() => <h1>404 Not Found!!!</h1>}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default AuxWithClass(App, classes.App);
