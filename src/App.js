import React from 'react';
import {Container} from "@material-ui/core";
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

import  {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'))?.result || JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
          <Route path="/"  element={<Navigate to="/posts" /> }/>
          <Route path='/posts'exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
