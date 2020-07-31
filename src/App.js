import React from 'react';
import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import AuxWithClass from './hoc/Auxiliary/AuxWithClass/AuxWithClass';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default AuxWithClass(App, classes.App);
