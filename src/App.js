import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bear Burger Builder</p>
      </header>
      <Layout>
        <h3>Test</h3>
      </Layout>
    </div>
  );
}

export default App;
