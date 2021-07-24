import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';


function Song({ song }) {
    return (
        <ListGroup.Item className="song">
            <Container>
                <Row>
                    <div className="song-title">{song.track.name}</div>
                    <div className="song-artist">{song.track.artists[0].name}</div>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

export default Song;