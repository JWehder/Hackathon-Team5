import './App.css';
import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Ebooks from './components/Ebooks';
import Courses from './components/Courses';
import CompletedCourses from './components/CompletedCourses';
import Community from './components/Community';
import Settings from './components/Settings';
import Ebook from './components/Ebook';

function App() {
 const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence >
        <Routes location={location} key={location.pathname}>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='sidebar' element={<Sidebar />} />
          <Route exact path='home' element={<Home />} />
          <Route exact path='ebooks' element={<Ebooks />} />
          <Route exact path='courses' element={<Courses />} />
          <Route exact path='completedcourses' element={<CompletedCourses />} />
          <Route exact path='community' element={<Community />} />
          <Route exact path='settings' element={<Settings />} />
          <Route exact path='ebooks/1' element={<Ebook />} />
        </Routes>
      </AnimatePresence>
    </div>
  );

}

export default App;
