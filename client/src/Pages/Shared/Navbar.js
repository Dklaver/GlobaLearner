import React, { useEffect, useState } from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
import axios from "../../axios";



export default function Navbar() {
    const jwt = localStorage.getItem('jwt')

    const [userName, SetUserName] = useState("") 
    

    useEffect(() => {
        isLoggedIn()
    },[isLoggedIn])

    const isLoggedIn = async() => {
        try{
            if (jwt){
    
                const response = await axios.get("users/getById", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                console.log("userNameResponse: " + JSON.stringify(response))

                const responseData = response.data;
                console.log("user logged in: " + JSON.stringify(responseData))
                SetUserName(responseData.user.name)
                
            } 
        }catch (err){
            console.log(err)
        }
    }
    return (
        <nav className="nav">
            <NavLink data-testid="cypress-navtitle" to='/' className={"site-title"}>Globalearner</NavLink>
            <h3>welcome! {userName}</h3>
            <ul>
                <li>
                    <NavLink data-testid="cypress-navchat" to='/chats'>chat</NavLink>
                </li>
                <li>
                    <NavLink data-testid="cypress-navregister" to='/register'>register</NavLink>
                </li>
            </ul>
        </nav>
    )
}
