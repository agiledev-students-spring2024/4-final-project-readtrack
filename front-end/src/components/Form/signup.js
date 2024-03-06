import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const onSignupClick = () => {
        // Reset error messages
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validate fields
        if (email === "") {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if (password === "") {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 8) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        // Here, you would typically handle the user registration, e.g., by calling an API.
        // Assuming registration is successful:
        navigate("/login"); // Redirect to login after signup
    };

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Signup</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{confirmPasswordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onSignupClick}
                    value={"Sign up"}
                />
            </div>
        </div>
    );
};

export default Signup;
