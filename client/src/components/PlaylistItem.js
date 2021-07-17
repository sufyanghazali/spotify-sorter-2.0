import React from 'react';

function PlaylistItem({ playlist, onPlaylistSelect }) {
    return (
        <div className="playlist-item item" onClick={() => onPlaylistSelect(playlist)}>
            {playlist.name}
        </div>
    )

}

export default PlaylistItem;