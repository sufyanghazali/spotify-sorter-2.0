import React from "react";
import axios from "axios";

import Playlist from './Playlist.js';
import Playlists from './Playlists.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectedPlaylist: null,
            songs: []
        }
    }

    async componentDidMount() {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${ this.props.access_token }`
            }
        }).then(res => res.data.items);

        this.setState({
            playlists: response
        })
    }

    onPlaylistSelect = async playlist => {
        const songs = await axios.get(playlist.href, {
            headers: {
                Authorization: `Bearer ${ this.props.access_token }`
            }
        }).then(res => res.data.tracks.items);


        this.setState({
            selectedPlaylist: playlist,
            songs: songs
        });
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="ui row">
                        <div className="three wide column">
                            <Playlists playlists={this.state.playlists} onPlaylistSelect={this.onPlaylistSelect} />
                        </div>
                        <div className="thirteen wide column">
                            <Playlist songs={this.state.songs} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;