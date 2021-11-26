import React from "react";
import {ListGroup} from 'react-bootstrap';

function WordList({words}) {
    return (
        words.map(word => {
        return <div key={word.id}>
            <ListGroup.Item variant="info">{word.name}</ListGroup.Item>
        </div>
    })

    )
}

export default WordList;