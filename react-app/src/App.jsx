import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DrinkingSchedule from './components/DrinkingSchedule';
import Footer from './components/Footer';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='sign-up' element={<SignUp />}/>
          <Route path='/drinking-schedule' element={<DrinkingSchedule />}/>
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App