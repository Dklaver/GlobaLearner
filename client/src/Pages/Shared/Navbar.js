import React from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="nav">
            <NavLink to='/' className={"site-title"}>Globalearner</NavLink>
            <ul>
                <li>
                    <NavLink to='/chats'>chat</NavLink>
                </li>
                <li>
                    <NavLink to='/users'>user</NavLink>
                </li>
            </ul>
        </nav>
    )
}
