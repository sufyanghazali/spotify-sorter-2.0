import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from './Dashboard';
import Login from './Login';

const access_token = new URLSearchParams(window.location.search).get("access_token");

function App() {
  return access_token ? <Dashboard access_token={access_token} /> : <Login />
}

export default App;
