import React from 'react';
import PlaylistItem from './PlaylistItem';

function Playlists({ playlists, onPlaylistSelect }) {
    const list = playlists.map(playlist => {
        return <PlaylistItem playlist={playlist} onPlaylistSelect={onPlaylistSelect} key={playlist.id} />

    })

    return (
        <div className="ui relaxed divided list">{list}</div>
    )

}

export default Playlists;