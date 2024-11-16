import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../Firebase.config';
//import icon
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [success, setSuccess] = useState(false)
    const [erroeMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.terms.checked;
        const name = e.target.name.value;
        const photURL = e.target.photo.value;
        console.log(email, password, name, photURL, checkbox) 
        // create error message
        setErrorMessage('');
        setSuccess(false);

        // password validition
        const passwordReges = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordReges.test(password)) {
            setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
            return;
        }


        // considition
        if(!checkbox){
            setErrorMessage('Place Accept Our Trems And Condition');
            return;
        }


        if (password.length < 6) {
            setErrorMessage('Password should be 6 Character or Longer')
            return;
        };

        // use firebase

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true)
                // email verifyed

                sendEmailVerification(auth.currentUser)
                .then(()=> {
                    console.log('email Verifide')
                });
                const profile = {
                    displayName: name,
                    photoURL: photURL
                };
                updateProfile(auth.currentUser, profile)
                .then(()=>{
                    console.log('user profile updated')
                })
                .catch(error => {
                    console.log('user Profile Updated', error)
                })
            })
            .catch(error => {
                console.log('ERROR', error.message)
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }
    return (

        <div className="card bg-base-100 mx-auto mt-16 w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl ml-4 font-bold">Sign Up now!</h3>
            <form className="card-body" onSubmit={handleSignUp}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Enter Your name" name='name' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" placeholder="Enter Your photo link" name='photo' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : "password"} placeholder="password" name='password' className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className='btn-sm absolute right-2 top-11'>
                        {
                            showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                        }
                    </button>

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox" />
                        <span className="label-text ml-2">Accept Our Teams And Condition</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                success && <p className='text-green-500 ml-9'>Sign Up is Successful</p>
            }
            {
                erroeMessage && <p className='text-red-500 ml-9'>{erroeMessage}</p>
            }
            <p className='text-xl ml-4'>Already have an account? <span className='underline text-purple-600 text-xl'><Link>Places Login</Link></span></p>
        </div>
    );
};

export default Signup;