import './App.css';
// import react from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CreateUser from './components/create-user';
import Users from './components/users';
import Home from './components/Home';
import Login from './components/Login';
import Internal from './components/create-user-internal';
import Jobs from './components/Jobs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile';
import UsersInternal from './components/usersInternal';
import FinishUser from './components/passwordCreation';
import CreateJob from './components/createJob';
import MyJob from './components/MyJob';
import EditJob from './components/editJob';

function App() {
    return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/create-users' exact element={<CreateUser/>} />
          <Route path='/create-users-internal' exact element={<Internal/>} />
          <Route path='/create-job' exact element={<CreateJob/>} />
          <Route path='/edit-job' exact element={<EditJob/>} />
          <Route path='/users' exact element={<Users/>} />
          <Route path='/Jobs' exact element={<Jobs/>} />
          <Route path='/Login' exact element={<Login/>} />
          <Route path='/profile' exact element={<Profile/>} />
          <Route path='/users-internal' exact element={<UsersInternal/>} />
          <Route path='/passwordCreation' exact element={<FinishUser/>} />
          <Route path='/my-job' exact element={<MyJob/>} />
        </Routes>
      </Router>

    </>
  );
}
export default App