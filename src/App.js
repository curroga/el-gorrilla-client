import { Route, Routes } from 'react-router-dom';
import './App.css';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import Error from './pages/errores/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/errores/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import CallesList from './pages/calles/CallesList';
import CallesDetails from './pages/calles/CallesDetails';
import CallesEdit from './pages/calles/CallesEdit';

function App() {
  return (
    <div className="App">

      <Navbar />
      
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/login' element={ <Login /> } />

        {/* paginas privadas */}
        <Route path='/profile' element={ <IsPrivate> <Profile /> </IsPrivate>} />
        <Route path='/calles' element={ <IsPrivate> <CallesList /> </IsPrivate>} />
        <Route path='/calles/:calleId/details' element={ <IsPrivate> <CallesDetails /> </IsPrivate>} />
        <Route path='/calles/:calleId/edit' element={ <IsPrivate> <CallesEdit /> </IsPrivate>} />

        {/* potenciales errores */}
        <Route path='/error' element={ <Error /> } />
        <Route path='*' element={ <NotFound /> } />


      </Routes>

        
    </div>
  );
}

export default App;
