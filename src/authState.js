const axios = require('axios')
const { useState, useEffect } = require('react')

var present = document.cookie.indexOf('auth-token=');
const token = (present === -1)
? null
: document.cookie.split('; ').find(row => row.startsWith('auth-token=')).split('=')[1];

const useAuth = () => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            await axios({
            method: 'get',
            url: 'http://localhost:5000/api/user/auth',
            withCredentials: true,
            headers: {"auth-token": token}
            }).then((props) => {
                // props.data.auth ? setAuth(props.data.auth) : console.log(props.data.auth);
                setAuth(props.data.auth);
            }).catch((err) => {
                console.log(err);
            })
        }
        checkAuth();
        // eslint-disable-next-line
    }, []);

    return auth;
}

export { useAuth, token };