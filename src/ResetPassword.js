import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword (){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const url = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const inputRef = useRef(null);

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(newPassword !== confirmPassword){
            setErrorMessage('Passwords do not match!');
            return;
        }
        try {
            var res = await axios.post(url + '/api/Auth/reset-password', {
                email,
                newPassword,
                token
            });

            if (res.data === "Password reset successful."){
                setSuccessMessage('Password successfully updated!');
            }
        } catch (error){
            setErrorMessage(
                error.response?.data?.message || "An error occurred during the password reset."
            );
        }
    };

    return (
        <div className="reset-password-container" id="signInDiv">
            {successMessage ? (
                <p className="success-notification">{successMessage}</p>
            ) : (
                <>
                    
                    <form className="signInForm" onSubmit={handleSubmit}>
                        <label>Password:</label>
                        <input 
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Password"
                            required
                            ref={inputRef}
                            className="forgotPasswordInput"
                        />
                        <label>Confirm password:</label>
                        <input 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            required
                            className="forgotPasswordInput"
                        />
    
                        {errorMessage && <p className="danger-notification">{errorMessage}</p>}
                        <button type="submit" className="signInButton" >Reset Password</button>
                    </form>
                </>
            )}
        </div>
    );
    
}

export default ResetPassword;