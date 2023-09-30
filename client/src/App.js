import './App.css';
import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
 const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence >
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </AnimatePresence>
    </div>
  );

}

export default App;
