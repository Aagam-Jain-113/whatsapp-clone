import React from 'react';
import { useEffect, useState } from 'react';
import './Sidebarchat.css';
import { Avatar } from "@material-ui/core";
import db from './firebase';
import { Link } from 'react-router-dom';

function Sidebarchat({ name, id, addNewChat }) {

    const [image, setImage] = useState('');
    const [messages,setMessages] = useState('');

    useEffect(() => {
        setImage(Math.floor(Math.random() * 5000));
    }, [])

    useEffect(()=>{
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(Snapshot=>
                setMessages(Snapshot.docs.map(doc=>doc.data()))
                
            )
        }
    },[id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${image}.svg`} />
                <div className="sidebarchat__Info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default Sidebarchat
