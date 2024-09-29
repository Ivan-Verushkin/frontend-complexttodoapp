import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

function SignIn(){
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const username='ivan';
    const userpassword = '123';
    const [login, setLogin] =useState('');
    const [password, setPassword] =useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log (`Creds: Login: ${login}, Pass: ${password}`);
        if (username === login && userpassword === password) {
            setUser({name: login, password: password, isLoggedIn: true});
            navigate('/');
        }
    }
    return (
        <div id='signInDiv'>
            <form className="signInForm" onSubmit={handleSubmit}>
                <label>Login:</label>
                <input className="signInForm-input"
                    type='text'
                    placeholder='Login'
                    onChange={(e)=>{setLogin(e.target.value)}}
                    value={login}
                />
                <label>Password:</label>
                <input className="signInForm-input"
                    type='password'
                    placeholder='Your password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
                <button className="signInButton" type="submit">Login</button>
            </form>
        </div>
    );
}

export default SignIn;