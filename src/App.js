import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./component/AppRouter";
import Navbar from "./component/UI/navbar/Navbar";

import './styles/App.css';
import { AuthContext } from './context/AuthContext';



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading

    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
