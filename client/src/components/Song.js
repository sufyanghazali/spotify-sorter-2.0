import React from 'react';



function Song({ song }) {
    return (
        <div className="song">
            <div className="song-title">{song.track.name}</div>
            <div className="song-artist">{song.track.artists[0].name}</div>
        </div>
    )
}

export default Song;