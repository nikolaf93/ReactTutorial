import React from 'react';
import { MyComponent } from './myComponent';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <header className="App-header">
        <MyComponent str={'No one wins 🙃'}></MyComponent>
      </header>
    </div>
  );
}

export default App;
