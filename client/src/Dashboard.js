import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Playlists from "./Playlists";

function Dashboard(props) {
    const { access_token } = props;
    const [playlists, setPlaylists] = useState();
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [songs, setSongs] = useState();

    // maybe put these functions in custom hooks?
    useEffect(() => {
        if (access_token) {
            axios({
                url: "https://api.spotify.com/v1/me/playlists",
                method: "get",
                headers: {
                    "Authorization": `Bearer ${ access_token }`
                },
                params: {
                    limit: 50
                }
            })
                .then(res => {
                    console.log(res.data);
                    setPlaylists(res.data.items);
                }).catch(err => console.log(err.message));
        }
    }, [access_token]);

    // useEffect(() => {
    //     if (access_token) {
    //         axios({
    //             url: `https://api.spotify.com/v1/playlists/${ selectedPlaylist }/tracks`,
    //             method: "get",
    //             headers: {
    //                 "Authorization": `Bearer ${ access_token }`
    //             },
    //             params: {
    //                 limit: 50
    //             }
    //         })
    //             .then(res => setPlaylists(res.data.items));
    //     }
    // }, [selectedPlaylist, access_token]);

    return (
        <Container className="mt-5">
            {playlists ? <Playlists playlists={playlists} access_token={access_token} /> : ""}

        </Container>
    )
}

export default Dashboard;