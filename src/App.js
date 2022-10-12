import './App.css';
import Post from './components/UserPost';
import Signup from './components/signup';
import Signin from './components/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Header from './components/header';
import Footer from './components/footer';
import { useContext } from 'react';
import { authContext } from './Context/authContext';



function App() {

  const {  handleLogout } = useContext(authContext);

  

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleLogout={handleLogout} isLoggedin={Object.isAuth} />

        <Routes>
          <Route exact path="/" element={Object.isAuth ? <Post /> : <Signin   />} />
          <Route exact path="/post" element={Object.isAuth? <Post /> : <Signin   />} />
          <Route exact path="/signup" element={Object.isAuth ? <Post /> : <Signup />} />
          <Route exact path="/signin" element={Object.isAuth ? <Post /> : <Signin  />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;