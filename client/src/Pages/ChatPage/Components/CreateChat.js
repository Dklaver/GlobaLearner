import React, { useState, useEffect } from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function CreateChat() {

    const [chatName, SetChatName] = useState('');
    const [language, setLanguage] = useState('');
    const [success, SetSucces] = useState(false);
    const [countries, SetCountries] = useState([]);

    const navigate = useNavigate();

    // const addCountiesScript = () =>{

    //     const script = document.createElement("script")
    //     script.src = ""
        
    //     script.type = "text/javascript"
    //     script.async = true;
    //     script.onload = () => {
    //         SetScriptLoaded(true)
    //     }
    //     document.body.appendChild(script);
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const uniqueLanguages = [];
                data.forEach((country) => {
                    const language = country.languages ? Object.values(country.languages)[0] : '';
                    if (language && !uniqueLanguages.includes(language)) {
                        uniqueLanguages.push(language);
                    }
                });
                SetCountries(uniqueLanguages);
                
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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
                <NavLink className='button-back' to="/chats">&lt;</NavLink>

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

                        <label htmlFor="language">language:</label>
                        <select
                            data-testid="cypress-createChatLanguage"
                            id="countries"
                            name="countries"
                            onChange={(e) => setLanguage(e.target.value)}
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select a language</option>
                            {countries
                            .sort()
                            .map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>

                        <button data-testid="cypress-createChat" disabled={!language}>Create Chat</button>
                    </form>
                </section>
            )}
        </>
    )
}