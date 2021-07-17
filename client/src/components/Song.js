import React from 'react';

function Song({ song }) {
    return (
        <div className="ui item grid">
            <div className="content nine wide column">
                <div className="header">{song.track.name}</div>
            </div>
            <div className="content five wide column">
                <div className="description">{song.track.artists[0].name}</div>
            </div>
        </div>
    )
}

export default Song;