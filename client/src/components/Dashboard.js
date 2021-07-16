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

    onPlaylistSelect = playlist => {
        this.setState({ selectedPlaylist: playlist });
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="ui row">
                        <div className="five wide column">
                            <Playlist songs={this.state.songs} />
                        </div>
                        <div className="eleven wide column">
                            <Playlists playlists={this.state.playlists} onPlaylistSelect={this.onPlaylistSelect} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}