import './App.css';
import Post from './components/UserPost';
import Signup from './components/signup';
import Signin from './components/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { useContext } from 'react';
import { authContext } from './Context/authContext';



function App() {

  const { checkToken, handleLogout, checkLoggedin, isLoggedin } = useContext(authContext);

  useEffect(() => {
    checkToken()
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleLogout={handleLogout} isLoggedin={isLoggedin} />

        <Routes>
          <Route exact path="/" element={isLoggedin ? <Post /> : <Signin checkLoggedin={checkLoggedin} />} />
          <Route exact path="/post" element={isLoggedin ? <Post /> : <Signin checkLoggedin={checkLoggedin} />} />
          <Route exact path="/signup" element={isLoggedin ? <Post /> : <Signup />} />
          <Route exact path="/signin" element={isLoggedin ? <Post /> : <Signin checkLoggedin={checkLoggedin} />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;