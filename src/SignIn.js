import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserProvider";
import { useRef } from "react";
import axios from "axios";
import { ToDoContext } from "./context/ToDoProvider";

function SignIn(){
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState(null);
    const {fetchToDoLists} = useContext(ToDoContext);
    const inputRef = useRef(null);
    const url = process.env.REACT_APP_API_URL;

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
        }

        setErrors(validationErrors);

        return isValid;
    }

    const loginUserAsync = async () => {
        try {
            const res = await axios.post(url + '/api/Auth/login',{
                email: login,
                password
            });
            setResponse(res.data);
            setUser({name: res.data.name, email: login, token: res.data.token, refreshToken: res.data.refreshToken, isLoggedIn: true});
            fetchToDoLists();
            navigate('/');
        } catch (error){
            setErrors({
                loginPasswordMismatch: 'Login and password combination are wrong. Please try again'
            });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (! validateInputs()){
            return;
        }

        await loginUserAsync();
    }

    const ForgotPasswordClicked = () => {
        navigate('/forgot-password');
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
                
                <button type='submit' className="signInButton">Login</button>

                <button type="button" className="forgotPasswordButton" onClick={ForgotPasswordClicked}>Forgot password?</button>

                <button type="button" className="registerNewAccountButton"><Link to='/signup'>Register new account</Link></button>
            </form>
        </div>
    );
}

export default SignIn;