import React, { useEffect, useState } from 'react';
import axios from "axios";

import Song from './Song';
import SortButton from './SortButton';
import SaveButton from './SaveButton';

import { compare } from '../utils/sort';


function Playlist({ playlist, access_token, onExit }) {
    const [sorted, setSorted] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function getPlaylistSongs() {
            const response = await axios.get(playlist.tracks.href, {
                headers: {
                    Authorization: `Bearer ${ access_token }`
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
                        Authorization: `Bearer ${ access_token }`
                    }
                }).then(res => res.data.items)

                songs = songs.concat(res);
            }

            console.log(songs);

            setSongs(songs);
        }

        getPlaylistSongs();
    }, [playlist, access_token]);

    const listItems = songs.map((song, index) => (
        <Song song={song} key={song.track.id} />
    ));

    const onSort = () => {
        console.log(sorted);
        const sortedSongs = songs.sort(compare).reverse();
        setSongs(sortedSongs);
        !sorted && setSorted(!sorted);
    }

    const onSave = async () => {
        // TODO: for playlists.length > 100, first request should be PUT, then subsequent requests should POST

        if (sorted) {
            const uris = songs.map(song => song.track.uri);

            await axios.put(`https://api.spotify.com/v1/playlists/${ playlist.id }/tracks`, {
                uris: uris.slice(0, 100)
            }, {
                headers: {
                    Authorization: `Bearer ${ access_token }`
                }
            })
                .then(async () => {
                    if (uris.length > 100) {
                        let counter = 100;
                        while (counter < uris.length) {
                            await axios.post(`https://api.spotify.com/v1/playlists/${ playlist.id }/tracks`, {
                                uris: uris.slice(counter, counter + 100)
                            }, {
                                headers: {
                                    Authorization: `Bearer ${ access_token }`
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

            setSorted(!sorted);
        }
    }

    return (
        <div className="playlist">
            <button className="playlist--button-exit" onClick={() => { onExit() }}>
                <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" class="button-back">
                    <polyline points="16 4 7 12 16 20" fill="none" stroke="#181818"></polyline>
                </svg>
            </button>
            <div className="playlist-header">
                <div className="playlist-image">
                    {/* spotify web player uses 300x300 image and resizes */}
                    <img src={playlist.images[0].url} alt={playlist.name} />
                </div>
                <div className="metadata">
                    <h1 className="playlist-name">{playlist.name}</h1>
                    <span>{playlist.owner.display_name}</span>
                    <div className="buttons">
                        <SortButton onClick={onSort} />
                        <SaveButton onClick={onSave} sorted={sorted} />
                    </div>
                </div>
            </div>

            <div>{listItems}</div>
        </div>
    )

}

export default Playlist;