import React from 'react';

function Playlist(props) {
    const { songs } = props;

    console.log(songs)
    const listItems = songs.map(song => (
        <li key={song.track.id}>
            {song.track.name}
        </li>
    ))


    console.log(listItems)
    return (
        <ul>{listItems}</ul>
    )

}

export default Playlist;