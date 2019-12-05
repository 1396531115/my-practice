import React from 'react';
let name: string = 'wangX'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        this is a test, {name}
      </header>
    </div>
  );
}

export default App;
