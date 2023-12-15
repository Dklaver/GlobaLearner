import React, { useEffect, useState } from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';

export default function CreateChat() {

    const [chatName, SetChatName] = useState('');
    const [language, SetLanguage] = useState('');
    const [success, SetSucces] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('chat/create', JSON.stringify({chatName, language}),
            {
                headers: {"Content-Type": 'application/json'},
                withCredentials: true,
            });
            
            console.log("tada" + response)
            console.log("responseData: " + response.data)
            const { succes } = response.data
            if (succes === true){
                SetSucces(true);
            }
        }catch (err){
            console.log(err)
        }
    } 

    return (
        <>
            <div>
                <NavLink className='button-Create' to="/chats">&lt;</NavLink>
            </div>
            {success ? (
                <div></div>
            ) : (
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chatName">Chat Name:</label>
                    <input
                        type="text"
                        id="chatName"
                        onChange={(e) => SetChatName(e.target.value)}
                        value={chatName}
                        required
                    />

                    <label htmlFor="language">Language:</label>
                    <input
                        type="text"
                        id="language"
                        onChange={(e) => SetLanguage(e.target.value)}
                        value={language}
                        required
                    />
                    <button>Create Chat</button>
                </form>
            </section>
            )}
        </>
    )
}