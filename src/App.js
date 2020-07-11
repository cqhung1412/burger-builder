import React from 'react';
import logo from './assets/logo.svg';
import classes from './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <img src={logo} className={classes.AppLogo} alt="logo" />
        <p>Bear Burger Builder</p>
      </header>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
