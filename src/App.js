import { Route, Routes } from 'react-router-dom';
import './App.css';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Error from './pages/errores/Error';
import NotFound from './pages/errores/NotFound';
import CallesList from './pages/calles/CallesList';
import CallesDetails from './pages/calles/CallesDetails';
import CallesEdit from './pages/calles/CallesEdit';
import CarList from './components/cars/CarList';


function App() {
  return (
    <div className="App">

      <Navbar />
      
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signup' element={ <Signup /> } />        

        {/* paginas privadas */}
        <Route path='/profile' element={ <IsPrivate> <Profile /> </IsPrivate>} />

        <Route path='/calles' element={ <IsPrivate> <CallesList /> </IsPrivate>} />
        <Route path='/calles/:calleId/details' element={ <IsPrivate> <CallesDetails /> </IsPrivate>} />
        <Route path='/calles/:calleId/edit' element={ <IsPrivate> <CallesEdit /> </IsPrivate>} />

        <Route path='/cars' element={ <IsPrivate> <CarList /> </IsPrivate>} />
        

        {/* potenciales errores */}
        <Route path='/error' element={ <Error /> } />
        <Route path='*' element={ <NotFound /> } />


      </Routes>

        
    </div>
  );
}

export default App;
