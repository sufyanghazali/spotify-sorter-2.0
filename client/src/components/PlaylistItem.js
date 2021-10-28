import React from 'react';

function PlaylistItem({ playlist, onPlaylistSelect, selectedPlaylist }) {
    return (
        // <div className="playlist-item item" onClick={() => onPlaylistSelect(playlist)}>
        //     {playlist.name}
        // </div>
        <div
            className={`playlist-item item ${ selectedPlaylist && selectedPlaylist.name === playlist.name ? "active" : "" }`}
            onClick={() => onPlaylistSelect(playlist)}
        >
            {playlist.name}
        </div>
    )

}

export default PlaylistItem;