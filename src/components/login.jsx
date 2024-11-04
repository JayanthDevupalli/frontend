// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.css';
// import 'https://unicons.iconscout.com/release/v4.0.8/css/line.css';

// const LoginSignup = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [loginEmail, setLoginEmail] = useState('');
//     const [loginPassword, setLoginPassword] = useState('');
//     const [signupName, setSignupName] = useState('');
//     const [signupEmail, setSignupEmail] = useState('');
//     const [signupPassword, setSignupPassword] = useState('');
//     const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const [signupPasswordError, setSignupPasswordError] = useState('');
//     const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState('');
//     const navigate = useNavigate();

//     const handleLoginSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email: loginEmail, password: loginPassword })
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 navigate('/main/pages/Dashboard/dashboard.html');
//             } else {
//                 setLoginError(data.error);
//             }
//         } catch (error) {
//             setLoginError('An error occurred');
//         }
//     };

//     const handleSignupSubmit = async (event) => {
//         event.preventDefault();
//         let valid = true;

//         if (!validatePassword(signupPassword)) {
//             setSignupPasswordError("Password must be at least 8 characters long and contain letters, numbers, and special characters.");
//             valid = false;
//         } else {
//             setSignupPasswordError('');
//         }

//         if (signupPassword !== signupConfirmPassword) {
//             setSignupConfirmPasswordError("Passwords do not match.");
//             valid = false;
//         } else {
//             setSignupConfirmPasswordError('');
//         }

//         if (valid) {
//             try {
//                 const response = await fetch('http://localhost:5000/signup', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword })
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setIsLogin(true);
//                 } else {
//                     setSignupConfirmPasswordError(data.error);
//                 }
//             } catch (error) {
//                 setSignupConfirmPasswordError('An error occurred');
//             }
//         }
//     };

//     const validatePassword = (password) => {
//         const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         return re.test(password);
//     };

//     return (
//         <div className={`container ${!isLogin ? 'active' : ''}`}>
//             <div className="forms">
//                 <div className={`form login ${isLogin ? '' : 'hidden'}`}>
//                     <span className="title">Login</span>
//                     <form id="login-form" onSubmit={handleLoginSubmit}>
//                         <div className="input-field">
//                             <input 
//                                 type="text" 
//                                 id="login-email" 
//                                 placeholder="Enter Your Email" 
//                                 required 
//                                 value={loginEmail} 
//                                 onChange={(e) => setLoginEmail(e.target.value)} 
//                             />
//                             <i className="uil uil-envelope icon"></i>
//                         </div>
//                         <div className="input-field">
//                             <input 
//                                 type="password" 
//                                 id="login-password" 
//                                 className="Password" 
//                                 placeholder="Enter Your Password" 
//                                 required 
//                                 value={loginPassword} 
//                                 onChange={(e) => setLoginPassword(e.target.value)} 
//                             />
//                             <i className="uil uil-lock icon"></i>
//                             <i className="uil uil-eye-slash showHidePw"></i>
//                         </div>
//                         {loginError && <div className="error-message">{loginError}</div>}
//                         <div className="checkbox-text">
//                             <div className="checkbox-content">
//                                 <input type="checkbox" id="logcheck" />
//                                 <label htmlFor="logcheck" className="text">Remember me</label>
//                             </div>
//                             <a href="#" className="text">Forgot Password ?</a>
//                         </div>
//                         <div className="input-field button">
//                             <input type="submit" value="Login" />
//                         </div>
//                     </form>
//                     <div className="login-signup">
//                         <span className="text">Not yet registered?
//                             <a href="#" className="text signup-link" onClick={() => setIsLogin(false)}>Signup now</a>
//                         </span>
//                     </div>
//                 </div>

//                 <div className={`form signup ${isLogin ? 'hidden' : ''}`}>
//                     <span className="title">Registration</span>
//                     <form id="signup-form" onSubmit={handleSignupSubmit}>
//                         <div className="input-field">
//                             <input 
//                                 type="text" 
//                                 id="signup-name" 
//                                 placeholder="Enter Your Name" 
//                                 required 
//                                 value={signupName} 
//                                 onChange={(e) => setSignupName(e.target.value)} 
//                             />
//                             <i className="uil uil-user"></i>
//                         </div>
//                         <div className="input-field">
//                             <input 
//                                 type="text" 
//                                 id="signup-email" 
//                                 placeholder="Enter Your Email" 
//                                 required 
//                                 value={signupEmail} 
//                                 onChange={(e) => setSignupEmail(e.target.value)} 
//                             />
//                             <i className="uil uil-envelope icon"></i>
//                         </div>
//                         <div className="input-field">
//                             <input 
//                                 type="password" 
//                                 id="signup-password" 
//                                 className="Password" 
//                                 placeholder="Create a Password" 
//                                 required 
//                                 value={signupPassword} 
//                                 onChange={(e) => setSignupPassword(e.target.value)} 
//                             />
//                             <i className="uil uil-lock icon"></i>
//                         </div>
//                         {signupPasswordError && <div className="error-message">{signupPasswordError}</div>}
//                         <div className="input-field">
//                             <input 
//                                 type="password" 
//                                 id="signup-confirm-password" 
//                                 className="Password" 
//                                 placeholder="Confirm Password" 
//                                 required 
//                                 value={signupConfirmPassword} 
//                                 onChange={(e) => setSignupConfirmPassword(e.target.value)} 
//                             />
//                             <i className="uil uil-lock icon"></i>
//                             <i className="uil uil-eye-slash showHidePw"></i>
//                         </div>
//                         {signupConfirmPasswordError && <div className="error-message">{signupConfirmPasswordError}</div>}
//                         <div className="checkbox-text">
//                             <div className="checkbox-content">
//                                 <input type="checkbox" id="sigcheck" />
//                                 <label htmlFor="sigcheck" className="text">Remember me</label>
//                             </div>
//                         </div>
//                         <div className="input-field button">
//                             <input type="submit" value="Sign Up" />
//                         </div>
//                     </form>
//                     <div className="login-signup">
//                         <span className="text">Already registered?
//                             <a href="#" className="text login-link" onClick={() => setIsLogin(true)}>Login Now</a>
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginSignup;


import React from "react";
 export const Login=()=>{
    return(
        <div>
            <h1>Hello</h1>
        </div>
    )
 }