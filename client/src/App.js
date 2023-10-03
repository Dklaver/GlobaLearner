import React, { useEffect, useState  } from 'react'

function App(){

const [backEndData, setBackEndData] = useState([{}])

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
    </div>
  )
}

export default App