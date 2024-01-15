import React, { useEffect, useState } from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
import axios from "../../axios";



export default function Navbar() {
    

    
    

    useEffect(() => {
        const isLoggedIn = async() => {
            try{
                const jwt = localStorage.getItem('jwt')
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
                    
                } 
            }catch (err){
                console.log(err)
            }
        }
        isLoggedIn()
    },[])

    
    return (
        <nav className="nav">
            <NavLink data-testid="cypress-navtitle" to='/' className="site-title">Globalearner</NavLink>
            
            <ul>
                <li>
                    <NavLink data-testid="cypress-navchat" to='/chats' className="nav-link">Chat</NavLink>
                </li>
                <li>
                    <NavLink data-testid="cypress-navregister" to='/register' className="nav-link">Register</NavLink>
                </li>
            </ul>
        </nav>
    );
}
