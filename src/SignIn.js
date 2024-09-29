import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { useRef } from "react";

function SignIn(){
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const username='ivan';
    const userpassword = '123';
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    const [errors, setErrors] = useState({});
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current){
            inputRef.current.focus();
        }
    }, []);

    const validateInputs = () => {
        let validationErrors = {};
        let isValid = true;

        if(login === ''){
            isValid = false;
            validationErrors.loginEmpty = 'Login can not be empty';
        }

        if(password === ''){
            isValid = false;
            validationErrors.passwordEmpty = 'Password can not be empty';
        } else if (!(username === login && userpassword === password)){
            isValid = false;
            validationErrors.loginPasswordMismatch = 'Login and password combination are wrong. Please try again';
        }

        setErrors(validationErrors);

        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log (`Creds: Login: ${login}, Pass: ${password}`);
        if (! validateInputs()){
            return;
        }
        
        setUser({name: login, password: password, isLoggedIn: true});
        navigate('/');
    }
    return (
        <div id='signInDiv'>
            <form className="signInForm" onSubmit={handleSubmit}>
                <label>Login:</label>
                <input className="signInForm-input"
                    type='text'
                    placeholder='Login'
                    ref={inputRef}
                    onChange={(e)=>{setLogin(e.target.value)}}
                    value={login}
                />
                {errors.loginEmpty && <p className="danger-notification">{errors.loginEmpty}</p>}

                <label>Password:</label>
                <input className="signInForm-input"
                    type='password'
                    placeholder='Your password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
                {errors.passwordEmpty && <p className="danger-notification">{errors.passwordEmpty}</p>}
                {errors.loginPasswordMismatch && <p className="danger-notification">{errors.loginPasswordMismatch}</p>}
                
                <button className="signInButton" type="submit">Login</button>
            </form>
        </div>
    );
}

export default SignIn;