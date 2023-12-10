import React, { useState } from 'react';
import './Register.css';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import app from '../../Firebase/Firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const handleEmailChange = (event) =>{
        console.log(event.target.value)
    }

    const handlePasswordBlur = (event) =>{
        console.log(event.target.value)
    } 

    const handleRegisterSubmit = (event) =>{
        //1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        //2. collect form data
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name,email,password);
        //Password validation using regula expression
        if(!/(?=.*[a-zA-Z])/.test(password)){
            setError('must added alpha charecter in password field');
            return;
        }
        else if(!/(?=.*[!@#$%&?"])/.test(password)){
            setError('must added special charecter in password field.example: !#@%&');
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setError('must added number in password field');
            return;
        }
        else if(password.length < 8){
            setError('please add at least 8 characters in your password');
            return;
        }
        //create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            //form reset/refresh
            event.target.reset();
            setSuccess('your account created has been successfully');
            sendVerificationEmail(result.user);
            updateUserData(result.user,name)
        })
        .catch(error =>{
            console.error(error.message);
            setError(error.message);
            setSuccess('');
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result.user);
            alert("Please verify your email address")
        })
    }

    const updateUserData = (user,name) =>{
        updateProfile(user, {
            displayName: name
        })
        .then(()=>{
            console.log('user name updated')
        })
        .catch( error =>{
            setError(error.message);
        })
    }

    return (
        <div className='form'>
            <h2>Please!!!Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <input type="name" name="name" placeholder='Enter your name' required />
                <br/>
                <input onChange={handleEmailChange} type="email" name="email" placeholder='Enter your email' required />
                <br/>
                <input onBlur={handlePasswordBlur} type="password" name="password" placeholder='Enter the password' required/>
                <br/>
                <button type="submit" value='Register'>Register</button>
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;