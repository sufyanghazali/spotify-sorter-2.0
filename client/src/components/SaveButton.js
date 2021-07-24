import React from 'react';
import Button from 'react-bootstrap/Button';

function SaveButton({ onClick, sorted }) {
    return (
        // <button className="ui button" onClick={() => onClick()} disabled={sorted}>Save</button>
        <Button variant="light" onClick={() => onClick()} disabled={sorted}>
            Save
        </Button>
    )
}

export default SaveButton;