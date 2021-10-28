import React from 'react';

function SortButton({ onClick }) {
    return (
        <button onClick={() => onClick()}>
            Sort
        </button>
    )
}

export default SortButton;