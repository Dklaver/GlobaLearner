import React, { useState } from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function CreateChat() {

    const [chatName, SetChatName] = useState('');
    const [language, SetLanguage] = useState('');
    const [success, SetSucces] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('chat/create', JSON.stringify({chatName, language}),
            {
                headers: {"Content-Type": 'application/json'},
                withCredentials: true,
            });
            
            console.log("tada" + response)
            console.log("responseData: " + JSON.stringify(response.data))
            const { succes, chatId } = response.data
            if (succes === true){
                SetSucces(true);
                navigate(`/chat/${chatId}`)
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
                        data-testid="cypress-createChatName"
                        type="text"
                        id="chatName"
                        onChange={(e) => SetChatName(e.target.value)}
                        value={chatName}
                        required
                    />

                    <label htmlFor="language">Language:</label>
                    <input
                        data-testid="cypress-createChatLanguage"
                        type="text"
                        id="language"
                        onChange={(e) => SetLanguage(e.target.value)}
                        value={language}
                        required
                    />
                    <button data-testid="cypress-createChat">Create Chat</button>
                </form>
            </section>
            )}
        </>
    )
}