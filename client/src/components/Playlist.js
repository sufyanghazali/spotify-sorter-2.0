import React from 'react';
import Song from './Song';

function Playlist({ songs }) {
    const listItems = songs.map(song => (
        <Song song={song} key={song.track.id} />
    ))

    return (
        <ul>{listItems}</ul>
    )

}

export default Playlist;