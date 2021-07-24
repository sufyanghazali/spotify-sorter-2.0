import React from 'react';
import Button from 'react-bootstrap/Button';

function Login() {
    return (
        <div className="login-container">
            <h1 className="login-header">Sortify</h1>
            <Button className="spotify spotify-btn spotify-btn-login" href="https://spotify-sorting-app.herokuapp.com/login">
                Login with Spotify
            </Button>
        </div >

    )
}

export default Login;