import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Playlists(props) {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const { playlists, access_token } = props;


    function onClick(e) {
        const { id } = e.target.dataset;
        axios({
            url: `https://api.spotify.com/v1/playlists/${ id }/tracks`,
            method: "get",
            headers: {
                "Authorization": `Bearer ${ access_token }`
            },
            params: {
                limit: 50
            }
        })
            .then(res => console.log(res.data.items));
    }

    function handleClick(e) {
        const { id } = e.target.dataset;
        setSelectedPlaylist(id);
    }

    useEffect(() => {
        if (selectedPlaylist) {
            axios({
                url: `https://api.spotify.com/v1/playlists/${ selectedPlaylist }/tracks`,
                method: "get",
                headers: {
                    "Authorization": `Bearer ${ access_token }`
                },
                params: {
                    limit: 50,
                    offset: 0
                }
            })
                .then(res => {
                    console.log(res.data.items);
                });

        }
    }, [selectedPlaylist, access_token])

    const listItems = playlists.map(playlist => (
        <li key={playlist.id}>
            <button id={playlist.id}
                onClick={handleClick}
                data-id={playlist.id}
                data-total={playlist.tracks.total}
            >
                {playlist.name}
            </button>
        </li>
    ));

    return (
        <ul>{listItems}</ul>
    )

}

export default Playlists;