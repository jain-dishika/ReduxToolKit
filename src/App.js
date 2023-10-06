import React from 'react'
import {BrowserRouter as Router,Routes, Route  } from 'react-router-dom'
import UserList from './Components/UserList'
import AddUser from './Components/AddUser'
import AddPost from './Components/AddPost'
import UserPost from './Components/UserPost'
import Header from './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const App = () => {
  // const location = useLocation();
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/AddUser' element={<AddUser/>}/>
        <Route path='/users/:id/posts' element={<UserPost/>}/>
        <Route path='/users/:id/posts/addPost' element={<AddPost/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
