import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useToken from '../../../hook/useToken';

const Register = () => {
    const { createNewUser, updateUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserEmail, setCreateUserEmail] = useState();
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();
    if (token) {
        navigate('/');
    }


    const handleSignUp = data => {
        console.log(data);

        createNewUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Your registration successed');

                const profile = {
                    displayName: data.name
                };
                updateUser(profile)
                    .then(() => {
                        saveUserData(data.name, data.email);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                toast.error("Already registered");
            });
    };

    const saveUserData = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email);
                console.log('save users', data);

            });
    };





    return (
        <div className='flex justify-center items-center h-screen p-2'>
            <div className='w-96 mx-auto'>
                <h2 className='text-2xl text-center'>Sign up now</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full  mt-2">
                        <label className="label"> <span className="label-text text-lg">Your Name</span> </label>
                        <input type='text'
                            {...register('name', {
                                required: "Name should be added"
                            })}
                            placeholder="Type here" className="input input-bordered w-full" />

                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full  mt-2">
                        <label className="label"> <span className="label-text text-lg">Your Email</span> </label>
                        <input type='email'
                            {...register('email', {
                                required: 'Email address is required'
                            })}
                            placeholder="Type here" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}

                    </div>
                    <div className="form-control w-full  mt-2">
                        <label className="label"> <span className="label-text text-lg">Your Password</span> </label>
                        <input
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password should be 6 characters' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong' }
                            })}
                            type="password" placeholder="Type here" className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}

                        <label className="label"> <span className="label-text">Forget password</span></label>
                    </div>
                    <input type="submit" className=" text-white rounded-lg btn-md w-full mt-5 bg-accent" />
                </form>
                <div className='text-center my-2'>
                    <p>Already have an account? <Link to='/login' className='text-primary'>Login now</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline uppercase w-full'>Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;