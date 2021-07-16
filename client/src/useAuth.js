import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth() {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios({
            url: "http://localhost:3001/login",
            method: "get",
            headers: {
                'Access-Control-Allow-Origin': "http://localhost:3000"
            }
        })
            .then(res => console.log(res.data))
        // .catch(() => window.location = "/")
    }, [accessToken])

    return accessToken;
}

export default useAuth;