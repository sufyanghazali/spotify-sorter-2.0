import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Song from './Song';

function Playlist({ songs }) {
    const listItems = songs.map(song => (
        <Song song={song} key={song.track.id} />
    ))

    return (
        <ListGroup>{listItems}</ListGroup>
    )

}

export default Playlist;