import React from 'react';

function Songs(props) {
    const { songs } = props;

    const listItems = songs.map(song => (
        <li key={song.id}>
            {song.name}
        </li>
    ))


    console.log(listItems)
    return (
        <ul>{listItems}</ul>
    )

}

export default Songs;