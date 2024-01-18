import React, { useEffect, useState } from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink } from "react-router-dom";


export default function Chat() {

  const [allowed, SetAllowed] = useState(false);
  const [chats, setChat] = useState([]);
  const [UserChats, setUserChats] = useState([]);
  const [chatsLanguage, setChatsLanguage] = useState([]);
  const [switchActive, SetSwitchActive] = useState(false);
  const [languages, SetLanguages] = useState([]);
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    console.log('language Selected?: ' + languageSelected);
    
  }, [languageSelected]);

  useEffect(() =>{
    console.log("Languages: " + chatsLanguage)
  },[chatsLanguage])

  useEffect(() => {
    console.log('Switch Active?: ' + switchActive);
  }, [switchActive])

  useEffect(() => {
    console.log("IS ALLOWED?: " + allowed);
    
  }, [allowed]) 

 

  const validateUser = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      SetAllowed(true)
    };

    try {
      const response = await axios.get('chat');

      const responseData = response.data;
      console.log("responsedata: " + JSON.stringify(responseData));
      const { succes, allChats } = responseData;

      SetAllowed(succes);
      setChat(allChats || []);
      const uniqueLanguages = [...new Set(responseData.allChats.map(chat => chat.language))].filter(language => language !== "");
      console.log("all languages used: " + JSON.stringify(uniqueLanguages))
      SetLanguages(uniqueLanguages || [])

      const allUserChats = await axios.get('chat/getUsersChat');

      const res = allUserChats.data;
      console.log("res data: " + JSON.stringify(res))
      setUserChats(res || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors as needed
    }
  }

  const handleCheckboxChange = () => {
    SetSwitchActive(!switchActive);
  };

  const handleLanguageChange = (event) => {
   
    const selectedValue = event.target.value; 

    if (selectedValue === "") {
      setLanguageSelected(false);
    } else{
      setLanguageSelected(true);

      getAllLanguages(selectedValue)
    }
    
  }

  const getAllLanguages = async(language) => {
    console.log(language)
    try{
      const response = await axios.get('chat/getChatsFromLanguage', {
        params: {
          language: language,
        },
        withCredentials: true,
      });
      
      const responseData = response.data
      console.log("All languages used: ", responseData)
      
      setChatsLanguage(responseData);
    }catch (err){
      console.log(err)
      setChatsLanguage([]);
    }
  }


  return (
    <>
      {!allowed ? (
        <section className="container mt-5">
          <p>Please log in first</p>
          <NavLink to='/register' className="link-register">Don't have an account yet?</NavLink>
        </section>
      ) : (
        <>
          <div className='checkbox'>
            <p>show your chats</p>
            <label data-testid="cypress-showUsersChats" className="switch">
              <input type="checkbox" checked={switchActive} onChange={handleCheckboxChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="select-container">
            <select defaultValue="" onChange={handleLanguageChange} className="custom-select">
              <option value="" disabled>Filter by language</option>
              <option value="">Select None</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>
  
          {!switchActive ? (
            <section className='container mt-5'>
              <NavLink data-testid="cypress-createChatButton" className="btn btn-success button-Create mr-3" to="/chats/create">
                Create chat
              </NavLink>
              <h2 className='chats-header mb-4'>Chats</h2>
              {languageSelected ? (
                Array.isArray(chatsLanguage) ? (
                  chatsLanguage.length > 0 ? (
                    chatsLanguage
                      .sort((a, b) => b.id - a.id)
                      .map((chat) => (
                        <div className="chat-section card mb-3" key={chat.id}>
                          <div className="card-body">
                            <h5 className="chat-name card-title">{chat.name}</h5>
                            <p className="chat-language card-text">Language: {chat.language}</p>
                            <NavLink style={{ backgroundColor: 'green'}} to={`/chat/${chat.id}`} className="btn btn-primary btn-join">Join {chat.id}</NavLink>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No chats available for the selected language.</p>
                  )
                ) : (
                  <p>Error: chatsLanguage is not an array</p>
                )
              ) : (
                chats
                  .sort((a, b) => b.id - a.id)
                  .map((chat) => (
                    <div className="chat-section card mb-3" key={chat.id}>
                      <div className="card-body">
                        <h5 className="chat-name card-title">{chat.name}</h5>
                        <p className="chat-language card-text">Language: {chat.language}</p>
                        <NavLink style={{ backgroundColor: 'green'}} to={`/chat/${chat.id}`} className="btn btn-primary btn-join">Join {chat.id}</NavLink>
                      </div>
                    </div>
                  ))
              )}
            </section>
          ) : (
            <section className='container mt-5'>
              <NavLink data-testid="cypress-createChatButton" className="btn btn-success button-Create mr-3" to="/chats/create">
                Create chat
              </NavLink>
              <h2 className='chats-header mb-4'>Your Chats</h2>
              {UserChats
                .sort((a, b) => b.id - a.id)  
                .map((chat) => (
                  <div className="chat-section card mb-3" key={chat.id}>
                    <div className="card-body">
                      <h5 className="chat-name card-title">{chat.name}</h5>
                      <p className="chat-language card-text">Language: {chat.language}</p>
                      <NavLink style={{ backgroundColor: 'green'}} to={`/chat/${chat.id}`} className="btn btn-primary btn-join">Join {chat.id}</NavLink>
                    </div>
                  </div>
                ))}
            </section>
          )}
        </>
      )}
    </>
  );
}