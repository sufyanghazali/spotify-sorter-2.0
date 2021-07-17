import React from "react";
import axios from "axios";
import '../index.css';
import { compare } from '../utils/sort';

import Playlist from './Playlist';
import Playlists from './Playlists';
import SortButton from './SortButton';
import SaveButton from './SaveButton';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectedPlaylist: null,
            songs: [],
            sorted: false
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
        const response = await axios.get(playlist.tracks.href, {
            headers: {
                Authorization: `Bearer ${ this.props.access_token }`
            }
        });

        let songs = response.data.items;

        while (songs.length < response.data.total) {
            const res = await axios.get(playlist.tracks.href, {
                params: {
                    offset: songs.length,
                    limit: 100
                },
                headers: {
                    Authorization: `Bearer ${ this.props.access_token }`
                }
            }).then(res => res.data.items)

            songs = songs.concat(res);
        }

        console.log(songs);

        this.setState({
            selectedPlaylist: playlist,
            songs: songs,
            sorted: false
        });
    }

    onSortButtonClicked = () => {
        const currentSongs = this.state.songs.sort(compare).reverse();
        this.setState({
            songs: currentSongs,
            sorted: true
        });
    }

    onSaveButtonClicked = () => {
        if (this.state.sorted) {
            const songs = this.state.songs;
            const uris = songs.map(song => song.track.uri);
            axios.put(`https://api.spotify.com/v1/playlists/${ this.state.selectedPlaylist.id }/tracks`, {
                uris: uris
            }, {
                headers: {
                    Authorization: `Bearer ${ this.props.access_token }`
                },
            }).catch(function(error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

            this.setState({ sorted: false });
        }
    }

    render() {
        return (
            <div className="ui container dashboard">
                <div className="ui grid">
                    <div className="ui row">
                        <div className="three wide column">
                            <Playlists playlists={this.state.playlists} onPlaylistSelect={this.onPlaylistSelect} />
                        </div>
                        <div className="ten wide column">
                            <Playlist songs={this.state.songs} />
                        </div>
                        <div className="three wide column">
                            <SortButton onClick={this.onSortButtonClicked} />
                            <SaveButton onClick={this.onSaveButtonClicked} sorted={!this.state.sorted} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;