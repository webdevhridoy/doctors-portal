import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useToken from '../../../hook/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { userSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState();
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    if (token) {
        navigate(from, { replace: true });
    }


    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        userSignIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            });
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-96 mx-auto'>
                <h2 className='text-2xl text-center'>Login Now</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full  mt-2">
                        <label className="label"> <span className="label-text text-lg">Your Email</span> </label>
                        <input type='email'
                            {...register("email", { required: "Email Address is required" })}
                            placeholder="Type here" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full  mt-2">
                        <label className="label"> <span className="label-text text-lg">Your Password</span> </label>
                        <input
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password should be 6 characters or longer' }
                            })}
                            type="password" placeholder="Type here" className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className="label"> <span className="label-text">Forget password</span></label>
                    </div>
                    <input type="submit" className=" text-white rounded-lg btn-md w-full mt-5 bg-accent" />
                </form>
                <div>
                    {loginError && <p className='text-red-600'> {loginError}</p>}
                </div>
                <div className='text-center my-2'>
                    <p>New to Doctors Portal? <Link to='/register' className='text-primary'>Crete new account</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline uppercase w-full'>Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;