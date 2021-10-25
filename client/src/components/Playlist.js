import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Song from './Song';

function Playlist({ songs, metadata }) {
    const listItems = songs.map((song, index) => (
        <Song song={song} key={song.track.id} />
    ));

    console.log(metadata);

    return (
        <div className="playlist">

            <div className="playlist-header">
                <div className="playlist-image">
                    {/* spotify web player uses 300x300 image and resizes */}
                    <img src={metadata.images[0].url} alt={metadata.name} />
                </div>
                <div className="metadata">
                    <h1 className="playlist-name">{metadata.name}</h1>
                    <span>{metadata.owner.display_name}</span>
                </div>

            </div>

            <ListGroup>{listItems}</ListGroup>
        </div>
    )

}

export default Playlist;