import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import Editor from './pages/Editor';
import User from './pages/User';
import UserBlogs from './pages/UserBlogs';
// import Settings from './pages/Settings'

// Import the Navigation component
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      {/* Add Navigation component at the top of the page */}
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/edit/:id" element={<Editor edit={true} />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user-blogs" element={<UserBlogs />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
