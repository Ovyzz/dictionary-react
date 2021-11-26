import React, {useState, useRef, useEffect} from 'react';
import WordList from "./ components/WordList"
import Header from "./ components/Header";
import Alert from "./ components/Alert";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";

const LOCAL_STORAGE_KEY = 'word';

function App() {
    const [words, setWords] = useState([]);
    const [alert, setAlert] = useState({type: "", msg: ""})
    const newWordRef = useRef();
    const searchWord = useRef();

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

    function searchThisWord() {
        const word = searchWord.current.value;
        searchWord.current.value = null;
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
            <Header/>
            <Button variant="outline-success" onClick={addNewWord}>Add</Button>{' '}
            <Form.Control ref={newWordRef} type="text" placeholder="Add a word"/>
            <br/>
            <Form.Control ref={searchWord} type="text" placeholder="Search"/>
            <Button variant="primary" onClick={searchThisWord}>Search</Button>{' '}
            <Button variant="outline-warning" onClick={clearAll}>CLEAR ALL</Button>{' '}
            <Alert type={alert.type} msg={alert.msg}/>
            <WordList words={words}/>
        </>
    );
}

export default App;
