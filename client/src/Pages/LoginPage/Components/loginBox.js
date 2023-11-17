import { useRef, useState, useEffect } from 'react';
import './authentication.css';
import { NavLink } from "react-router-dom";
import axios from '../../../axios';

const Login = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password , setPassword] = useState('');
    const [error, setError] = useState('');
    const [succes, setSucces] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setError('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, password);
        try{
            const response = await axios.post('users/login', JSON.stringify((user, password)),
        {
            headers: {"Content-Type": 'application/json'},
            withCredentials: true,
        });
        console.log(response.data);
        setUser("");
        setPassword("");
        setSucces(true);
        }catch (err) {
            if (!err.response) {
                setError("no server response");
            } else {
                setError("Sign up failed");
            }
        
    }
    
    return (
        <>
        {succes ? (
            <section>
                <h1>Succes!</h1>
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
}

export default Login;