
import React, { useEffect, useState  } from 'react'
import './App.css';

function App(){

const [backEndData, setBackEndData] = useState([{}]);
const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePost = () => {
  
    setPosts([...posts, inputText]);
    
    setInputText('');
  };

  const submitData = async() => {
    const myData = {posts}

    const result = await fetch(`/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }
    )
    const resultInJson = await result.json();
  }

  

useEffect(() => {
  fetch(`/api`).then(
    response => response.json()

  ).then(
    data => {setBackEndData(data)}
  )
  

}, [])



  return (
    <div>
        {(typeof backEndData.users === 'undefined') ? (
          <p>loading...</p>
        ) : (
          backEndData.users.map((user,i) => (
            <p key={i}>{user}</p>
          ))
        )}
        <div>
      <textarea
      rows="4"
      cols="50"
      placeholder='write text here'
      value={inputText}
      
      onChange={handleInputChange}
      />
      <br/>
      <button onClick={handlePost}>Post</button>
      <div>
        <h2>Posts</h2>
        <ul>{posts.map((post,index)=>(
          <li key={index}>{post}</li>
        ))}</ul>
        
      </div>
    </div>
    </div>
    
    
  )
}

export default App