import React from "react";
import axios from "axios";
import '../index.css';
import { compare } from '../utils/sort';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    onSaveButtonClicked = async () => {
        // TODO: for playlists.length > 100, first request should be PUT, then subsequent requests should POST

        if (this.state.sorted) {
            const songs = this.state.songs;
            const uris = songs.map(song => song.track.uri);

            await axios.put(`https://api.spotify.com/v1/playlists/${ this.state.selectedPlaylist.id }/tracks`, {
                uris: uris.slice(0, 100)
            }, {
                headers: {
                    Authorization: `Bearer ${ this.props.access_token }`
                }
            })
                .then(async () => {
                    if (uris.length > 100) {
                        let counter = 100;
                        while (counter < uris.length) {
                            await axios.post(`https://api.spotify.com/v1/playlists/${ this.state.selectedPlaylist.id }/tracks`, {
                                uris: uris.slice(counter, counter + 100)
                            }, {
                                headers: {
                                    Authorization: `Bearer ${ this.props.access_token }`
                                }
                            });

                            counter += 100;
                        }
                    }
                })
                .catch(function(error) {
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
            <Container className="dashboard">
                <Row>
                    <Col md={3}>
                        <Playlists playlists={this.state.playlists} onPlaylistSelect={this.onPlaylistSelect} selectedPlaylist={this.state.selectedPlaylist} />
                    </Col>
                    <Col>
                        {this.state.selectedPlaylist ? <Playlist songs={this.state.songs} metadata={this.state.selectedPlaylist} /> : null}
                        {/* <Playlist songs={this.state.songs} name={this.state.selectedPlaylist.name} /> */}
                    </Col>
                    {this.state.selectedPlaylist ?
                        <Col md={2}>
                            <div className="buttons">
                                <SortButton onClick={this.onSortButtonClicked} />
                                <SaveButton onClick={this.onSaveButtonClicked} sorted={!this.state.sorted} />
                            </div>
                        </Col> : null
                    }
                </Row>
            </Container>
        )
    }
}

export default Dashboard;