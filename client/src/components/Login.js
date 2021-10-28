import React from 'react';

function Login() {
    return (
        <div className="login-container">
            <h1 className="login-header">Sortify</h1>
            {/* <a className="spotify spotify-btn spotify-btn-login" href="https://spotify-sorting-app.herokuapp.com/login">
                Login with Spotify
            </a> */}
            <a className="spotify spotify-btn spotify-btn-login" href="http://localhost:3001/login">
                Login with Spotify
            </a>
        </div >
    )
}

export default Login;