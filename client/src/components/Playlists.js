import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import PlaylistItem from './PlaylistItem';

function Playlists({ playlists, onPlaylistSelect, selectedPlaylist }) {
    const list = playlists.map(playlist => {
        return (
            <PlaylistItem
                playlist={playlist}
                onPlaylistSelect={onPlaylistSelect}
                selectedPlaylist={selectedPlaylist}
                key={playlist.id}
            />
        );
    });

    return (
        // <div className="ui relaxed divided list">{list}</div>
        <ListGroup className="playlists">{list}</ListGroup>
    );
}

export default Playlists;