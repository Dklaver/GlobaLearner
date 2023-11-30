import React, { useEffect, useState} from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink } from "react-router-dom";

export default function Chatbar() {

    const [allowed, SetAllowed] = useState(false);

  useEffect(() => {
        validateUser();
    }, []);

    useEffect(() => {
      console.log("IS ALLOWED?: " + allowed);
  }, [allowed])

    const validateUser = async () => {
        const jwt = localStorage.getItem('jwt');
    
        if (jwt) {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          };
    
          try {
            const response = await axios.get('chat', { headers });
            
            const responseData = response.data;
            console.log("responsedata: " + JSON.stringify(responseData));
            const { succes } = responseData;

            SetAllowed(succes);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
          }
        }
      };
    return (
      <>
      {!allowed ? (
      <section>
        <p> Please log in first</p>
        <NavLink to='/register'>Don't have an account yet?</NavLink>
        </section>
      ) : (
        <div>
          <section>
            <h2>Chats</h2>
          </section>
          
        </div>
      )}
      </>
    )
}
    
