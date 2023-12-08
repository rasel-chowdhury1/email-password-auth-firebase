import React from 'react';
import './Register.css';


const Register = () => {
    const handleEmailChange = (event) =>{
        console.log(event.target.value)
    }

    const handlePasswordBlur = (event) =>{
        console.log(event.target.value)
    } 

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log('Email is - ',event.target.email.value)
        console.log('Password is - ',event.target.password.value)
    }

    return (
        <div className='register'>
            <h2>Please!!!Register</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" placeholder='Enter your email' />
                <br/>
                <input onBlur={handlePasswordBlur} type="password" name="password" placeholder='Enter the password'/>
                <br/>
                <button type="submit" value='Register'>Register</button>
            </form>
        </div>
    );
};

export default Register;