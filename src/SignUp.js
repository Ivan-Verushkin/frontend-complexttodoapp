import React, { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";


function SignUp(){
    const { setUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`User data after submit pressed: Name: ${name}, Email: ${email}, Password: ${password}, ConfirmPassword: ${confirmPassword}`);
        if(password !== confirmPassword){
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);
        setUser({name: name, email: email, password: password, confirmPassword: confirmPassword, isLoggedIn: true});
        navigate('/');
    }
    return (
        <div id='signInDiv'>
            <form className="signInForm" onSubmit={handleSubmit}>
                <label>Enter your name:</label>
                <input className="signInForm-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <label>Enter your email:</label>
                <input className="signInForm-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <label>Create a password:</label>
                <input className="signInForm-input"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <label>Confirm a password:</label>
                <input className="signInForm-input"
                    type="password"
                    placeholder="Confirm a password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                />
                {passwordMismatch && <p className="danger-notification">Passwords are not the same!</p>}
                <button className="signInButton" type='submit'>Register</button>
            </form>
        </div>
    );
}

export default SignUp;