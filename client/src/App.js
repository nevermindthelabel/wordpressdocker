import React from 'react';
import Books from './components/Books';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Books} />
      </Router>
    </div>
  );
}

export default App;
