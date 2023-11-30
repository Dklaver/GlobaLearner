import { useRef, useState, useEffect } from 'react';
import './authentication.css';
import { NavLink } from "react-router-dom";
import axios from '../../../axios';

export default function Login() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password , setPassword] = useState('');
    const [error, setError] = useState('');
    const [allowed, setAllow] = useState();
    const [status, setStatus] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        console.log("IS ALLOWED?: " + allowed);
    }, [allowed])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, password);
        try{
            const response = await axios.post('users/login', JSON.stringify({user, password}),
        {
            headers: {"Content-Type": 'application/json'},
            withCredentials: true,
        });
        console.log("responded data: " + JSON.stringify(response.data));
        const responseData = response.data.result;
        const {token, message, success } = responseData;
        localStorage.setItem("jwt", token);
        setStatus(message);
        setUser("");
        setPassword("");
        setAllow(success);
        
        if (success === false){
            setError(message)
        }
        }catch (err) {
            if (!err.response) {
                console.log(err)
                setError("no server response");
            } else {
                setError("Sign up failed");
            }
            }
        }

    return (
        <>
        {allowed ? (
            <section>
                <h1>{status}</h1>
                <p>
                    <NavLink to="/">Home</NavLink>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                type='text' 
                id='username'
                ref={userRef}
                autoComplete='on'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                />
                <label htmlFor='password'>Password:</label>
                <input 
                type='password' 
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                />
                <button>Sign in</button>
            </form>
            <p>
            <span className='hasNoAccount'>
            <NavLink to='/register'>Don't have an account yet?</NavLink>
            </span>
            </p>
        </section>
        )}
        </>
    )
}

