import { useRef, useState, useEffect } from "react";
import './register.css';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import axios from "../../../axios";

const USER_REGEX = /^[a-zA-Z0-9]{4,24}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,30}$/;



export default function Register() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [MatchFocus, setMatchFocus] = useState(false);

    const [error, setError] = useState();
    const [succes, SetSucces] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd])

    useEffect(() => {
        setError('');
    }, [user, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validate1 = USER_REGEX.test(user);
        const validate2 = PASSWORD_REGEX.test(password);
        if (!validate1 || !validate2){
            setError("invalid entry");
            return;
        }
        try {
            const response = await axios.post('users/register', JSON.stringify({user, password}),
            {
                headers: {"Content-Type": 'application/json'},
                withCredentials: true,
            });
            console.log(response.data);
            SetSucces(true);
        }catch (err) {
            if (!err.response) {
                setError("no server response");
            }else if (err.response?.status === 409 ) {
                setError("username taken");
            } else {
                setError("registration failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        {succes ? (
            <section>
                <h1>Succes!</h1>
                <p>
                    <NavLink to="/login">Sign in</NavLink>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:
                <span className={validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input type="text" 
                id="username" 
                ref={userRef} 
                autoComplete="off" 
                onChange={(e) => setUser(e.target.value)} 
                required aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote" 
                onFocus={() => setUserFocus(true)} 
                onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle}/> 4 to 24 characters.<br />
                Must begin with a letter.<br/>
                letters, numbers allowed</p>
                
                <label htmlFor="password">Password:
                <span className={validPassword ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPassword || !password ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle}/> 8 to 30 characters.<br />
                Must contain an uppercase.<br/>
                Must contain a number. <br/>
                Can have special characters</p>

                <label htmlFor="confirmPwd">Re-enter password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input type="password"
                id="confirmPwd"
                onChange={(e) => setMatch(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmNote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmNote" className={MatchFocus && !validMatch ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle}/> Must be the same as the password above.<br /></p>
                
                <button disabled={!validName || !validPassword || !validMatch ? true : false}>Sign Up</button>

                <p>
                    <span className="hasAccount"> <NavLink to='/login'>Already have an account?</NavLink></span> 
                </p>

            </form>
        </section>
        )}
        </>
    )
}