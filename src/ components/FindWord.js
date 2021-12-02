import React, {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import Alert from "./Alert";

const LOCAL_STORAGE_KEY = 'word';

function FindWord() {
    const [alert, setAlert] = useState({type: "", msg: ""})
    const searchWord = useRef();

    function searchThisWord() {
        const word = searchWord.current.value;
        searchWord.current.value = null;
        const words = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        for (let i = 0; i < words.length; ++i) {
            if (word === words[i].name) {
                setAlert({type: "success", msg: "The word is in the dictionary"});
                return;
            }
        }
        setAlert({type: "danger", msg: "The word was not found in the list"});
    }
    return (
        <>
            <Form.Control ref={searchWord} type="text" placeholder="Search"/>
            <Button variant="primary" onClick={searchThisWord}>Search</Button>{' '}
            <Alert type={alert.type} msg={alert.msg}/>
        </>
    );
}

export default FindWord;