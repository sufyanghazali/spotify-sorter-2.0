import React from 'react';
import Button from 'react-bootstrap/Button';

function SortButton({ onClick }) {
    return (
        <Button variant="primary" onClick={() => onClick()}>
            Sort
        </Button>
    )
}

export default SortButton;