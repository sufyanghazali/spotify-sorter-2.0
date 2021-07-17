import React from 'react';

function SaveButton({ onClick, sorted }) {
    return (
        <button className="ui button" onClick={() => onClick()} disabled={sorted}>Save</button>
    )
}

export default SaveButton;