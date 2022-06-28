import axios from 'axios'
import React, { useState, useEffect } from 'react' 

var present = document.cookie.indexOf('auth-token=');

const token = (present === -1)
? null
: document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='))
    .split('=')[1];

const AuthContext = React.createContext();

// const useAuth = () => {
//     useContext(AuthContext);
// }

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async() => {
            await axios({
            method: 'get',
            url: 'http://localhost:5000/api/user/auth',
            withCredentials: true,
            headers: {"auth-token": token}
            }).then((props) => {
                // console.log(props.data);
                setAuth(props.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        checkAuth();
        // console.log(auth);
    }, [auth]);

    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, token, AuthContext };