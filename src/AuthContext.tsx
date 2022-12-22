import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react'

const present = document.cookie.indexOf('auth-token=');

const token = (present === -1)
? null
: document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='))?.split('=')[1];

const AuthContext = createContext(null);

const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async() => {
      await axios({
        method: 'get',
        url: 'http://localhost:5000/api/user/auth/',
        withCredentials: true,
        headers: {"auth-token": token}
      }).then((res) => {
        // console.log(res);
        setAuth(res.data);
      }).catch((err) => {
        console.log(err);
      })
    };
    checkAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, token, AuthProvider}