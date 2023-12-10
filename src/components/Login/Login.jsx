import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from './../../Firebase/Firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Login = () => {

    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');
    const emailRef = useRef();

    const handleLoginForm = (event) =>{
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
             const loggedUser = result.user;
             console.log(loggedUser);
             setSuccess('User login successful.')
        })
        .catch(error =>{
            setError(error.message)
        })
    }

    const handleResetPassword = (event) =>{
        const email = emailRef.current.value;
        if(!email){
            alert("Please provide your email address to reset password");
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then( () =>{
            alert("Please Check your email")
        })
        .catch( error =>{
            console.log(error);
            setError(error.message)
        })
    }


    

    return (
        <div className='form'>
            <h2>Please!!!Login</h2>
            <form onSubmit={handleLoginForm}>
                <input type="email" ref={emailRef} name="email" placeholder='Enter your email' required />
                <br/>
                <input type="password" name="password" placeholder='Enter the password' required/>
                <br/>
                <button className='bg-primary' type="submit" value='Register'>Login</button>
            </form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;