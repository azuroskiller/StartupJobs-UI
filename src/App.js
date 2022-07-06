import logo from './logo.svg';
import './App.css';
import react from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CreateUser from './components/create-user';
import Users from './components/users';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/create-users' exact element={<CreateUser/>} />
          <Route path='/users' exact element={<Users/>} />
        </Routes>
      </Router>

    </>
  );
}
export default App