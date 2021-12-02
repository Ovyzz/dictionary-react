import React, {useEffect, useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import Alert from "./Alert";
import WordList from "./WordList";
import FindWord from "./FindWord";

const LOCAL_STORAGE_KEY = 'word';

function NewWord() {
    const [words, setWords] = useState([]);
    const [alert, setAlert] = useState({type: "", msg: ""})
    const newWordRef = useRef();

    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedWords) {
            setWords(storedWords);
        }
    },[]);

    function clearAll() {
        setAlert({type: "danger", msg: "All words have been deleted!"})
        setWords([]);
    }

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(words));
    }, [words])

    function addNewWord() {
        const word = newWordRef.current.value;
        if (word === '') return;
        const newWordList = [...words, {id: words.length, name: word}]
        setAlert({type: "warning", msg: "The word was added successfully!"})
        setWords(newWordList)
        newWordRef.current.value = null;
    }

    return (
        <>
            <Button variant="outline-success" onClick={addNewWord}>Add</Button>{' '}
            <Form.Control ref={newWordRef} type="text" placeholder="Add a word"/>
            <br/>
            <FindWord />
            <Button variant="outline-warning" onClick={clearAll}>CLEAR ALL</Button>{' '}
            <Alert type={alert.type} msg={alert.msg}/>
            <WordList words={words}/>
        </>
    );
}

export default NewWord;