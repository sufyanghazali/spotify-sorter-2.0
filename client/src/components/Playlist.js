import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Song from './Song';

function Playlist({ songs, name }) {
    const listItems = songs.map((song, index) => (
        <Song song={song} key={song.track.id} />
    ));

    return (
        <div className="playlist">
            <h1 className="playlist-header">{name}</h1>
            <ListGroup>{listItems}</ListGroup>
        </div>
    )

}

export default Playlist;