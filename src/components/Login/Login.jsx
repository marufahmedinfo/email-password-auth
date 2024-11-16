import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../Firebase.config';
// icon
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [erroeMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const ref = useRef();
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setErrorMessage('');
        setSuccess(false);

        //login user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (!result.user.emailVerified) {
                    setErrorMessage('Places verify Your Email Address')
                } else {
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log('ERROR', error.message)
                setErrorMessage(error.message)
                setSuccess(false)
            })
    };

    const handleforgatePassword = () => {
        console.log('get me Email Address', ref.current.value)
        const email = ref.current.value;
        if(!email){
            console.log('Places Provide a Valid Email Address')
        }else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password Reset Email send, Places check Your Email')
            })
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' ref={ref} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : "password"} placeholder="password" name='password' className="input input-bordered" required />
                            <button onClick={() => setShowPassword(!showPassword)} className='btn-sm absolute top-[170px] right-9'>
                                {
                                    showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                                }
                            </button>
                            <label className="label" onClick={handleforgatePassword}>
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <p className='text-green-500 ml-9'>Log in is Successful</p>
                    }
                    {
                        erroeMessage && <p className='text-red-500 ml-9'>{erroeMessage}</p>
                    }
                    <p className='text-xl ml-4'>New to this Website? Please <span className='underline text-purple-600 text-xl'><Link to='/signup'>Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;