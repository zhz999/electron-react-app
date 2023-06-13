import logo from './logo.svg';
import './App.css';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {sendNotification} from "./Notification";
import AlertBox from "./Alert";

function App() {

    const [message, setMmessage] = useState('')
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    // 来自服务端消息
    useEffect(() => {
        window.ipc.onMessage('message', (e, data) => {
            setMmessage(JSON.stringify(data))
            setOpen(true);
        })
    }, [])

    const sendMessage = () => {
        const ss = window.ipc.postMessage('message', {event: 'test', data: {code: 0, list: [], message: 'success'}})
        sendNotification('haha ')

        setMmessage('haha')
        setOpen(true);
    }

    return (
        <>
            <AlertBox open={open} handleClose={handleClose} message={message}/>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Button variant="outlined" onClick={sendMessage}>SEND</Button>
                </header>
            </div>
        </>
    );
}

export default App;
