import React, { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const { setUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({}); // Single state for all errors
    const navigate = useNavigate();

    // Validation function to handle field checks
    const validateInputs = () => {
        let validationErrors = {};
        let isValid = true;

        if (name === '') {
            validationErrors.nameEmpty = "Name cannot be empty";
            isValid = false;
        } else if (name.length < 6) {
            validationErrors.nameLength = "Name must be at least 6 characters long";
            isValid = false;
        }

        if (email === '') {
            validationErrors.emailEmpty = "Email cannot be empty";
            isValid = false;
        }

        if (password === '') {
            validationErrors.passwordEmpty = "Password cannot be empty";
            isValid = false;
        }

        if (confirmPassword === '') {
            validationErrors.confirmPasswordEmpty = "Confirm password cannot be empty";
            isValid = false;
        } else if (password !== confirmPassword) {
            validationErrors.passwordMismatch = "Passwords do not match";
            isValid = false;
        }

        setErrors(validationErrors); // Set errors to state
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return; // Return early if validation fails
        }

        // If everything is valid
        setUser({ name, email, password, confirmPassword, isLoggedIn: true });
        navigate('/');
    };

    return (
        <div id='signInDiv'>
            <form className="signInForm" onSubmit={handleSubmit}>
                <label>Enter your name:</label>
                <input
                    className="signInForm-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.nameEmpty && <p className="danger-notification">{errors.nameEmpty}</p>}
                {errors.nameLength && <p className="danger-notification">{errors.nameLength}</p>}

                <label>Enter your email:</label>
                <input
                    className="signInForm-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.emailEmpty && <p className="danger-notification">{errors.emailEmpty}</p>}

                <label>Create a password:</label>
                <input
                    className="signInForm-input"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.passwordEmpty && <p className="danger-notification">{errors.passwordEmpty}</p>}

                <label>Confirm a password:</label>
                <input
                    className="signInForm-input"
                    type="password"
                    placeholder="Confirm a password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={(e) => {
                    if (password !== e.target.value) {
                         setErrors((prevErrors) => ({
                             ...prevErrors, 
                             passwordMismatch: "Passwords do not match" 
                         }));
                    } else {
                         setErrors((prevErrors) => {
                             const { passwordMismatch, ...rest } = prevErrors;
                             return rest;
                         });
                    }
                 }}
                />
                {errors.confirmPasswordEmpty && <p className="danger-notification">{errors.confirmPasswordEmpty}</p>}
                {errors.passwordMismatch && <p className="danger-notification">{errors.passwordMismatch}</p>}

                <button className="signInButton" type='submit'>Register</button>
            </form>
        </div>
    );
}

export default SignUp;
