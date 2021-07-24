import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function PlaylistItem({ playlist, onPlaylistSelect, selectedPlaylist }) {
    return (
        // <div className="playlist-item item" onClick={() => onPlaylistSelect(playlist)}>
        //     {playlist.name}
        // </div>
        <ListGroup.Item
            className={`playlist-item item ${ selectedPlaylist && selectedPlaylist.name === playlist.name ? "active" : "" }`}
            onClick={() => onPlaylistSelect(playlist)}
        >
            {playlist.name}
        </ListGroup.Item>
    )

}

export default PlaylistItem;