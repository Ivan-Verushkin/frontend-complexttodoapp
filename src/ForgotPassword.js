import React, { useState } from "react";
import axios from "axios";

function ForgotPassword () {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState (true);
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const url = process.env.REACT_APP_API_URL;

    function verifyInputs() {
        const validateErrors = {};
        setIsValid(true);
        if (email === '' || email === null){
            validateErrors.emailEmpty = 'Email can not be empty';
            setIsValid(false);
        }

        setErrors(validateErrors);
        return isValid;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!verifyInputs()){
            return;
        }

        try {
            var res = await axios.post(url + '/api/Auth/forgot-password',{
                email : email
            });
            if (res.data === true){
                setForgotPasswordSuccess(true);
            }

        } catch (error) {
            setErrors({
                forgotPasswordUnsuccessfull: 'Email reset was unsuccessfull due to ' + error.message + '. Please try again later'
            });
        }
    }
    return (
        <div id='signInDiv'>
            {!forgotPasswordSuccess && 
                <form onSubmit={handleSubmit} className="signInForm">
                    <label>Type your email to reset a password:</label>
                    <input 
                        type='email'
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="forgotPasswordInput"
                    />
                    {errors.emailEmpty && <p className="danger-notification">{errors.emailEmpty}</p>}
                    {errors.forgotPasswordUnsuccessfull && <p className="danger-notification">{errors.forgotPasswordUnsuccessfull}</p>}
                    <button className="signInButton" type="submit"> Reset password</button>
                </form>
            }
            {forgotPasswordSuccess && <p className="emailPasswordResetSuccess">Please check your email and follow the instructions!</p>}
        </div>
    );
}

export default ForgotPassword;