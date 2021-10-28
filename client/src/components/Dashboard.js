import React, { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';

import Playlist from './Playlist';
import Playlists from './Playlists';

const Dashboard = ({ access_token }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        async function getUserPlaylists() {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${ access_token }`
                }
            }).then(res => res.data.items);
            console.log(response);
            setPlaylists(response);
        }

        getUserPlaylists();
    }, [access_token]);

    const onPlaylistSelect = async playlist => {
        setSelectedPlaylist(playlist);
    }

    // In mobile layout, when exit/back sets selected playlist to null
    const onExit = () => {
        setSelectedPlaylist(null);
    }

    return (
        <div className="dashboard">
            <Playlists playlists={playlists} onPlaylistSelect={onPlaylistSelect} selectedPlaylist={selectedPlaylist} />
            {selectedPlaylist ?
                <Playlist
                    playlist={selectedPlaylist}
                    access_token={access_token}
                    onExit={onExit} />
                :
                null
            }
        </div >
    )
}

export default Dashboard;