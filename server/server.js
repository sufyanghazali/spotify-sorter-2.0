const axios = require("axios");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const querystring = require("querystring");
const path = require('path');

const PORT = process.env.PORT || 3001;
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

function generateRandomString(length) {
    let text = "";
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const stateKey = "spotify_auth_state";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")))

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})


app.get("/login", (req, res) => {
    console.log("/login hit")
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";

    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            client_id: client_id,
            response_type: "code",
            redirect_uri: redirect_uri,
            state: state,
            scope: scope,
        })
    );
});

app.get("/callback", (req, res) => {
    console.log("/callback hit")

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    const encoded = Buffer.from(`${ client_id }:${ client_secret }`).toString("base64");

    if (state === null || state !== storedState) {
        res.redirect("/#" + querystring.stringify({
            error: "state_mismatch"
        }));
    } else {
        console.log("were good")
        res.clearCookie(stateKey);

        axios({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            params: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                "Authorization": `Basic ${ encoded }`
            }
        })
            .then(response => {
                const { access_token, refresh_token } = response.data;
                const query = querystring.stringify(response.data);

                res.redirect(`http://localhost:3000/?${ query }`);
            })
            .catch(err => console.log(err.message));
    }
});

app.get("/refresh_token", (req, res) => {
    const { refresh } = req.query;

    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        params: {
            grant_type: "refresh_token",
            refresh_token: refresh_token
        },
        headers: {
            "Authorization": `Basic ${ encoded }`
        }
    })
        .then(res => {
            const { access_token } = res.data;
            res.send({
                access_token: access_token
            });
        })
        .catch(err => {
            console.log(err.message);
        })
});

app.get("/playlists/:playlistId", (req, res) => {
    const { playlist } = req.params;
})


app.listen(PORT, () => {
    console.log(`Server up. Listening on port ${ PORT }`)
})