import React from 'react';
import { useEffect, useState } from 'react';
import './chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [image, setImage] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setmessages] = useState([]);
    const[{user},dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => {
                    setRoomName(snapshot.data().name);
                }
                )

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setmessages(snapshot.docs.map((doc) => (
                    doc.data()
                ))))
        }
    }, [roomId])

    useEffect(() => {
        setImage(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${image}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {""}
                    {
                        new Date(
                            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                    }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__time">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit"> Send a message </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
