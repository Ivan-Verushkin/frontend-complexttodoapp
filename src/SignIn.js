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
    const [loginFailed, setLoginFailed] = useState(false);
    const [usernameEmpty, setUsernameEmpty] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log (`Creds: Login: ${login}, Pass: ${password}`);
        if(login === '')
        {
            setUsernameEmpty(true);
            return;
        }
        else{
            setUsernameEmpty(false);
        }

        if (username === login && userpassword === password) {
            setLoginFailed(false);
            setUser({name: login, password: password, isLoggedIn: true});
            navigate('/');
        }
        else {
            setLoginFailed(true);
            return;
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
                {loginFailed && <p className="danger-notification">Login and password combination are wrong. Please try again</p>}
                {usernameEmpty && <p className="danger-notification">Login is empty. It is a required field</p>}
                <button className="signInButton" type="submit">Login</button>
            </form>
        </div>
    );
}

export default SignIn;