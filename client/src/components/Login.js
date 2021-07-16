import React from 'react';
import { Container } from "react-bootstrap";

function Login() {
    return (
        <Container>
            <a className="btn btn-success btn-lg" href="http://localhost:3001/login">
                Login with Spotify
            </a>
        </Container>

    )
}

export default Login;