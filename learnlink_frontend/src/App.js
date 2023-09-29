import logo from './logo.svg';
import './App.css';

function App() {
  // need a favicon and name for site
  // need to include components for pages
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/*
        At least 4 routes
        Home - for search/previously created curriculums
        signup - series of modals for creating account
        login - modal for login, may not need its own route
        profile - existing preferences with option to change / recents / saved curriculum
        curriculum result - Maybe add features to interact with curriculum like highlighting or clicking to elaborate or search for other options
          - Maybe allow the curriculum returned to be edited before saving into the users favorites?

      */}
    </div>
  );
}

export default App;
