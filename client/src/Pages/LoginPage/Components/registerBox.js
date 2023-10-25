import { useRef, useState, useEffect } from "react";
import './register.css';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { fontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z0-9]{4,24}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W_]).{5,25}$/;

export default function register() {

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
        useRef.current.focus();
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
        console.log(user);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd])

    useEffect(() => {
        setError('');
    }, [user, password, matchPwd])

    return (
        <div>
            
        </div>
    )
}