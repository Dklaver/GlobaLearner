import { useRef, useState, useEffect } from 'react';
import './authentication.css';
import { NavLink, useNavigate  } from "react-router-dom";
import axios from '../../../axios';

export default function Login() {

    const navigate = useNavigate();
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
        else{
            
            setTimeout(() => {
                // Your navigation logic here
                navigate('/');
              }, 1000);
            
            
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
                    <p>You now have access to the website!</p>
                    <NavLink data-testid="cypress-loginToHome" to="/">home</NavLink>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                data-testid="cypress-LoginUsername" 
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
                data-testid="cypress-loginPassword"  
                type='password' 
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                />
                <button data-testid="cypress-loginSignin">Sign in</button>
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

