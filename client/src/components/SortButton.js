import React from 'react';

function SortButton({ onClick }) {
    return (
        <button className="ui button primary" onClick={() => onClick()}>Sort</button>
    )
}

export default SortButton;