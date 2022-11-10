import { Route, Routes } from 'react-router-dom';
import './App.css';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

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

        {/* potenciales errores */}
        <Route path='/error' element={ <Error /> } />
        <Route path='*' element={ <NotFound /> } />


      </Routes>

        
    </div>
  );
}

export default App;
